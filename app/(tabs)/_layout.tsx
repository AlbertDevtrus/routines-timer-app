import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#6B5E31',
        },
        headerShadowVisible: false,
        headerTintColor: '#6B5E31',
        tabBarStyle: {
          backgroundColor: "#442800",
          borderColor: '#442800',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Timer',
          tabBarIcon: ({ color }) => (
            <Ionicons name="timer" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Routines',
          tabBarIcon: ({ color }) => (
            <Ionicons name="walk" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
