// _layout.tsx (in the explore folder)
import { Stack } from 'expo-router';

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="confirm" options={{ headerShown: false }} />
      <Stack.Screen name="symptoms-confirm" options={{ headerShown: false }} />
      <Stack.Screen name="patient-stt-interface" options={{ headerShown: false }} />
    </Stack>
  );
}