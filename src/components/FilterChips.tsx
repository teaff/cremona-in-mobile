import React, { memo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  Moon,
  Calendar,
  Wine,
  Trophy,
  Music,
  Palette,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface FilterCategory {
  id: string;
  label: string;
  Icon: React.ComponentType<any>;
  color: string;
}

const CATEGORIES: FilterCategory[] = [
  { id: '1', label: 'Tonight', Icon: Moon, color: colors.filters.tonight },
  { id: '2', label: 'Week', Icon: Calendar, color: colors.filters.week },
  { id: '3', label: 'Open Bar', Icon: Wine, color: colors.filters.openBar },
  { id: '4', label: 'Sport', Icon: Trophy, color: colors.filters.sport },
  { id: '5', label: 'Music', Icon: Music, color: '#9370DB' }, // MediumPurple
  { id: '6', label: 'Art', Icon: Palette, color: '#FF69B4' }, // HotPink
];

interface FilterChipsProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const FilterChips = ({ selectedId, onSelect }: FilterChipsProps) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: FilterCategory;
    index: number;
  }) => {
    const isSelected = item.id === selectedId;

    return (
      <View style={styles.itemWrapper}>
        <Button
          variant="ghost"
          onPress={() => onSelect(item.id)}
          style={[
            styles.itemContainer,
            isSelected ? styles.selectedItemContainer : {},
          ]}
        >
          <item.Icon
            size={16}
            color={isSelected ? '#000' : '#A0A0A0'}
            strokeWidth={2}
          />

          <Text style={[styles.label, isSelected ? styles.selectedLabel : {}]}>
            {item.label}
          </Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    maxHeight: 60,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  itemWrapper: {
    // No specific wrapper style needed for chips
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E', // Dark grey background
    paddingHorizontal: spacing.lg,
    paddingVertical: 10, // Fixed height feel
    borderRadius: 100, // Pill shape
    borderWidth: 1,
    borderColor: '#2C2C2E',
    height: 'auto',
    minHeight: 40,
    gap: spacing.xs,
  },
  selectedItemContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  // Removed iconContainer styles as we might not need big icons anymore
  label: {
    color: colors.text.secondary, // Grey text
    fontSize: typography.sizes.md, // Slightly larger for readability
    fontFamily: typography.fonts.medium,
    // marginLeft: spacing.xs, // If icon is present
  },
  selectedLabel: {
    color: '#000000', // Black text on white background
    fontFamily: typography.fonts.semiBold,
  },
});
