import Foundation
import React
import UserNotifications

/// Owns notification taps from launch, before JS is up, so a cold start from a
/// reminder still lands on the right step.
final class ReminderTaps: NSObject, UNUserNotificationCenterDelegate {
  static let shared = ReminderTaps()
  private let lock = NSLock()
  private var opened: String?

  func take() -> String? {
    lock.lock(); defer { lock.unlock() }
    let value = opened
    opened = nil
    return value
  }

  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    lock.lock()
    opened = response.notification.request.content.userInfo["target"] as? String ?? "radar"
    lock.unlock()
    completionHandler()
  }

  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    completionHandler([.banner, .list, .sound])
  }
}

@objc(Reminders)
class Reminders: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  private var center: UNUserNotificationCenter { .current() }

  @objc(status:rejecter:)
  func status(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    center.getNotificationSettings { settings in
      switch settings.authorizationStatus {
      case .authorized, .provisional, .ephemeral: resolve("granted")
      case .denied: resolve("denied")
      default: resolve("undetermined")
      }
    }
  }

  @objc(request:rejecter:)
  func request(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in resolve(granted) }
  }

  /// Replaces every pending reminder. Each item: id, title, body, date
  /// (YYYY-MM-DD) or weekday (1 = Sunday, repeats), hour, target.
  @objc(replaceQueue:resolver:rejecter:)
  func replaceQueue(
    _ items: [[String: Any]],
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    center.removeAllPendingNotificationRequests()
    let group = DispatchGroup()
    var added = 0
    let lock = NSLock()

    for item in items.prefix(64) {
      guard let id = item["id"] as? String, let title = item["title"] as? String else { continue }
      var comps = DateComponents()
      comps.hour = item["hour"] as? Int ?? 9
      comps.minute = 0
      let repeats: Bool
      if let weekday = item["weekday"] as? Int {
        comps.weekday = weekday
        repeats = true
      } else if let date = item["date"] as? String {
        let parts = date.split(separator: "-").compactMap { Int($0) }
        guard parts.count == 3 else { continue }
        comps.year = parts[0]; comps.month = parts[1]; comps.day = parts[2]
        repeats = false
      } else { continue }

      let content = UNMutableNotificationContent()
      content.title = title
      content.body = item["body"] as? String ?? ""
      content.sound = .default
      content.userInfo = ["target": item["target"] as? String ?? "radar"]
      content.threadIdentifier = "life-chapters"

      let trigger = UNCalendarNotificationTrigger(dateMatching: comps, repeats: repeats)
      group.enter()
      center.add(UNNotificationRequest(identifier: id, content: content, trigger: trigger)) { error in
        if error == nil { lock.lock(); added += 1; lock.unlock() }
        group.leave()
      }
    }
    group.notify(queue: .global()) { resolve(added) }
  }

  @objc(pendingCount:rejecter:)
  func pendingCount(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    center.getPendingNotificationRequests { resolve($0.count) }
  }

  @objc(takeOpened:rejecter:)
  func takeOpened(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    resolve(ReminderTaps.shared.take())
  }
}
