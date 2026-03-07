import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  LayoutAnimation,
  UIManager,
  Animated,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/ui/share';
import {
  ArrowLeft,
  Share,
  Heart,
  Wine,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Event } from '../data/events.mock';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height / 1.618;

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type RootStackParamList = {
  EventDetails: { event: Event };
};

type EventDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetails'
>;

export const EventDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<EventDetailsScreenRouteProp>();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { event } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleDescription = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Default values for optional fields to avoid crashes
  const description =
    event.description || 'No description available for this event.';
  const specialGuest = event.specialGuest || 'TBA';
  const duration = event.duration || 'TBA';
  const time = event.time || 'TBA';
  const host = event.host || {
    name: 'Organizer',
    subtitle: 'Event Host',
    avatar: 'https://via.placeholder.com/150',
    phone: '',
    email: '',
    website: '',
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [80, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const originalButtonsOpacity = scrollY.interpolate({
    inputRange: [80, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Sticky Header (Hidden initially) */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            paddingTop: insets.top,
            opacity: headerOpacity,
            zIndex: 20, // Higher than everything
          },
        ]}
        pointerEvents="box-none" // Allow touches to pass through if transparent, but here we control opacity
      >
        <BlurView
          intensity={90}
          tint="systemChromeMaterialDark"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.stickyHeaderContent}>
          <Button
            variant="ghost"
            size="icon"
            style={styles.stickyButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#FFF" />
          </Button>

          <Text style={styles.stickyHeaderTitle} numberOfLines={1}>
            {event.title}
          </Text>

          <ShareButton
            variant="ghost"
            size="icon"
            style={styles.stickyButton}
            content={{
              message: `Check out ${event.title} on Cremona In!`,
              url: `https://cremona.in/events/${event.id}`,
              title: event.title,
            }}
          >
            <Share size={24} color="#FFF" />
          </ShareButton>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }} // Space for sticky bar
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {/* Header Image Section */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: event.imageUrl }} style={styles.headerImage} />

          {/* Gradient Overlay for Text Readability */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
            style={styles.gradientOverlay}
          >
            <View style={styles.headerContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>{event.title}</Text>
              </View>
              <Button
                variant="ghost"
                size="icon"
                style={styles.favoriteButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  size={24}
                  color={isFavorite ? colors.primary : '#FFF'}
                  fill={isFavorite ? colors.primary : 'transparent'}
                />
              </Button>
            </View>
          </LinearGradient>

          {/* Top Navigation Buttons */}
          <Animated.View
            style={[
              styles.topButtonsContainer,
              {
                paddingTop: insets.top + spacing.sm,
                opacity: originalButtonsOpacity,
              },
            ]}
          >
            <Button
              variant="ghost"
              size="icon"
              style={styles.roundButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={24} color="#FFF" />
            </Button>
            <ShareButton
              variant="ghost"
              size="icon"
              style={styles.roundButton}
              content={{
                message: `Check out ${event.title} on Cremona In!`,
                url: `https://cremona.in/events/${event.id}`,
                title: event.title,
              }}
            >
              <Share size={24} color="#FFF" />
            </ShareButton>
          </Animated.View>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Info Row: Date / Category / Time */}
          <View style={styles.infoRow}>
            {/* Date Box */}
            <View style={styles.dateBox}>
              <Text style={styles.dateDay}>{event.dayLabel}</Text>
              <Text style={styles.dateMonth}>{event.monthLabel}</Text>
            </View>

            {/* Category Badge */}
            <View style={styles.categoryBadge}>
              <Wine
                size={20}
                color={colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>

            {/* Time Pill */}
            <View style={styles.timePill}>
              <Clock
                size={20}
                color={colors.text.secondary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={isDescriptionExpanded ? undefined : 3}
            >
              {description}
            </Text>
            <Button
              variant="link"
              onPress={toggleDescription}
              style={styles.readMoreButton}
              textStyle={styles.readMoreText}
              label={isDescriptionExpanded ? 'Read less' : 'Read more'}
            />
          </View>

          {/* Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information</Text>

            <View style={styles.infoItem}>
              <View style={styles.iconBox}>
                <Sparkles size={22} color="#F5D154" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoMainText}>{specialGuest}</Text>
                <Text style={[styles.infoSubText, { color: '#F5D154' }]}>
                  SPECIAL GUEST
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconBox}>
                <MapPin size={22} color={colors.text.primary} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoMainText}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconBox}>
                <Clock size={22} color={colors.text.primary} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoMainText}>{duration}</Text>
                <Text style={styles.infoSubText}>{time}</Text>
              </View>
            </View>
          </View>

          {/* Host Section */}
          <View style={[styles.section, { marginBottom: 40 }]}>
            <Text style={styles.sectionTitle}>Host</Text>

            {/* Main Host Card */}
            <View style={styles.hostCard}>
              <Image source={{ uri: host.avatar }} style={styles.hostAvatar} />
              <View style={styles.hostInfo}>
                <Text style={styles.hostName}>{host.name}</Text>
                <Text style={styles.hostSubtitle}>{host.subtitle}</Text>
              </View>
            </View>

            {/* Contact Rows - Only show if data exists */}
            {host.phone && (
              <Button variant="ghost" style={styles.contactRow}>
                <View style={styles.iconBox}>
                  <Phone size={22} color="#FFF" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{host.phone}</Text>
                  <Text style={styles.contactSubtitle}>Phone number</Text>
                </View>
                <ChevronRight size={20} color={colors.text.secondary} />
              </Button>
            )}

            {host.email && (
              <Button variant="ghost" style={styles.contactRow}>
                <View style={styles.iconBox}>
                  <Mail size={22} color="#FFF" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{host.email}</Text>
                  <Text style={styles.contactSubtitle}>Email</Text>
                </View>
                <ChevronRight size={20} color={colors.text.secondary} />
              </Button>
            )}

            {host.website && (
              <Button variant="ghost" style={styles.contactRow}>
                <View style={styles.iconBox}>
                  <Globe size={22} color="#FFF" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{host.website}</Text>
                  <Text style={styles.contactSubtitle}>Website</Text>
                </View>
                <ChevronRight size={20} color={colors.text.secondary} />
              </Button>
            )}
          </View>

          {/* Maps Directions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maps Directions</Text>
            <View style={styles.mapContainer}>
              {/* Dynamic Map Image */}
              <Image
                source={{
                  uri: event.coordinates
                    ? `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${event.coordinates.lng},${event.coordinates.lat},14,0/400x200?access_token=YOUR_TOKEN`
                    : 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/10.02,45.13,14,0/400x200?access_token=YOUR_TOKEN',
                }}
                style={[StyleSheet.absoluteFill, { opacity: 0.3 }]}
              />
              {/* Grid Lines Pattern (Simulated with View if image fails or just as generic background) */}
              <View
                style={[StyleSheet.absoluteFill, { backgroundColor: '#222' }]}
              />

              {/* Roads/Blocks simulation (Abstract) */}
              <View
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: 0,
                  right: 0,
                  height: 8,
                  backgroundColor: '#333',
                  transform: [{ rotate: '15deg' }],
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '40%',
                  width: 8,
                  backgroundColor: '#333',
                  transform: [{ rotate: '15deg' }],
                }}
              />

              {/* Pin */}
              <View style={styles.mapPin}>
                <MapPin size={32} color={colors.primary} />
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Sticky Buy Ticket Bar */}
      <BlurView
        intensity={90}
        tint="systemChromeMaterialDark"
        style={[
          styles.stickyBar,
          { paddingBottom: insets.bottom + spacing.sm },
        ]}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{event.priceLabel}</Text>
          {event.priceLabel.toLowerCase() !== 'free' && (
            <Text style={styles.perPersonText}>PER PERSON</Text>
          )}
        </View>

        <Button
          style={styles.buyButton}
          textStyle={styles.buyButtonText}
          label="Buy Ticket"
        />
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Deep black background for premium feel
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    width: width,
    position: 'relative',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden', // Clip the image to radius
    backgroundColor: '#111',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%', // Fade from bottom up
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: typography.fonts.heavy,
    width: '80%',
    lineHeight: 34,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  topButtonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contentContainer: {
    padding: spacing.md,
    paddingTop: spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm, // Ensure padding inside the row
  },
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dateDay: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: typography.fonts.heavy,
    lineHeight: 26,
  },
  dateMonth: {
    color: colors.text.secondary,
    fontSize: 10,
    fontFamily: typography.fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 30, 99, 0.08)', // Very subtle primary tint
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30, // Fully rounded pill
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 99, 0.4)', // Visible primary border
  },
  categoryText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: typography.fonts.semiBold,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30, // Fully rounded pill
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  timeText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontFamily: typography.fonts.medium,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: typography.fonts.bold,
    marginBottom: spacing.md,
  },
  descriptionText: {
    color: colors.text.secondary,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: typography.fonts.regular,
  },
  readMoreButton: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: typography.fonts.semiBold,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },

  infoTextContainer: {
    flex: 1,
  },
  infoMainText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
  },
  infoSubText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: typography.fonts.bold,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: spacing.md,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.bold,
  },
  hostSubtitle: {
    color: colors.text.secondary,
    fontSize: 13,
    fontFamily: typography.fonts.regular,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    width: '100%',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: '#0F0F12', // Slightly darker than card
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.medium,
    marginBottom: 2,
  },
  contactSubtitle: {
    color: colors.text.secondary,
    fontSize: 13,
    fontFamily: typography.fonts.regular,
  },
  mapContainer: {
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  mapPin: {
    position: 'absolute',
    zIndex: 10,
    // Center logic is handled by parent justifyContent/alignItems
  },
  stickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  priceContainer: {
    justifyContent: 'center',
  },
  priceText: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: typography.fonts.bold,
  },
  perPersonText: {
    color: colors.text.secondary,
    fontSize: 10,
    fontFamily: typography.fonts.semiBold,
    textTransform: 'uppercase',
  },
  buyButton: {
    backgroundColor: colors.primary, // Using primary color (red/pink)
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    borderRadius: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.bold,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // Height will be determined by padding + content
    overflow: 'hidden',
  },
  stickyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    height: 50, // Fixed height for the content part
  },
  stickyHeaderTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.md,
  },
  stickyButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
