import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Check, ScanBarcode, PieChart, Settings } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Mock participants data
const INITIAL_PARTICIPANTS = [
  { id: '1', name: 'John Smith', checkedIn: true },
  { id: '2', name: 'Sarah Johnson', checkedIn: false },
  { id: '3', name: 'Michael Davis', checkedIn: true },
  { id: '4', name: 'Emily Wilson', checkedIn: true },
  { id: '5', name: 'James Anderson', checkedIn: false },
  { id: '6', name: 'Jennifer Brown', checkedIn: true },
  { id: '7', name: 'William Taylor', checkedIn: false },
  { id: '8', name: 'Jessica Martinez', checkedIn: true },
  { id: '9', name: 'James St. Patrick', checkedIn: false },
  { id: '10', name: 'David Thompson', checkedIn: false },
  { id: '11', name: 'Ashley Lewis', checkedIn: true },
];

export const PlannerEventParticipantsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { event } = route.params || {};

  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCheckIn = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checkedIn: !p.checkedIn } : p))
    );
  };

  const renderParticipantItem = ({ item }: { item: typeof INITIAL_PARTICIPANTS[0] }) => (
    <TouchableOpacity
      style={styles.participantItem}
      onPress={() => toggleCheckIn(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.participantName}>{item.name}</Text>
      {item.checkedIn && <Check size={20} color="#00FF00" />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Participants</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search participants"
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats */}
      <Text style={styles.statsText}>
        All participants: {participants.length}
      </Text>

      {/* List */}
      <FlatList
        data={filteredParticipants}
        renderItem={renderParticipantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>
         <TouchableOpacity style={styles.iconButton}>
            <ScanBarcode size={24} color="#FFF" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconButton}>
            <PieChart size={24} color="#666" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color="#666" />
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 48,
    marginTop: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontFamily: typography.fonts.medium,
    fontSize: 16,
  },
  statsText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontFamily: typography.fonts.medium,
    marginLeft: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  participantName: {
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: typography.fonts.medium,
  },
  separator: {
    height: 1,
    backgroundColor: '#222',
  },
  bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#111',
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
  },
  iconButton: {
      padding: 10,
  }
});
