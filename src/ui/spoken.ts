/** Text as VoiceOver should say it, without the decorative glyphs. */
export function spoken(text: string): string {
  return text
    .replace(/(\d)\+/g, '$1 and over')
    .replace(/(^|\s)[+!](?=\s|$)/g, ' ')
    .replace(/[⚠›‹⌄▾▴✎○●＋✓✕]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .trim();
}
