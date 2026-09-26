import { Platform } from 'react-native';

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;

export const radius = { sm: 6, md: 10, lg: 14 } as const;

export const type = {
  title: { fontSize: 28, fontWeight: '700' as const },
  heading: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.6 },
  body: { fontSize: 16, fontWeight: '400' as const },
  label: { fontSize: 15, fontWeight: '500' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  mono: {
    fontSize: 13,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
};

export const light = {
  bg: '#F7F7F9',
  card: '#FFFFFF',
  text: '#101014',
  dim: '#6B6B76',
  hairline: '#E2E2E8',
  accent: '#2F6FEB',
  late: '#C7371F',
  done: '#1F7A46',
  past: '#9A9AA5',
};

export const dark: typeof light = {
  bg: '#0E0E11',
  card: '#1A1A20',
  text: '#F2F2F5',
  dim: '#9A9AA5',
  hairline: '#2A2A33',
  accent: '#5C8DF6',
  late: '#F0705A',
  done: '#4FB37A',
  past: '#6B6B76',
};

export type Palette = typeof light;
