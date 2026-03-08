import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { colors } from '@/theme/colors';

export const PlannerStatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stats Screen (Coming Soon)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.secondary,
  },
});
