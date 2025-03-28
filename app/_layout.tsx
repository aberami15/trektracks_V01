import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  // useEffect(() => {
  //   });

  //   // Clean up subscription
  //   return unsubscribe;
  // }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="auth/sign-in/index" />
      <Stack.Screen name="auth/sign-up/index" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="trip-itinerary/index" />
      <Stack.Screen name="save-favourite/index" />
      <Stack.Screen name="recent-trips/index" />
      <Stack.Screen name="destinations/mountain/index" />
      <Stack.Screen name="destinations/beach/index" />
      <Stack.Screen name="destinations/city/index" />
      <Stack.Screen name="destinations/forest/index" />
      <Stack.Screen name="destinations/lake/index" />
      <Stack.Screen name="destinations/ancient-places/index" />
      <Stack.Screen name="destinations/waterfall/index" />
      <Stack.Screen name="destinations/island/index" />
      <Stack.Screen name="budget-planner/index" />
      <Stack.Screen name="budget-overview/index" />
      <Stack.Screen name="sigiriya/index" />
      <Stack.Screen name="tooth-temple/index" />
      <Stack.Screen name="galle-fort/index" />
      <Stack.Screen name="mirissa-beach/index" />
      <Stack.Screen name="create-trip/index" />
      <Stack.Screen name="add-transactions/index" />
      <Stack.Screen name="footer/index" />
      <Stack.Screen name="plan-generation/index" />
      <Stack.Screen name="show-plan/index" />
    </Stack>
  );
}
