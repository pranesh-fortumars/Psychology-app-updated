
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { useState } from "react";

export default function Settings() {
  const [paymentGateway, setPaymentGateway] = useState("stripe");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [contentModeration, setContentModeration] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Gateway</Text>
        <View style={styles.card}>
          <Text>Current Gateway: {paymentGateway}</Text>
          {/* In a real app, this would be a dropdown or a more complex component */}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text>Push Notifications</Text>
            <Switch value={pushNotifications} onValueChange={setPushNotifications} />
          </View>
          <View style={styles.settingRow}>
            <Text>Email Notifications</Text>
            <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content Moderation</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text>Enable automatic content moderation</Text>
            <Switch value={contentModeration} onValueChange={setContentModeration} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
