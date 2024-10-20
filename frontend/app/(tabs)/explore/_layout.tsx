import { Stack } from 'expo-router';

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="confirm" options={{ headerShown: false }} />
      <Stack.Screen name="symptoms-confirm" options={{ headerShown: false }} />
      <Stack.Screen name="patient-stt-interface" options={{ headerShown: false }} />
      <Stack.Screen name="health-level" options={{ headerShown: false }} />
      <Stack.Screen name="personalized-qs" options={{ headerShown: false }} />
      <Stack.Screen name="additional-info" options={{ headerShown: false }} />
      <Stack.Screen name="stt-additional-info" options={{ headerShown: false }} />
      <Stack.Screen name="checkin-success" options={{ headerShown: false }} />
      <Stack.Screen name="checkin-summary" options={{ headerShown: false }} />
    </Stack>
  );
}