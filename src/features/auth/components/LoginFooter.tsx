import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { useLanguage } from '@/context/LanguageContext';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const LoginFooter = () => {
  const { t } = useLanguage();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText} variant="caption">
        {t('supportText')}
        <Text
          variant="link"
          style={styles.linkText}
          onPress={() => alert(t('contactSupport'))}
        >
          {t('contactNow')}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  linkText: {
    color: '#FFFFFF',
    fontFamily: typography.fonts.bold,
    fontSize: 14,
  },
});
