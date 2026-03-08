import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Sun,
  Moon,
  Map,
  Camera,
  Compass,
  Bus,
  ShieldCheck,
  Ticket,
  QrCode,
} from 'lucide-react-native';
import { OnboardingImageGrid } from '../components/OnboardingImageGrid';
import { colors } from '@/theme/colors';

export const OnboardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleComplete = () => {
    // In a real app, save onboarding status here
    navigation.replace('Login');
  };

  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Scopri la città di giorno e di notte',
      description:
        'Che tu sia di qui o in viaggio, trovi sempre qualcosa da fare.',
      image: <OnboardingImageGrid />,
      backgroundColor: '#000000',
    },
    {
      id: '2',
      title: 'Sei un turista?',
      description:
        'Non solo serate: esperienze locali, tour speciali e serate a tema.',
      icon: <Compass size={100} color="#FF6B6B" />,
      backgroundColor: '#000000',
    },
    {
      id: '3',
      title: 'Navette & Rientro sicuro',
      description: 'Prenota navette per andare e tornare da eventi e locali.',
      icon: <Bus size={100} color="#4ECDC4" />,
      backgroundColor: '#000000',
    },
    {
      id: '4',
      title: 'Pagamenti Sicuri & Biglietti Digitali',
      description:
        'Paghi in pochi tap, entri in un secondo con il QR Code sempre a portata di mano.',
      icon: <QrCode size={100} color="#A78BFA" />,
      backgroundColor: '#000000',
    },
  ];

  return (
    <View style={styles.container}>
      <Onboarding
        steps={steps}
        onComplete={handleComplete}
        onSkip={handleComplete}
        showSkip={true}
        showProgress={true}
        swipeEnabled={true}
        primaryButtonText="Inizia"
        skipButtonText="Salta"
        nextButtonText="Avanti"
        backButtonText="Indietro"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
