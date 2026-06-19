
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Shadows, Spacing } from "../../constants/theme";
import AnimatedEntrance from "./AnimatedEntrance";

interface NavLink {
  href: string;
  text: string;
  icon?: keyof typeof Ionicons.prototype.props.name;
}

interface SideBarProps {
  navigationLinks: NavLink[];
}

export default function SideBar({ navigationLinks }: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleSignOut = () => {
    router.replace("/(auth)/login");
  };

  const getIconForLink = (text: string): keyof typeof Ionicons.prototype.props.name => {
    switch (text.toLowerCase()) {
      case 'dashboard': return 'grid-outline' as any;
      case 'find': return 'search' as any;
      case 'wallet': return 'sparkles-outline' as any;
      case 'profile': return 'person-outline' as any;
      case 'users': return 'people-outline' as any;
      case 'analytics': return 'stats-chart-outline' as any;
      case 'sessions': return 'calendar-clear-outline' as any;
      case 'reports': return 'bar-chart-outline' as any;
      default: return 'ellipse-outline' as any;
    }
  };

  return (
    <View style={StyleSheet.flatten([styles.container, isCollapsed && styles.collapsedContainer, Shadows.glass])}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={StyleSheet.flatten([styles.header, isCollapsed && styles.collapsedHeader])}>
          {!isCollapsed ? (
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Ionicons name="leaf" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.brandName} numberOfLines={1}>ClarityMind</Text>
            </View>
          ) : (
            <View style={styles.logoBadge}>
              <Ionicons name="leaf" size={20} color={Colors.primary} />
            </View>
          )}
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsCollapsed(!isCollapsed)}
          >
            <Ionicons
              name={isCollapsed ? "chevron-forward" : "chevron-back"}
              size={18}
              color={Colors.textLight}
            />
          </TouchableOpacity>
        </View>

        {!isCollapsed && <Text style={styles.sectionLabel}>Main Navigation</Text>}

        <ScrollView style={styles.navSection} showsVerticalScrollIndicator={false}>
          {navigationLinks.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/(patient)/' && pathname.startsWith(link.href));
            return (
              <AnimatedEntrance key={link.href} delay={200 + (index * 80)} direction="left">
                <TouchableOpacity
                  onPress={() => router.push(link.href as any)}
                  style={StyleSheet.flatten([
                    styles.navItem,
                    isActive && styles.activeNavItem,
                    isCollapsed && styles.collapsedNavItem
                  ])}
                >
                  <View style={StyleSheet.flatten([styles.iconWrapper, isActive && styles.activeIconWrapper])}>
                    <Ionicons
                      name={(link.icon || getIconForLink(link.text)) as any}
                      size={22}
                      color={isActive ? Colors.surface : Colors.textLight}
                    />
                  </View>
                  {!isCollapsed && (
                    <Text style={StyleSheet.flatten([
                      styles.navText,
                      isActive && styles.activeNavText
                    ])} numberOfLines={1}>
                      {link.text}
                    </Text>
                  )}
                  {isActive && !isCollapsed && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              </AnimatedEntrance>
            );
          })}
        </ScrollView>

        <View style={StyleSheet.flatten([styles.footer, isCollapsed && styles.collapsedFooter])}>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.signOutButton, isCollapsed && styles.collapsedSignOutButton])}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color={Colors.textLight} />
            {!isCollapsed && <Text style={styles.signOutText} numberOfLines={1}>Log Out</Text>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    backgroundColor: Colors.surface,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    paddingVertical: Spacing.lg,
  },
  collapsedContainer: {
    width: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    justifyContent: 'space-between',
  },
  collapsedHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 0,
    gap: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  toggleButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: Spacing.lg,
    marginBottom: Spacing.md,
    opacity: 0.6,
  },
  navSection: {
    paddingHorizontal: Spacing.md,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 6,
  },
  collapsedNavItem: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    height: 50,
  },
  activeNavItem: {
    backgroundColor: Colors.background,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconWrapper: {
    backgroundColor: Colors.primary,
  },
  navText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textLight,
    marginLeft: 12,
    flex: 1,
  },
  activeNavText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginLeft: 4,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 'auto',
  },
  collapsedFooter: {
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  collapsedSignOutButton: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    width: 50,
  },
  signOutText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
});
