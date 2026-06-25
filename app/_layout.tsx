import { Stack } from "expo-router";
import { Platform, LogBox, View } from "react-native";
import * as Notifications from 'expo-notifications';
import { Colors } from '../constants/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Ignore the LogBox warning
LogBox.ignoreLogs([
  'props.pointerEvents is deprecated',
  'Cannot record touch end without a touch start',
]);

// Suppress harmless warnings in the browser console
if (Platform.OS === 'web') {
  const originalWarn = console.warn;
  const originalError = console.error;
  
  const filterArgs = (args: any) => {
    if (typeof args[0] === 'string' && (
      args[0].includes('props.pointerEvents is deprecated') ||
      args[0].includes('Cannot record touch end without a touch start') ||
      args[0].includes('Listening to push token changes is not yet fully supported on web') ||
      args[0].includes('Blocked aria-hidden on an element')
    )) {
      return true;
    }
    return false;
  };

  console.warn = (...args) => {
    if (filterArgs(args)) return;
    originalWarn(...args);
  };
  
  console.error = (...args) => {
    if (filterArgs(args)) return;
    originalError(...args);
  };
}

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(patient)" options={{ headerShown: false }} />
        <Stack.Screen name="(doctor)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
