import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Bell, Heart } from 'lucide-react-native';
import { Image } from 'expo-image';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// Mock Data
const CATEGORIES = [
  {
    id: '1',
    label: 'Culture',
    image:
      'https://images.unsplash.com/photo-1576016770956-debb63d92058?q=80&w=400&auto=format&fit=crop', // Cremona Torrazzo/Duomo
  },
  {
    id: '2',
    label: 'Arts',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop', // Landscape/Stars (Stable)
  },
  {
    id: '3',
    label: 'Flavours',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop', // Italian Food
  },
  {
    id: '4',
    label: 'Nature',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop', // Nature/River
  },
  {
    id: '5',
    label: 'Sport',
    image:
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&auto=format&fit=crop', // Sport/Rowing
  },
];

const TOP_EXPERIENCES = [
  {
    id: '1',
    title: 'Cattedrale Di Santa Maria Assunta',
    price: '15,00€',
    image:
      'https://images.unsplash.com/photo-1576016770956-debb63d92058?q=80&w=800&auto=format&fit=crop', // Cremona Cathedral
  },
  {
    id: '2',
    title: 'Museo del Violino',
    price: '12,00€',
    image:
      'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=800&auto=format&fit=crop', // Violin
  },
  {
    id: '3',
    title: 'Torrazzo di Cremona',
    price: '5,00€',
    image:
      'https://images.unsplash.com/photo-1576016770956-debb63d92058?q=80&w=800&auto=format&fit=crop', // Torrazzo
  },
];

const ALL_ACTIVITIES = [
  {
    id: '1',
    title: 'Museo Civico Ala Ponzone',
    address: 'Via Dati Ugolani 4, Cremona',
    price: '10,00€',
    image:
      'https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=800&auto=format&fit=crop', // Art Museum
  },
  {
    id: '2',
    title: 'Battistero Di Cremona',
    address: "Piazza Sant'Antonio Maria Zaccaria 11",
    price: '10,00€',
    image:
      'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?q=80&w=800&auto=format&fit=crop', // Brick Architecture (Battistero style)
  },
  {
    id: '3',
    title: 'Museo Archeologico',
    address: 'Via San Lorenzo 4, Cremona',
    price: '8,00€',
    image:
      'https://images.unsplash.com/photo-1599582324717-5e6f272b223c?q=80&w=800&auto=format&fit=crop', // Ancient Statues
  },
];

export const TravelScreen = () => {
  const insets = useSafeAreaInsets();

  const renderCategoryItem = ({ item }: { item: (typeof CATEGORIES)[0] }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} contentFit="cover" />
      </View>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </View>
  );

  const renderTopExperienceItem = ({
    item,
  }: {
    item: (typeof TOP_EXPERIENCES)[0];
  }) => (
    <TouchableOpacity style={styles.topExperienceCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.topExperienceImage} contentFit="cover" />
      <View style={styles.topExperienceContent}>
        <Text style={styles.topExperienceTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.topExperiencePrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome, Tourist</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#FFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Top Experiences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Experiences</Text>
          <FlatList
            data={TOP_EXPERIENCES}
            renderItem={renderTopExperienceItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topExperiencesList}
            snapToInterval={280 + spacing.md} // Card width + margin
            decelerationRate="fast"
          />
        </View>

        {/* All Activities */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>All Activities</Text>
          {ALL_ACTIVITIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityCard}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.activityImage}
                contentFit="cover"
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityAddress} numberOfLines={2}>
                  {item.address}
                </Text>
                <Text style={styles.activityPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.activityHeartButton}>
                <Heart size={20} color="#FFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Padding for TabBar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: typography.fonts.bold,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconButton: {
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: '#000',
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  categoriesContainer: {
    marginBottom: spacing.xl,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryLabel: {
    color: colors.text.secondary,
    fontSize: 12,
    fontFamily: typography.fonts.medium,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: typography.fonts.bold,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  topExperiencesList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  topExperienceCard: {
    width: 280,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  topExperienceImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  topExperienceContent: {
    padding: spacing.md,
  },
  topExperienceTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
    marginBottom: spacing.xs,
    height: 44, // Fixed height for 2 lines
  },
  topExperiencePrice: {
    color: colors.primary, // Red/Orange
    fontSize: 14,
    fontFamily: typography.fonts.bold,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    height: 110,
  },
  activityImage: {
    width: 110,
    height: '100%',
    resizeMode: 'cover',
  },
  activityContent: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
    paddingRight: 40, // Space for heart
  },
  activityTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
    marginBottom: 4,
  },
  activityAddress: {
    color: colors.text.secondary,
    fontSize: 12,
    fontFamily: typography.fonts.regular,
    marginBottom: 8,
  },
  activityPrice: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: typography.fonts.bold,
  },
  activityHeartButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    padding: 8,
  },
});
