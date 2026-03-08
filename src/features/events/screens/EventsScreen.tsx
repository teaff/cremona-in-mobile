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
  RefreshControl,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { HeaderGreeting } from '../components/HeaderGreeting';
import { FilterChips } from '../components/FilterChips';
import { EventCardFeatured } from '../components/EventCardFeatured';
import { EventCardCompact } from '../components/EventCardCompact';
import { Event } from '@/data/events.mock';
import { usePublicEvents } from '@/features/events/hooks/useEvents';
import { Event as SupabaseEvent } from '@/services/events';

const { width } = Dimensions.get('window');
const FEATURED_CARD_WIDTH = width * 0.85;
const FEATURED_SNAP_INTERVAL = FEATURED_CARD_WIDTH + spacing.md;
const HEADER_HEIGHT = 70; // Compact header height

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const EventsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { events: supabaseEvents, loading: loadingEvents, error, refetch } = usePublicEvents();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Function to map Supabase events to UI events
  const mapSupabaseEventToUi = (event: SupabaseEvent): Event => {
    const dateObj = new Date(event.start_date);
    const dayLabel = dateObj.getDate().toString();
    const monthLabel = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const time = dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    
    // Format price label
    let priceLabel = 'Free';
    if (event.price !== undefined && event.price !== null) {
        if (event.price === 0) {
            priceLabel = 'Free';
        } else {
            priceLabel = `${event.price}€`;
        }
    }
    if (event.drink_included) {
        priceLabel += ' + Drink';
    }

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.start_date,
      location: event.location,
      imageUrl: event.image_path || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80', // Fallback image
      dayLabel,
      monthLabel,
      category: event.category || 'Evento', 
      priceLabel, 
      isFeatured: false,
      specialGuest: '',
      duration: '',
      time,
      host: {
        name: 'Cremona In',
        subtitle: 'Organizer',
        avatar: 'https://github.com/shadcn.png',
        phone: '',
        email: '',
        website: '',
      },
      coordinates: { lat: 0, lng: 0 },
    };
  };

  useEffect(() => {
    if (!loadingEvents && supabaseEvents) {
      const uiEvents = supabaseEvents.map(mapSupabaseEventToUi);
      
      // Simple logic: first 3 events are featured, rest are upcoming
      // Or filter by some property if available
      const featured = uiEvents.slice(0, 3).map(e => ({ ...e, isFeatured: true }));
      const upcoming = uiEvents.slice(3);

      setFeaturedEvents(featured);
      setUpcomingEvents(upcoming);
      setLoading(false);
    }
  }, [supabaseEvents, loadingEvents]);

  if (error) {
    console.error('Error loading events:', error);
    // You might want to show an error UI here
  }

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
    <View>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF" // White for better visibility on dark blur
            colors={[colors.primary]}
            progressViewOffset={HEADER_HEIGHT + insets.top + 40} // Push it down further
          />
        }
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <EventCardCompact event={item} onPress={handleEventPress} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.listContent,
          { 
            paddingTop: HEADER_HEIGHT + insets.top,
            paddingBottom: 100 
          }, 
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
