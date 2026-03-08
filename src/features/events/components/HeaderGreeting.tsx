import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const HeaderGreeting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Welcome, James</Text>
      <View style={styles.iconsContainer}>
        <Button variant="ghost" size="icon" style={styles.iconButton}>
          <Search size={24} color={colors.text.primary} />
        </Button>
        <Button variant="ghost" size="icon" style={styles.iconButton}>
          <View>
            <Bell size={24} color={colors.text.primary} />
            <View style={styles.badge} />
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    // Removed background color to allow blur effect from parent
  },
  greetingText: {
    color: colors.text.primary,
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.bold,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    marginRight: -12, // Negative margin to offset button internal padding/width
  },
  iconButton: {
    // No padding needed for fixed size icon buttons
    width: 48,
    height: 48,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.accent,
    borderWidth: 1,
    borderColor: '#000', // Match background color for cutout effect
  },
});
