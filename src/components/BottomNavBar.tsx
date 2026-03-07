import React from 'react';
import { StyleSheet } from 'react-native';
import { Home, Ticket, Briefcase, Heart, Settings } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Button } from '@/components/ui/button';

export const BottomNavBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const handlePress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const getIcon = (routeName: string, color: string) => {
    switch (routeName) {
      case 'Events':
        return <Home size={24} color={color} />;
      case 'Tickets':
        return <Ticket size={24} color={color} />;
      case 'Travel':
        return <Briefcase size={24} color={color} />;
      case 'Favorites':
        return <Heart size={24} color={color} />;
      case 'Settings':
        return <Settings size={24} color={color} />;
      default:
        return null;
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="systemChromeMaterialDark"
      style={[
        styles.container,
        {
          bottom: insets.bottom + spacing.xs,
          left: spacing.md,
          right: spacing.md,
          height: 70,
          borderRadius: 35,
          paddingBottom: 0,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const color = isFocused ? colors.text.primary : colors.text.secondary;

        return (
          <Button
            key={route.key}
            variant="ghost"
            size="icon"
            style={styles.tabItem}
            onPress={() => handlePress(route, isFocused)}
          >
            {getIcon(route.name, color)}
          </Button>
        );
      })}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  tabItem: {
    padding: spacing.xs,
  },
});
