// swift scripts/app-icon.swift <out.png>
import AppKit

let size: CGFloat = 1024
let out = CommandLine.arguments.dropFirst().first ?? "icon-1024.png"

func rgb(_ hex: UInt32, _ a: CGFloat = 1) -> CGColor {
  CGColor(srgbRed: CGFloat(hex >> 16 & 0xFF) / 255, green: CGFloat(hex >> 8 & 0xFF) / 255,
          blue: CGFloat(hex & 0xFF) / 255, alpha: a)
}

let ctx = CGContext(data: nil, width: Int(size), height: Int(size), bitsPerComponent: 8,
                    bytesPerRow: 0, space: CGColorSpace(name: CGColorSpace.sRGB)!,
                    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
ctx.translateBy(x: 0, y: size)
ctx.scaleBy(x: 1, y: -1)

let bg = CGGradient(colorsSpace: nil, colors: [rgb(0x3D7BF0), rgb(0x1D3F9E)] as CFArray,
                    locations: [0, 1])!
ctx.drawLinearGradient(bg, start: .zero, end: CGPoint(x: size, y: size), options: [])

let sheet = CGRect(x: 232, y: 172, width: 560, height: 700)
let fold: CGFloat = 132
let sheetPath = CGMutablePath()
sheetPath.move(to: CGPoint(x: sheet.minX + 36, y: sheet.minY))
sheetPath.addLine(to: CGPoint(x: sheet.maxX - fold, y: sheet.minY))
sheetPath.addLine(to: CGPoint(x: sheet.maxX, y: sheet.minY + fold))
sheetPath.addLine(to: CGPoint(x: sheet.maxX, y: sheet.maxY - 36))
sheetPath.addArc(tangent1End: CGPoint(x: sheet.maxX, y: sheet.maxY),
                 tangent2End: CGPoint(x: sheet.maxX - 36, y: sheet.maxY), radius: 36)
sheetPath.addArc(tangent1End: CGPoint(x: sheet.minX, y: sheet.maxY),
                 tangent2End: CGPoint(x: sheet.minX, y: sheet.maxY - 36), radius: 36)
sheetPath.addArc(tangent1End: CGPoint(x: sheet.minX, y: sheet.minY),
                 tangent2End: CGPoint(x: sheet.minX + 36, y: sheet.minY), radius: 36)
sheetPath.closeSubpath()

ctx.saveGState()
ctx.setShadow(offset: CGSize(width: 0, height: -24), blur: 60, color: rgb(0x0A1A4A, 0.45))
ctx.setFillColor(rgb(0xFFFFFF))
ctx.addPath(sheetPath)
ctx.fillPath()
ctx.restoreGState()

let foldPath = CGMutablePath()
foldPath.move(to: CGPoint(x: sheet.maxX - fold, y: sheet.minY))
foldPath.addLine(to: CGPoint(x: sheet.maxX - fold, y: sheet.minY + fold - 28))
foldPath.addArc(tangent1End: CGPoint(x: sheet.maxX - fold, y: sheet.minY + fold),
                tangent2End: CGPoint(x: sheet.maxX, y: sheet.minY + fold), radius: 28)
foldPath.addLine(to: CGPoint(x: sheet.maxX, y: sheet.minY + fold))
foldPath.closeSubpath()
ctx.setFillColor(rgb(0xC9D7F5))
ctx.addPath(foldPath)
ctx.fillPath()

let blue = rgb(0x2F6FEB)
let rowX = sheet.minX + 76
let box: CGFloat = 76
let rows: [(y: CGFloat, done: Bool, bar: CGFloat)] = [
  (sheet.minY + 220, true, 210), (sheet.minY + 375, true, 250), (sheet.minY + 530, false, 190),
]
ctx.setLineCap(.round)
ctx.setLineJoin(.round)
for r in rows {
  let rect = CGRect(x: rowX, y: r.y - box / 2, width: box, height: box)
  let rr = CGPath(roundedRect: rect, cornerWidth: 20, cornerHeight: 20, transform: nil)
  if r.done {
    ctx.setFillColor(blue)
    ctx.addPath(rr)
    ctx.fillPath()
    ctx.setStrokeColor(rgb(0xFFFFFF))
    ctx.setLineWidth(14)
    ctx.move(to: CGPoint(x: rect.minX + 19, y: rect.midY + 2))
    ctx.addLine(to: CGPoint(x: rect.minX + 33, y: rect.midY + 16))
    ctx.addLine(to: CGPoint(x: rect.maxX - 17, y: rect.midY - 14))
    ctx.strokePath()
  } else {
    ctx.setStrokeColor(blue)
    ctx.setLineWidth(12)
    ctx.addPath(CGPath(roundedRect: rect.insetBy(dx: 6, dy: 6), cornerWidth: 15,
                       cornerHeight: 15, transform: nil))
    ctx.strokePath()
  }
  let barX = rowX + box + 52
  if !r.done {
    ctx.setFillColor(rgb(0xFFCF66))
    ctx.addPath(CGPath(roundedRect: CGRect(x: barX - 30, y: r.y - 36, width: r.bar + 60, height: 72),
                       cornerWidth: 18, cornerHeight: 18, transform: nil))
    ctx.fillPath()
  }
  ctx.setStrokeColor(r.done ? rgb(0xC9D7F5) : blue)
  ctx.setLineWidth(30)
  ctx.move(to: CGPoint(x: barX, y: r.y))
  ctx.addLine(to: CGPoint(x: barX + r.bar, y: r.y))
  ctx.strokePath()
}

let img = ctx.makeImage()!
let rep = NSBitmapImageRep(cgImage: img)
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
