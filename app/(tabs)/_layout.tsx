import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTabStore } from '@/stores/tabStore';

export default function TabLayout() {
  const { styles } = useTabStore();
  
  return (
    <Tabs
      screenOptions={({ route }) => {
        const currentStyle = styles[route.name as keyof typeof styles] || styles.index;
        
        return {
          headerStyle: {
            backgroundColor: currentStyle.headerColor,
          },
          headerShadowVisible: false,
          headerTintColor: currentStyle.headerColor,
          tabBarActiveTintColor: '#fff' ,
          tabBarStyle: {
            backgroundColor: currentStyle.tabColor,
            borderColor: currentStyle.tabColor,
          },
          tabBarIcon: ({ color }) => {
            let iconName: "walk" | "timer" = "timer";
            const iconSize = 24;

            if (route.name === 'index') {
              iconName = 'timer';
            } else if (route.name === 'routines') {
              iconName = 'walk';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Timer' }} />
      <Tabs.Screen name="routines" options={{ title: 'Routines' }} />
    </Tabs>
  );
}