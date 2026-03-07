import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { typography } from '@/theme/typography';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  image?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
}

export interface OnboardingProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
  showProgress?: boolean;
  swipeEnabled?: boolean;
  primaryButtonText?: string;
  skipButtonText?: string;
  nextButtonText?: string;
  backButtonText?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function Onboarding({
  steps,
  onComplete,
  onSkip,
  showSkip = true,
  showProgress = true,
  swipeEnabled = true,
  primaryButtonText = 'Inizia',
  skipButtonText = 'Salta',
  nextButtonText = 'Avanti',
  backButtonText = 'Indietro',
  style,
  children,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const translateX = useSharedValue(0);

  const primaryColor = useColor('primary');
  // Enforce white/light colors for dark mode look
  const textColor = '#FFFFFF';
  const mutedColor = '#A0A0A0';

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({
        x: nextStep * screenWidth,
        animated: true,
      });
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollViewRef.current?.scrollTo({
        x: prevStep * screenWidth,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  const handleScroll = (event: any) => {
    const newStep = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (newStep !== currentStep) {
      setCurrentStep(newStep);
    }
  };

  const renderProgressDots = () => {
    if (!showProgress) return null;

    return (
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              {
                backgroundColor: index === currentStep ? '#fff' : '#333',
                opacity: 1,
                width: index === currentStep ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderStep = (step: OnboardingStep, index: number) => {
    return (
      <View
        key={step.id}
        style={[styles.stepContainer, { backgroundColor: 'transparent' }]}
      >
        <View style={styles.contentContainer}>
          {step.image && (
            <View style={styles.imageContainer}>{step.image}</View>
          )}

          {step.icon && !step.image && (
            <View style={styles.iconContainer}>{step.icon}</View>
          )}

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: textColor }]}>
              {step.title}
            </Text>
            <Text style={[styles.description, { color: mutedColor }]}>
              {step.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={swipeEnabled}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {steps.map((step, index) => renderStep(step, index))}
      </ScrollView>

      {/* Progress Dots */}
      {renderProgressDots()}

      {/* Skip Button */}
      {showSkip && !isLastStep && (
        <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
          <Text style={{ color: textColor, fontWeight: '600' }}>
            {skipButtonText}
          </Text>
        </TouchableOpacity>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {!isFirstStep && (
          <Button
            variant="outline"
            onPress={handleBack}
            style={[styles.button, styles.backButton]}
          >
            <Text style={{ color: '#fff' }}>{backButtonText}</Text>
          </Button>
        )}
        <Button
          onPress={handleNext}
          style={[
            styles.button,
            isFirstStep ? styles.fullWidthButton : styles.nextButton,
          ]}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {isLastStep ? primaryButtonText : nextButtonText}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  stepContainer: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  imageContainer: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 32,
    fontFamily: typography.fonts.heavy,
    fontWeight: '900',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    opacity: 0.7,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skipContainer: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 50,
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    height: 56,
  },
  fullWidthButton: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#CF0607', // Red button
  },
});
