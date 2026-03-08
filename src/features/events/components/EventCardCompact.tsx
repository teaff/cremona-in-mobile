import React, { memo, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { MapPin, Heart } from 'lucide-react-native';
import { Event } from '@/data/events.mock';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface EventCardCompactProps {
  event: Event;
  onPress: (id: string) => void;
}

export const EventCardCompact = ({
  event,
  onPress,
}: {
  event: any;
  onPress: (id: string) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(event.id)}
      activeOpacity={0.7}
    >
      {/* Left Image Section - Full Height */}
      <View style={styles.imageSection}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        {/* Date Badge Overlay */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{event.dayLabel}</Text>
          <Text style={styles.dateMonth}>{event.monthLabel}</Text>
        </View>
      </View>

      {/* Right Content Section - With Padding */}
      <View style={styles.contentSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>

          <View style={styles.locationRow}>
            <MapPin size={14} color="#A0A0A0" style={{ marginTop: 2 }} />
            <Text style={styles.locationText} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        </View>

        <Text style={styles.priceText}>{event.priceLabel}</Text>
      </View>

      {/* Heart Button Overlay or Right Aligned */}
      <TouchableOpacity style={styles.heartButton}>
        <Heart size={20} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: '#000',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    marginBottom: spacing.md,
  },
  imageSection: {
    width: 120,
    height: '100%',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dateBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    lineHeight: 18,
  },
  dateMonth: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: typography.fonts.medium,
    textTransform: 'uppercase',
  },
  contentSection: {
    flex: 1,
    padding: 12, // Padding only for text content
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    marginBottom: 4,
    paddingRight: 30, // Space for heart button
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  locationText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: typography.fonts.regular,
    flex: 1,
  },
  priceText: {
    color: '#E02D3C', // Red accent
    fontSize: 14,
    fontFamily: typography.fonts.bold,
  },
  heartButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10, // Center vertically roughly
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
});
