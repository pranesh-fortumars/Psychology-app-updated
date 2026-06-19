
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Colors } from "../../constants/theme";
import SideBar from "../_components/SideBar";

const doctorLinks = [
  { href: "/(doctor)/", text: "Dashboard" },
  { href: "/(doctor)/sessions", text: "Sessions" },
  { href: "/(doctor)/profile", text: "Profile" },
  { href: "/(doctor)/reports", text: "Reports" },
];

export default function DoctorLayout() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <SideBar navigationLinks={doctorLinks} />
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textLight,
            tabBarStyle: {
              backgroundColor: Colors.surface,
              borderTopWidth: 1,
              borderTopColor: Colors.border,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color }: { color: string }) => <Ionicons size={24} name="grid-outline" color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }: { color: string }) => <Ionicons size={24} name="person-outline" color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Tabs.Screen
            name="sessions"
            options={{
              title: 'Sessions',
              tabBarIcon: ({ color }: { color: string }) => <Ionicons size={24} name="calendar-outline" color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Tabs.Screen
            name="reports"
            options={{
              title: 'Reports',
              tabBarIcon: ({ color }: { color: string }) => <Ionicons size={24} name="document-text-outline" color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
