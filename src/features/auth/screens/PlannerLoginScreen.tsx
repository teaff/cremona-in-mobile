import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react-native';
import { LoginFooter } from '@/features/auth/components/LoginFooter';

const { width } = Dimensions.get('window');

export const PlannerLoginScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder for planner login logic
    navigation.reset({
      index: 0,
      routes: [{ name: 'PlannerMain' }],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header with Back Button */}
          <View
            style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
          >
            <Button
              variant="ghost"
              size="icon"
              icon={ArrowLeft}
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
          </View>

          <View style={styles.content}>
            <View>
              {/* Logo Section */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../../assets/logo_white_transparent.png')}
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

              {/* Input Fields */}
              <View style={styles.formContainer}>
                <Input
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Input
                  placeholder={t('passwordPlaceholder')}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                <Button
                  label={t('loginButton')}
                  onPress={handleLogin}
                  style={{ marginTop: spacing.md }}
                />
              </View>
            </View>

            {/* Footer Section */}
            <LoginFooter />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    zIndex: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontFamily: typography.fonts.semiBold,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '80%',
    fontFamily: typography.fonts.medium,
  },
  formContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
});
