import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import { Colors } from '@/theme/colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const NAV_THEME = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.card,
      text: Colors.light.text,
      border: Colors.light.border,
      notification: Colors.light.red,
      tint: Colors.light.primary,
      icon: Colors.light.mutedForeground,
      tabIconDefault: Colors.light.mutedForeground,
      tabIconSelected: Colors.light.primary,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.card,
      text: Colors.dark.text,
      border: Colors.dark.border,
      notification: Colors.dark.red,
      tint: Colors.dark.primary,
      tabIconSelected: Colors.dark.primary,
      icon: Colors.dark.mutedForeground,
      tabIconDefault: Colors.dark.mutedForeground,
    },
  },
};

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <RNThemeProvider
      value={colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light}
    >
      {children}
    </RNThemeProvider>
  );
};
