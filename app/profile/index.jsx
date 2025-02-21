import { Stack } from 'expo-router';
import Profile from '../components/Profile';

export default function ProfileLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Profile />
    </>
  );
}
