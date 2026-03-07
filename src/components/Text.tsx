import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { typography } from '../theme/typography';

interface TextProps extends RNTextProps {
  weight?: keyof typeof typography.fonts;
}

export const Text: React.FC<TextProps> = ({ style, weight, ...props }) => {
  const flattenedStyle = StyleSheet.flatten(style) as TextStyle;

  // Default font family
  let fontFamily = typography.fonts.regular;

  // If weight prop is provided, use it
  if (weight && typography.fonts[weight]) {
    fontFamily = typography.fonts[weight];
  }
  // Determine font family based on fontWeight in style
  else if (flattenedStyle?.fontWeight) {
    const fw = flattenedStyle.fontWeight;
    if (fw === '500' || fw === 'medium') {
      fontFamily = typography.fonts.medium;
    } else if (fw === '600' || fw === 'semibold') {
      fontFamily = typography.fonts.semiBold;
    } else if (fw === '700' || fw === 'bold') {
      fontFamily = typography.fonts.bold;
    } else if (fw === '800' || fw === '900' || fw === 'black') {
      fontFamily = typography.fonts.heavy;
    } else {
      fontFamily = typography.fonts.regular;
    }
  }

  // Remove fontWeight from style to avoid conflicts with custom font family
  const { fontWeight, ...restStyle } = flattenedStyle || {};

  return <RNText {...props} style={[{ fontFamily }, restStyle]} />;
};
