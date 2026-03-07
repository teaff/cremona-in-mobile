import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { HeaderGreeting } from '../components/HeaderGreeting';
import { FilterChips } from '../components/FilterChips';
import { EventCardFeatured } from '../components/EventCardFeatured';
import { EventCardCompact } from '../components/EventCardCompact';
import { Event } from '../data/events.mock';
import {
  getFeaturedEvents,
  getUpcomingEvents,
} from '../services/eventsService';

const { width } = Dimensions.get('window');
const FEATURED_CARD_WIDTH = width * 0.85;
const FEATURED_SNAP_INTERVAL = FEATURED_CARD_WIDTH + spacing.md;
const HEADER_HEIGHT = 70; // Compact header height

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const EventsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, upcoming] = await Promise.all([
          getFeaturedEvents(),
          getUpcomingEvents(),
        ]);
        setFeaturedEvents(featured);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headerIntensity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 90],
    extrapolate: 'clamp',
  });

  const headerBorderOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleEventPress = (id: string) => {
    console.log(`Event pressed: ${id}`);
    const event = [...featuredEvents, ...upcomingEvents].find(
      (e) => e.id === id,
    );
    if (event) {
      (navigation as any).navigate('EventDetails', { event });
    }
  };

  const renderFeaturedItem = ({
    item,
    index,
  }: {
    item: Event;
    index: number;
  }) => (
    <EventCardFeatured
      event={item}
      onPress={handleEventPress}
      style={{
        width: FEATURED_CARD_WIDTH,
        marginRight:
          index === featuredEvents.length - 1 ? spacing.md : spacing.md,
        marginLeft: index === 0 ? spacing.md : 0,
      }}
    />
  );

  const renderHeader = () => (
    <View style={{ paddingTop: HEADER_HEIGHT + insets.top }}>
      <FilterChips selectedId={selectedFilter} onSelect={setSelectedFilter} />

      <View style={styles.featuredSectionContainer}>
        <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.md }]}>
          For You
        </Text>
        {featuredEvents.length > 0 ? (
          <FlatList
            data={featuredEvents}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={FEATURED_SNAP_INTERVAL}
            decelerationRate="fast"
            contentContainerStyle={styles.featuredListContent}
            snapToAlignment="start"
          />
        ) : (
          <Text style={styles.emptyText}>No featured events found.</Text>
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Absolute Positioned Sticky Header */}
      <View
        style={[
          styles.stickyHeaderWrapper,
          { height: HEADER_HEIGHT + insets.top },
        ]}
      >
        <AnimatedBlurView
          intensity={headerIntensity}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        <Animated.View
          style={[styles.headerBorder, { opacity: headerBorderOpacity }]}
        />
        <View
          style={{
            marginTop: insets.top,
            height: HEADER_HEIGHT,
            justifyContent: 'center',
          }}
        >
          <HeaderGreeting />
        </View>
      </View>

      {/* Main Content */}
      <Animated.FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <EventCardCompact event={item} onPress={handleEventPress} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 100 }, // Extra padding for bottom nav
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }, // BlurView intensity doesn't support native driver usually
        )}
        scrollEventThrottle={16}
      />

      {/* Bottom Navigation */}
      {/* Bottom Padding for Tab Bar */}
      <View style={{ height: 100 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  stickyHeaderWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'flex-end',
  },
  headerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  featuredSectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionContainer: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  featuredListContent: {
    paddingRight: spacing.md,
  },
  itemWrapper: {
    paddingHorizontal: spacing.md,
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
    fontFamily: typography.fonts.regular,
  },
});
