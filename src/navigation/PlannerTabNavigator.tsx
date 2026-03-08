import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScanBarcode, PieChart, Settings } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { PlannerHomeScreen } from '../screens/planner/PlannerHomeScreen';
import { PlannerStatsScreen } from '../screens/planner/PlannerStatsScreen';
import { PlannerSettingsScreen } from '../screens/planner/PlannerSettingsScreen';
import { BottomNavBar } from '@/components/BottomNavBar';

const Tab = createBottomTabNavigator();

export const PlannerTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.secondary,
      }}
    >
      <Tab.Screen
        name="PlannerHome"
        component={PlannerHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ScanBarcode size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PlannerStats"
        component={PlannerStatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PieChart size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Disable navigation to stats for now
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="PlannerSettings"
        component={PlannerSettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


