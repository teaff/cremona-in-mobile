import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabNavigator } from './src/navigation/TabNavigator';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { EventDetailsScreen } from './src/screens/EventDetailsScreen';
import { PlannerLoginScreen } from './src/screens/PlannerLoginScreen';
import { SplashScreen as CustomSplashScreen } from './src/screens/SplashScreen';
import { colors } from './src/theme/colors';
import { NAV_THEME } from './src/theme/theme-provider';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LanguageProvider } from './src/context/LanguageContext';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const splashOpacity = useSharedValue(1);
  const splashScale = useSharedValue(1);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or other resources
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          // Hide native splash screen immediately to show our custom one
          await SplashScreen.hideAsync();
          setAppReady(true);

          // Artificially delay for 2 seconds to show the custom splash screen
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Start exit animation
          splashOpacity.value = withTiming(0, {
            duration: 800,
            easing: Easing.out(Easing.exp),
          });

          splashScale.value = withTiming(
            1.1,
            {
              duration: 800,
              easing: Easing.out(Easing.exp),
            },
            (finished) => {
              if (finished) {
                runOnJS(setSplashAnimationFinished)(true);
              }
            },
          );
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  const animatedSplashStyle = useAnimatedStyle(() => {
    return {
      opacity: splashOpacity.value,
      transform: [{ scale: splashScale.value }],
    };
  });

  if (!appReady && !fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <LanguageProvider>
          <NavigationContainer theme={NAV_THEME.dark}>
            <StatusBar style="light" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: colors.background },
              }}
            >
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={TabNavigator} />
              <Stack.Screen
                name="EventDetails"
                component={EventDetailsScreen}
                options={{ 
                  ...TransitionPresets.ModalSlideFromBottomIOS,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PlannerLogin"
                component={PlannerLoginScreen}
                options={{ presentation: 'modal' }}
              />
            </Stack.Navigator>
          </NavigationContainer>

          {/* Custom Splash Screen Overlay */}
          {!splashAnimationFinished && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                animatedSplashStyle,
                { zIndex: 1000, backgroundColor: '#000000' },
              ]}
            >
              <CustomSplashScreen />
            </Animated.View>
          )}
        </LanguageProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
