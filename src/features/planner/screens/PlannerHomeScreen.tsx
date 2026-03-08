import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScanBarcode, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

// Mock data for planner events
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Pool Beer Pong Party',
    location: 'Via Delle Piscine 102, Castelvetro (PC)',
    date: '09 Sep 2023',
    image: 'https://images.unsplash.com/photo-1574096079513-d82599602950?w=500&q=80',
    status: 'active',
  },
  {
    id: '2',
    title: 'Techno Bunker Night',
    location: 'Underground Club, Cremona',
    date: '15 Sep 2023',
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&q=80',
    status: 'active',
  },
  {
    id: '3',
    title: 'Jazz Festival Opening',
    location: 'Teatro Ponchielli, Cremona',
    date: '01 Aug 2023',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&q=80',
    status: 'done',
  },
];

export const PlannerHomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'active' | 'done'>('active');

  const filteredEvents = MOCK_EVENTS.filter(
    (event) => event.status === activeTab
  );

  const handleEventPress = (event: any) => {
    navigation.navigate('PlannerParticipants', { event });
  };

  const renderEventCard = ({ item }: { item: typeof MOCK_EVENTS[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleEventPress(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} contentFit="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardLocation} numberOfLines={1}>
          {item.location}
        </Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
      <ChevronRight size={20} color={colors.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Check In</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'active' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'done' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('done')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'done' && styles.activeTabText,
            ]}
          >
            Done events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found</Text>
          </View>
        }
      />

      {/* FAB - Scan Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => {
          // Open scanner logic here
          console.log('Open scanner');
        }}
      >
        <ScanBarcode size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#222',
  },
  tabText: {
    color: colors.text.secondary,
    fontFamily: typography.fonts.medium,
    fontSize: 14,
  },
  activeTabText: {
    color: colors.text.primary,
    fontFamily: typography.fonts.semiBold,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100, // Space for bottom tab
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    backgroundColor: 'transparent',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#222',
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  cardTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
    marginBottom: 4,
  },
  cardLocation: {
    color: colors.text.secondary,
    fontSize: 12,
    marginBottom: 4,
  },
  cardDate: {
    color: '#FF3B30', // Red accent color for date
    fontSize: 12,
    fontFamily: typography.fonts.medium,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: 110, // Above tab bar
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF0000', // Red primary for planner
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
