import React, { memo, useState } from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { MapPin, Heart } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Event } from '../data/events.mock';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface EventCardFeaturedProps {
  event: Event;
  onPress: (id: string) => void;
  style?: ViewStyle;
}

export const EventCardFeatured = memo(
  ({ event, onPress, style }: EventCardFeaturedProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
      <Button
        variant="ghost"
        onPress={() => onPress(event.id)}
        style={[
          styles.cardContainer,
          style || {},
          {
            paddingHorizontal: 0,
            flexDirection: 'column',
            alignItems: 'stretch',
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.imageUrl }} style={styles.image} />

          <View style={styles.overlayContainer}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateDay}>{event.dayLabel}</Text>
              <Text style={styles.dateMonth}>{event.monthLabel}</Text>
            </View>
            <Button
              variant="ghost"
              size="icon"
              style={styles.heartButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                size={24}
                color={isFavorite ? colors.primary : colors.text.primary}
                fill={isFavorite ? colors.primary : 'transparent'}
              />
            </Button>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.text.secondary} />
            <Text style={styles.location} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
          <Text style={styles.price}>{event.priceLabel}</Text>
        </View>
      </Button>
    );
  },
);

const styles = StyleSheet.create({
  cardContainer: {
    height: 320, // Taller to accommodate content below image
    width: '100%',
    borderRadius: 24, // More rounded for premium feel
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginBottom: spacing.lg,
    // Add shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#222222',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 24, // Added to match card container and round bottom corners
  },
  overlayContainer: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)', // Keeping semi-transparent for overlay
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: {
    color: colors.text.primary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
  },
  dateMonth: {
    color: colors.text.secondary,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    textTransform: 'uppercase',
  },
  heartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contentContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text.primary,
    fontSize: 22, // Slightly larger
    fontFamily: typography.fonts.bold,
    lineHeight: 28,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: -4,
  },
  location: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    flex: 1,
    fontFamily: typography.fonts.regular,
  },
  price: {
    color: colors.text.accent,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
  },
});
