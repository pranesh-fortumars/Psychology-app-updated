
import { Stack } from "expo-router";
import { View } from "react-native";
import { Colors } from "../../constants/theme";
import SideBar from "../_components/SideBar";

const adminLinks = [
  { href: "/(admin)/analytics", text: "Analytics" },
  { href: "/(admin)/users", text: "Users" },
];

export default function AdminLayout() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <SideBar navigationLinks={adminLinks} />
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.surface,
            },
            headerTintColor: Colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="users" options={{ title: 'User Management' }} />
          <Stack.Screen name="analytics" options={{ title: 'App Analytics' }} />
        </Stack>
      </View>
    </View>
  );
}
