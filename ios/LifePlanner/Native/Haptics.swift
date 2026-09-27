import React
import UIKit

@objc(Haptics)
class Haptics: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  /// kind: success | warning | light | medium | selection
  @objc(play:)
  func play(_ kind: String) {
    DispatchQueue.main.async {
      switch kind {
      case "success": UINotificationFeedbackGenerator().notificationOccurred(.success)
      case "warning": UINotificationFeedbackGenerator().notificationOccurred(.warning)
      case "medium": UIImpactFeedbackGenerator(style: .medium).impactOccurred()
      case "selection": UISelectionFeedbackGenerator().selectionChanged()
      default: UIImpactFeedbackGenerator(style: .light).impactOccurred()
      }
    }
  }
}
