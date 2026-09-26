import { useColorScheme } from 'react-native';
import { dark, light, type Palette } from './theme';

export const usePalette = (): Palette =>
  useColorScheme() === 'dark' ? dark : light;
