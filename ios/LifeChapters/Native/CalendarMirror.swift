import EventKit
import Foundation
import React

/// Mirrors start-by dates into a calendar of the app's own, off by default.
/// Every sync rewrites that calendar; nothing else is touched.
@objc(CalendarMirror)
class CalendarMirror: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  private let store = EKEventStore()
  private let title = "Life Chapters"

  private func access(_ done: @escaping (Bool) -> Void) {
    if #available(iOS 17.0, *) {
      store.requestFullAccessToEvents { granted, _ in done(granted) }
    } else {
      store.requestAccess(to: .event) { granted, _ in done(granted) }
    }
  }

  private func calendar(create: Bool) -> EKCalendar? {
    if let found = store.calendars(for: .event).first(where: { $0.title == title }) { return found }
    guard create else { return nil }
    let cal = EKCalendar(for: .event, eventStore: store)
    cal.title = title
    cal.source = store.defaultCalendarForNewEvents?.source
      ?? store.sources.first(where: { $0.sourceType == .local })
    do { try store.saveCalendar(cal, commit: true) } catch { return nil }
    return cal
  }

  /// events: [{ title, date: YYYY-MM-DD, notes }]. Resolves the count written,
  /// or -1 when calendar access is refused.
  @objc(sync:resolver:rejecter:)
  func sync(
    _ events: [[String: Any]],
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    access { granted in
      guard granted else { return resolve(-1) }
      guard let cal = self.calendar(create: true) else {
        return reject("CALENDAR", "Couldn't create the Life Chapters calendar", nil)
      }
      let from = Date().addingTimeInterval(-86400 * 400)
      let to = Date().addingTimeInterval(86400 * 365 * 4)
      let old = self.store.events(matching: self.store.predicateForEvents(withStart: from, end: to, calendars: [cal]))
      for event in old { try? self.store.remove(event, span: .thisEvent, commit: false) }

      var written = 0
      var gregorian = Calendar(identifier: .gregorian)
      gregorian.timeZone = .current
      for item in events {
        guard let t = item["title"] as? String, let d = item["date"] as? String else { continue }
        let p = d.split(separator: "-").compactMap { Int($0) }
        guard p.count == 3,
          let day = gregorian.date(from: DateComponents(year: p[0], month: p[1], day: p[2]))
        else { continue }
        let event = EKEvent(eventStore: self.store)
        event.calendar = cal
        event.title = t
        event.notes = item["notes"] as? String
        event.isAllDay = true
        event.startDate = day
        event.endDate = day
        if (try? self.store.save(event, span: .thisEvent, commit: false)) != nil { written += 1 }
      }
      do { try self.store.commit() } catch {
        return reject("CALENDAR", error.localizedDescription, error)
      }
      resolve(written)
    }
  }

  @objc(remove:rejecter:)
  func remove(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    access { granted in
      if granted, let cal = self.calendar(create: false) {
        try? self.store.removeCalendar(cal, commit: true)
      }
      resolve(nil)
    }
  }
}
