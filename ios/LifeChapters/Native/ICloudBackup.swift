import Foundation
import React

/// One file a day in the user's own iCloud Drive › Life Chapters. The app only
/// touches the file system; iOS does the syncing, under the user's account.
@objc(ICloudBackup)
class ICloudBackup: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  // Reads may wait on a download; they must never hold up a write.
  private let writeQueue = DispatchQueue(label: "ICloudBackup.write", qos: .utility)
  private let readQueue = DispatchQueue(label: "ICloudBackup.read", qos: .utility)

  /// available | driveOff | notEntitled | notReady
  @objc(status:rejecter:)
  func status(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    readQueue.async { resolve(self.current().status) }
  }

  @objc(write:text:resolver:rejecter:)
  func write(
    _ name: String, text: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    writeQueue.async {
      guard let docs = self.current().documents else {
        return reject("ICLOUD_UNAVAILABLE", "iCloud Drive is not available", nil)
      }
      do {
        try FileManager.default.createDirectory(at: docs, withIntermediateDirectories: true)
        let target = docs.appendingPathComponent(name)
        var coordError: NSError?
        var writeError: Error?
        NSFileCoordinator().coordinate(writingItemAt: target, options: .forReplacing, error: &coordError) { url in
          do { try text.write(to: url, atomically: true, encoding: .utf8) } catch { writeError = error }
        }
        if let error = coordError ?? writeError { throw error }
        resolve(nil)
      } catch {
        reject("ICLOUD_WRITE", error.localizedDescription, error)
      }
    }
  }

  /// File names, including ones not downloaded yet (listed under their real name).
  @objc(list:rejecter:)
  func list(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    readQueue.async {
      guard let docs = self.current().documents else { return resolve([]) }
      let entries = (try? FileManager.default.contentsOfDirectory(atPath: docs.path)) ?? []
      let names = entries.map { e -> String in
        e.hasPrefix(".") && e.hasSuffix(".icloud") ? String(e.dropFirst().dropLast(".icloud".count)) : e
      }
      resolve(Array(Set(names)).sorted(by: >))
    }
  }

  /// A coordinated read downloads the file first if iOS evicted it.
  @objc(read:resolver:rejecter:)
  func read(
    _ name: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    readQueue.async {
      guard let docs = self.current().documents else {
        return reject("ICLOUD_UNAVAILABLE", "iCloud Drive is not available", nil)
      }
      let url = docs.appendingPathComponent(name)
      try? FileManager.default.startDownloadingUbiquitousItem(at: url)
      var coordError: NSError?
      var text: String?
      NSFileCoordinator().coordinate(readingItemAt: url, options: [], error: &coordError) { readURL in
        text = try? String(contentsOf: readURL, encoding: .utf8)
      }
      if let text = text { resolve(text) } else {
        reject("ICLOUD_READ", coordError?.localizedDescription ?? "Couldn't read \(name)", coordError)
      }
    }
  }

  private func current() -> (status: String, documents: URL?) {
    if let container = FileManager.default.url(forUbiquityContainerIdentifier: nil) {
      return ("available", container.appendingPathComponent("Documents"))
    }
    if FileManager.default.ubiquityIdentityToken == nil { return ("driveOff", nil) }
    return ("notReady", nil)
  }
}
