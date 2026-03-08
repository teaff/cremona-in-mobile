import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');
const COLUMN_WIDTH = width / 3 - 16; // 3 columns with padding
const IMAGE_HEIGHT = 160;
const GAP = 12;
const CONTAINER_HEIGHT = height * 0.6; // 60% of screen height

// Extended image list with unique photos for each column to ensure variety
const BASE_IMAGES = {
  col1: [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80', // Party Crowd
    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&q=80', // Club DJ
    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=500&q=80', // Concert Lights
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&q=80', // Night Bus
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80', // Fancy Food
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&q=80', // Cocktail Bar
    'https://images.unsplash.com/photo-1574096079513-d82599602950?w=500&q=80', // Restaurant Interior
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80', // Night Club
  ],
  col2: [
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&q=80', // Club Atmosphere
    'https://images.unsplash.com/photo-1542123613-c77d588bb414?w=500&q=80', // Architecture/City
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80', // Travel/Boat
    'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=500&q=80', // Museum/Art
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80', // Restaurant
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80', // Party Lights
    'https://images.unsplash.com/photo-1537047902294-622870262242?w=500&q=80', // Night Street
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&q=80', // Bar Drinks
  ],
  col3: [
    'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=500&q=80', // Neon Sign
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80', // Food Platter
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', // DJ Console
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', // Beach/Travel
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80', // Hotel/Resort
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80', // Luxury Hotel
    'https://images.unsplash.com/photo-1549488352-84b675acf254?w=500&q=80', // City Night
    'https://images.unsplash.com/photo-1571587329580-c204c9955743?w=500&q=80', // Pool Party
  ],
};

// Triplicate images to ensure infinite scroll coverage without gaps
const IMAGES = {
  col1: [...BASE_IMAGES.col1, ...BASE_IMAGES.col1, ...BASE_IMAGES.col1],
  col2: [...BASE_IMAGES.col2, ...BASE_IMAGES.col2, ...BASE_IMAGES.col2],
  col3: [...BASE_IMAGES.col3, ...BASE_IMAGES.col3, ...BASE_IMAGES.col3],
};

const Column = ({
  images,
  initialOffset = 0,
  duration = 80000, // Slower default duration
  reverse = false,
}: {
  images: string[];
  initialOffset?: number;
  duration?: number;
  reverse?: boolean;
}) => {
  const translateY = useSharedValue(initialOffset);

  // Calculate total height of content
  const contentHeight = images.length * (IMAGE_HEIGHT + GAP) - GAP;

  useEffect(() => {
    // Scroll a large portion of the list
    // We scroll until the end of the second repetition to ensure smoothness
    const targetOffset = reverse
      ? 0
      : -(contentHeight - CONTAINER_HEIGHT - 100);

    translateY.value = withRepeat(
      withTiming(targetOffset, {
        duration,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      true, // Reverse direction on repeat (yoyo)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.column, animatedStyle]}>
      {images.map((uri, index) => (
        <Image key={`${index}-${uri}`} source={{ uri }} style={styles.image} contentFit="cover" />
      ))}
    </Animated.View>
  );
};

export const OnboardingImageGrid = () => {
  return (
    <View style={styles.container}>
      {/* Column 1 - Scroll Up (Slow) */}
      <Column images={IMAGES.col1} initialOffset={0} duration={120000} />

      {/* Column 2 - Scroll Up (Slower) */}
      <Column images={IMAGES.col2} initialOffset={-50} duration={140000} />

      {/* Column 3 - Scroll Up (Slowest) */}
      <Column images={IMAGES.col3} initialOffset={-100} duration={130000} />

      {/* Top Gradient */}
      <LinearGradient
        colors={['#000000', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      />

      {/* Bottom Gradient */}
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: GAP,
    marginBottom: -20,
  },
  column: {
    width: COLUMN_WIDTH,
    gap: GAP,
  },
  image: {
    width: COLUMN_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
});
