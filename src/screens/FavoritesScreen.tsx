import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Fixed Header Title with Blur */}
      <BlurView
        intensity={80}
        tint="systemChromeMaterialDark"
        style={[styles.headerContainer, { paddingTop: insets.top }]}
      >
        <Text style={styles.headerTitle}>Favorites</Text>
      </BlurView>

      <View style={styles.contentContainer}>
        <View style={styles.emptyStateContainer}>
          <Heart
            size={64}
            color={colors.text.primary}
            style={styles.icon}
          />
          <Text style={styles.title}>No favorite events</Text>
          <Text style={styles.subtitle}>
            Currently, there are no favorite events. Stay updated for upcoming
            opportunities!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: typography.fonts.semiBold,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 300,
  },
  icon: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text.primary,
    fontSize: 18,
    fontFamily: typography.fonts.semiBold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: typography.fonts.regular,
  },
});
