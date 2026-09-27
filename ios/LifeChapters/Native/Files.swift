import Foundation
import PhotosUI
import React
import UIKit
import UniformTypeIdentifiers

/// Everything that touches the file system or an OS picker: backups out through
/// the share sheet, files in through the document picker, and scans kept in the
/// app's own Files-visible folder.
@objc(Files)
class Files: NSObject, UIDocumentPickerDelegate, UIImagePickerControllerDelegate,
  UINavigationControllerDelegate, PHPickerViewControllerDelegate
{
  @objc static func requiresMainQueueSetup() -> Bool { false }

  private var pending: RCTPromiseResolveBlock?
  private var pendingIsScan = false

  private static var documents: URL {
    FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
  }

  private static var scans: URL {
    let url = documents.appendingPathComponent("Scans", isDirectory: true)
    try? FileManager.default.createDirectory(at: url, withIntermediateDirectories: true)
    return url
  }

  private static var backups: URL {
    let url = documents.appendingPathComponent("Backups", isDirectory: true)
    try? FileManager.default.createDirectory(at: url, withIntermediateDirectories: true)
    return url
  }

  private let backupQueue = DispatchQueue(label: "Files.backups", qos: .utility)

  private func top() -> UIViewController? {
    var vc = UIApplication.shared.connectedScenes
      .compactMap { ($0 as? UIWindowScene)?.keyWindow }.first?.rootViewController
    while let next = vc?.presentedViewController { vc = next }
    return vc
  }

  // MARK: text files

  @objc(writeTemp:text:resolver:rejecter:)
  func writeTemp(
    _ name: String, text: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let dir = FileManager.default.temporaryDirectory.appendingPathComponent("Exports", isDirectory: true)
    do {
      try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
      let url = dir.appendingPathComponent(name)
      try text.write(to: url, atomically: true, encoding: .utf8)
      resolve(url.path)
    } catch {
      reject("WRITE", error.localizedDescription, error)
    }
  }

  @objc(readText:resolver:rejecter:)
  func readText(
    _ path: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    do { resolve(try String(contentsOfFile: path, encoding: .utf8)) } catch {
      reject("READ", error.localizedDescription, error)
    }
  }

  @objc(share:resolver:rejecter:)
  func share(
    _ path: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard let host = self.top() else { return resolve(false) }
      let sheet = UIActivityViewController(
        activityItems: [URL(fileURLWithPath: path)], applicationActivities: nil)
      sheet.popoverPresentationController?.sourceView = host.view
      sheet.completionWithItemsHandler = { _, completed, _, _ in resolve(completed) }
      host.present(sheet, animated: true)
    }
  }

  // MARK: pickers

  /// Resolves the picked file's local copy path, or nil on cancel.
  @objc(pickFile:resolver:rejecter:)
  func pickFile(
    _ kinds: [String],
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      self.pending = resolve
      self.pendingIsScan = false
      self.presentDocumentPicker(kinds.compactMap { UTType($0) })
    }
  }

  /// source: camera | photos | files. Resolves the scan's file name, or nil.
  @objc(addScan:resolver:rejecter:)
  func addScan(
    _ source: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      self.pending = resolve
      self.pendingIsScan = true
      switch source {
      case "camera":
        guard UIImagePickerController.isSourceTypeAvailable(.camera) else {
          self.finish(nil); return
        }
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = self
        self.top()?.present(picker, animated: true)
      case "photos":
        var config = PHPickerConfiguration()
        config.filter = .images
        config.selectionLimit = 1
        let picker = PHPickerViewController(configuration: config)
        picker.delegate = self
        self.top()?.present(picker, animated: true)
      default:
        self.presentDocumentPicker([.image, .pdf])
      }
    }
  }

  private func presentDocumentPicker(_ types: [UTType]) {
    let picker = UIDocumentPickerViewController(forOpeningContentTypes: types, asCopy: true)
    picker.delegate = self
    top()?.present(picker, animated: true)
  }

  private func finish(_ value: Any?) {
    let resolve = pending
    pending = nil
    resolve?(value)
  }

  private func storeScan(data: Data, ext: String) -> String? {
    let name = "\(UUID().uuidString).\(ext)"
    do {
      try data.write(to: Files.scans.appendingPathComponent(name), options: .atomic)
      return name
    } catch { return nil }
  }

  func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
    guard let url = urls.first else { return finish(nil) }
    if pendingIsScan {
      let data = try? Data(contentsOf: url)
      finish(data.flatMap { storeScan(data: $0, ext: url.pathExtension.lowercased()) })
    } else {
      finish(url.path)
    }
  }

  func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) { finish(nil) }

  func imagePickerController(
    _ picker: UIImagePickerController,
    didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]
  ) {
    picker.dismiss(animated: true)
    let image = info[.originalImage] as? UIImage
    finish(image?.jpegData(compressionQuality: 0.8).flatMap { storeScan(data: $0, ext: "jpg") })
  }

  func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
    picker.dismiss(animated: true)
    finish(nil)
  }

  func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
    picker.dismiss(animated: true)
    guard let provider = results.first?.itemProvider, provider.canLoadObject(ofClass: UIImage.self)
    else { return finish(nil) }
    provider.loadObject(ofClass: UIImage.self) { object, _ in
      let image = object as? UIImage
      DispatchQueue.main.async {
        self.finish(image?.jpegData(compressionQuality: 0.8).flatMap { self.storeScan(data: $0, ext: "jpg") })
      }
    }
  }

  // MARK: local backups (Documents/Backups, visible in Files)

  @objc(writeBackup:text:resolver:rejecter:)
  func writeBackup(
    _ name: String, text: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    backupQueue.async {
      do {
        try text.write(to: Files.backups.appendingPathComponent(name), atomically: true, encoding: .utf8)
        resolve(nil)
      } catch { reject("BACKUP_WRITE", error.localizedDescription, error) }
    }
  }

  @objc(listBackups:rejecter:)
  func listBackups(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    backupQueue.async {
      resolve((try? FileManager.default.contentsOfDirectory(atPath: Files.backups.path)) ?? [])
    }
  }

  @objc(readBackup:resolver:rejecter:)
  func readBackup(
    _ name: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    backupQueue.async {
      do { resolve(try String(contentsOf: Files.backups.appendingPathComponent(name), encoding: .utf8)) } catch {
        reject("BACKUP_READ", error.localizedDescription, error)
      }
    }
  }

  @objc(deleteBackups:resolver:rejecter:)
  func deleteBackups(
    _ names: [String],
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    backupQueue.async {
      for name in names where !name.contains("/") {
        try? FileManager.default.removeItem(at: Files.backups.appendingPathComponent(name))
      }
      resolve(nil)
    }
  }

  // MARK: scans

  @objc(scanPath:resolver:rejecter:)
  func scanPath(
    _ name: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let url = Files.scans.appendingPathComponent(name)
    resolve(FileManager.default.fileExists(atPath: url.path) ? url.path : nil)
  }

  @objc(deleteScan:resolver:rejecter:)
  func deleteScan(
    _ name: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    try? FileManager.default.removeItem(at: Files.scans.appendingPathComponent(name))
    resolve(nil)
  }

  /// Opens the Files app at one of this app's folders: Scans or Backups.
  @objc(openFolder:resolver:rejecter:)
  func openFolder(
    _ which: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let path = which == "Backups" ? Files.backups.path : Files.scans.path
    DispatchQueue.main.async {
      if let url = URL(string: "shareddocuments://\(path)") {
        UIApplication.shared.open(url) { resolve($0) }
      } else { resolve(false) }
    }
  }
}
