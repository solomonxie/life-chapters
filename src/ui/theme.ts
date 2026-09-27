import { Platform } from 'react-native';

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 6, md: 10, lg: 14 } as const;

export const type = {
  title: { fontSize: 28, fontWeight: '700' as const },
  headline: { fontSize: 20, fontWeight: '600' as const },
  heading: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.6 },
  body: { fontSize: 16, fontWeight: '400' as const },
  label: { fontSize: 16, fontWeight: '500' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  mono: {
    fontSize: 13,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
};

export const light = {
  bg: '#F2F2F7',
  card: '#FFFFFF',
  text: '#101014',
  dim: '#6B6B76',
  faint: '#AEAEB6',
  hairline: '#E2E2E8',
  accent: '#2F6FEB',
  accentSoft: '#E6EEFD',
  onAccent: '#FFFFFF',
  late: '#C7371F',
  lateSoft: '#FBE9E6',
  warn: '#B26A00',
  done: '#1F7A46',
  past: '#9A9AA5',
  backdrop: '#00000055',
};

export const dark: typeof light = {
  bg: '#000000',
  card: '#1C1C1F',
  text: '#F2F2F5',
  dim: '#9A9AA5',
  faint: '#5A5A64',
  hairline: '#2C2C33',
  accent: '#5C8DF6',
  accentSoft: '#1B2A4A',
  onAccent: '#FFFFFF',
  late: '#F0705A',
  lateSoft: '#3A1C17',
  warn: '#E0A04A',
  done: '#4FB37A',
  past: '#6B6B76',
  backdrop: '#00000088',
};

export type Palette = typeof light;
