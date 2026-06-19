
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Colors } from "../../constants/theme";
import SideBar from "../_components/SideBar";

const patientLinks = [
  { href: "/(patient)/", text: "Dashboard" },
  { href: "/(patient)/findTherapists", text: "Find" },
  { href: "/(patient)/coinRecharge", text: "Wallet" },
  { href: "/(patient)/patientProfile", text: "Profile" },
];

export default function PatientLayout() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <SideBar navigationLinks={patientLinks} />
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
            name="findTherapists"
            options={{
              title: 'Find',
              tabBarIcon: ({ color }: { color: string }) => <Ionicons size={24} name="search-outline" color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Tabs.Screen
            name="coinRecharge"
            options={{
              title: 'Wallet',
              tabBarIcon: ({ color }: { color: string }) => <Ionicons size={24} name="wallet-outline" color={color} />,
              headerShown: true,
              headerStyle: { backgroundColor: Colors.surface },
              headerTintColor: Colors.text,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Tabs.Screen
            name="patientProfile"
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
            name="therapistDiscovery"
            options={{ href: null }} // Hidden tab
          />
        </Tabs>
      </View>
    </View>
  );
}
