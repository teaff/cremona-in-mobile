import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LogOut,
  User,
  CreditCard,
  Globe,
  Bell,
  Banknote,
  Headphones,
  ShieldCheck,
  Trash,
  ChevronRight,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useLanguage } from '../context/LanguageContext';

export const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const { t, language, setLanguage } = useLanguage();

  const toggleNotifications = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

  const handleLanguageChange = () => {
    Alert.alert(t('language'), 'Select your preferred language', [
      {
        text: `Italiano ${language === 'it' ? '✓' : ''}`,
        onPress: () => setLanguage('it'),
      },
      {
        text: `English (USA) ${language === 'en' ? '✓' : ''}`,
        onPress: () => setLanguage('en'),
      },
      {
        text: t('cancel'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header Title with Blur */}
      <BlurView
        intensity={80}
        tint="systemChromeMaterialDark"
        style={[styles.headerContainer, { paddingTop: insets.top }]}
      >
        <Text style={styles.headerTitle}>{t('settings')}</Text>
      </BlurView>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 60 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ACCOUNT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('account')}</Text>
          <View style={styles.accountCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
              }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>Alex Herzoh</Text>
              <Text style={styles.accountEmail}>alexherzoh@gmail.com</Text>
            </View>
            <Button
              variant="ghost"
              size="icon"
              style={styles.logoutButton}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }}
            >
              <LogOut size={20} color={colors.primary} />
            </Button>
          </View>
        </View>

        {/* PROFILE SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('profile')}</Text>

          <Button variant="ghost" style={[styles.rowItem, { height: 'auto' }]}>
            <View style={styles.rowLeft}>
              <User
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('personalInfo')}</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Button>

          <View style={styles.separator} />

          <Button variant="ghost" style={[styles.rowItem, { height: 'auto' }]}>
            <View style={styles.rowLeft}>
              <CreditCard
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('paymentDetails')}</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Button>

          <View style={styles.separator} />
        </View>

        {/* PREFERENCES SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('preferences')}</Text>

          <Button
            variant="ghost"
            style={[styles.rowItem, { height: 'auto' }]}
            onPress={handleLanguageChange}
          >
            <View style={styles.rowLeft}>
              <Globe
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('language')}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>
                {language === 'it' ? 'Italiano' : 'English (USA)'}
              </Text>
              <ChevronRight size={20} color={colors.text.secondary} />
            </View>
          </Button>

          <View style={styles.separator} />

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Bell
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('notifications')}</Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#32CD32' }}
              thumbColor={isNotificationsEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>

          <View style={styles.separator} />

          <Button variant="ghost" style={[styles.rowItem, { height: 'auto' }]}>
            <View style={styles.rowLeft}>
              <Banknote
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('currency')}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>EUR</Text>
              <ChevronRight size={20} color={colors.text.secondary} />
            </View>
          </Button>

          <View style={styles.separator} />
        </View>

        {/* HELP SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('help')}</Text>

          <Button variant="ghost" style={[styles.rowItem, { height: 'auto' }]}>
            <View style={styles.rowLeft}>
              <Headphones
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('contactSupport')}</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Button>

          <View style={styles.separator} />

          <Button variant="ghost" style={[styles.rowItem, { height: 'auto' }]}>
            <View style={styles.rowLeft}>
              <ShieldCheck
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('privacyCenter')}</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Button>

          <View style={styles.separator} />
        </View>

        {/* ACCOUNT DELETION SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('accountDeletion')}</Text>

          <Button variant="ghost" style={[styles.rowItem, { height: 'auto' }]}>
            <View style={styles.rowLeft}>
              <Trash
                size={22}
                color={colors.text.primary}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t('deleteAccount')}</Text>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Button>

          <View style={styles.separator} />
        </View>

        <Text style={styles.versionText}>v 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Deep black background
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  headerContainer: {
    paddingBottom: spacing.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: typography.fonts.semiBold,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    color: colors.text.secondary,
    fontSize: 12,
    fontFamily: typography.fonts.semiBold,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111', // Dark card background
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#404040', // Uniform color
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    marginBottom: 2,
  },
  accountEmail: {
    color: colors.text.secondary,
    fontSize: 13,
    fontFamily: typography.fonts.regular,
  },
  logoutButton: {
    padding: spacing.sm,
    backgroundColor: 'rgba(207, 6, 7, 0.1)', // Light red tint
    borderRadius: 12,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: 0,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    marginRight: spacing.sm,
    width: 24, // Fixed width for alignment
  },
  rowLabel: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.regular,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    color: colors.text.secondary,
    fontSize: 14,
    marginRight: spacing.sm,
    fontFamily: typography.fonts.regular,
  },
  separator: {
    height: 1,
    backgroundColor: '#404040', // Uniform color
    marginLeft: 36, // Indent to align with text (icon width 24 + margin 12)
  },
  versionText: {
    color: colors.text.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    opacity: 0.5,
    fontFamily: typography.fonts.regular,
  },
});
