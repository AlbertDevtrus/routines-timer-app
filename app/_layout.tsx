import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit"
          options={{
            title: 'Edit your routine',
            headerStyle: {
              backgroundColor: '#313B6B',
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Red Hat Display',
              fontSize: 24,
              color: 'white',
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
