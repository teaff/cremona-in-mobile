import { Platform } from 'react-native';

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const lightColors = {
  background: '#FFFFFF',
  foreground: '#000000',
  card: '#F2F2F7',
  cardForeground: '#000000',
  popover: '#F2F2F7',
  popoverForeground: '#000000',
  primary: '#CF0607', // Brand Primary
  primaryForeground: '#FFFFFF',
  secondary: '#F2F2F7',
  secondaryForeground: '#18181b',
  muted: '#78788033',
  mutedForeground: '#71717a',
  accent: '#F2F2F7',
  accentForeground: '#18181b',
  destructive: '#ef4444',
  destructiveForeground: '#FFFFFF',
  border: '#C6C6C8',
  input: '#e4e4e7',
  ring: '#a1a1aa',
  text: '#000000',
  textMuted: '#71717a',
  tint: '#CF0607', // Brand Primary
  icon: '#71717a',
  tabIconDefault: '#71717a',
  tabIconSelected: '#CF0607',
  blue: '#007AFF',
  green: '#34C759',
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  pink: '#FF2D92',
  purple: '#AF52DE',
  teal: '#5AC8FA',
  indigo: '#5856D6',
};

export const darkColors = {
  background: '#050509', // Brand Background
  foreground: '#FFFFFF',
  card: '#191919', // Brand Card Background
  cardForeground: '#FFFFFF',
  popover: '#191919',
  popoverForeground: '#FFFFFF',
  primary: '#CF0607', // Brand Primary
  primaryForeground: '#FFFFFF',
  secondary: '#191919',
  secondaryForeground: '#FFFFFF',
  muted: '#78788033',
  mutedForeground: '#A0A0A0', // Brand Secondary Text
  accent: '#191919',
  accentForeground: '#FFFFFF',
  destructive: '#dc2626',
  destructiveForeground: '#FFFFFF',
  border: '#222222',
  input: 'rgba(255, 255, 255, 0.15)',
  ring: '#71717a',
  text: '#FFFFFF',
  textMuted: '#A0A0A0', // Brand Secondary Text
  tint: '#CF0607', // Brand Primary
  icon: '#A0A0A0',
  tabIconDefault: '#A0A0A0',
  tabIconSelected: '#FFFFFF',
  blue: '#0A84FF',
  green: '#30D158',
  red: '#FF453A',
  orange: '#FF9F0A',
  yellow: '#FFD60A',
  pink: '#FF375F',
  purple: '#BF5AF2',
  teal: '#64D2FF',
  indigo: '#5E5CE6',
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

// Legacy support for existing components
export const colors = {
  background: darkColors.background,
  cardBackground: darkColors.card,
  primary: darkColors.primary,
  text: {
    primary: darkColors.text,
    secondary: darkColors.textMuted,
    accent: darkColors.primary,
  },
  filters: {
    tonight: '#FFD700',
    week: '#B22222',
    openBar: '#FF4500',
    sport: '#32CD32',
    default: '#333333',
  },
  overlay: 'rgba(0,0,0,0.5)',
  transparent: 'transparent',
};
