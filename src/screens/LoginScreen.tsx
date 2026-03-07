import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { layout } from '@/theme/layout';
import { typography } from '@/theme/typography';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar } from 'lucide-react-native';
import { LoginFooter } from '@/components/LoginFooter';

const { width } = Dimensions.get('window');

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const handleLogin = () => {
    // Navigate to the main app (TabNavigator)
    // We assume 'Main' is the name of the TabNavigator stack screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo_white_transparent.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title} variant="heading">
            Cremona In
          </Text>
          <Text style={styles.subtitle} variant="body">
            {t('loginSubtitle')}
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          <Button
            variant="outline"
            onPress={handleLogin}
            style={styles.socialButton}
          >
            <Ionicons name="logo-google" size={24} color="#fff" />
            <Text style={styles.buttonText} variant="body">
              {t('continueWithGoogle')}
            </Text>
          </Button>

          <Button
            variant="outline"
            onPress={handleLogin}
            style={styles.socialButton}
          >
            <Ionicons name="logo-apple" size={24} color="#fff" />
            <Text style={styles.buttonText} variant="body">
              {t('continueWithApple')}
            </Text>
          </Button>

          <Button
            label={t('loginAsPlanner')}
            onPress={() => {
              navigation.navigate('PlannerLogin');
            }}
            style={{ marginTop: spacing.sm }}
            icon={Calendar}
          />
        </View>

        {/* Footer Section */}
        <LoginFooter />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pure black as per image reference
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 16, // Assuming rounded corners for the app icon
  },
  title: {
    fontSize: 32,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontFamily: typography.fonts.semiBold,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: typography.fonts.medium,
  },
  buttonsContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: layout.button.height,
    paddingVertical: 0,
    borderRadius: layout.button.borderRadius,
    borderWidth: 1,
    borderColor: '#222222',
    position: 'relative',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: typography.fonts.bold,
  },
});
