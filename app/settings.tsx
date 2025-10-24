import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../components/admin/AdminLayout';
import { useColorScheme } from '../components/useColorScheme';
import Colors from '../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../constants/Design';

interface SettingSection {
  id: string;
  title: string;
  items: SettingItem[];
}

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  route?: string;
  action?: () => void;
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [settings, setSettings] = useState({
    notifications: true,
    locationTracking: true,
    darkMode: false,
    autoUpdate: true,
    biometricLogin: false,
  });

  const settingSections: SettingSection[] = [
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile Settings',
          description: 'Manage your personal information',
          icon: '👤',
          type: 'navigation',
          route: '/profile',
        },
        {
          id: 'privacy',
          title: 'Privacy & Security',
          description: 'Control your privacy settings',
          icon: '🔒',
          type: 'navigation',
          route: '/privacy',
        },
        {
          id: 'verification',
          title: 'Account Verification',
          description: 'Complete your profile verification',
          icon: '✅',
          type: 'navigation',
          route: '/verification',
        },
      ],
    },
    {
      id: 'preferences',
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          description: 'Receive notifications about rides and updates',
          icon: '🔔',
          type: 'toggle',
          value: settings.notifications,
        },
        {
          id: 'locationTracking',
          title: 'Location Tracking',
          description: 'Allow app to track your location for better service',
          icon: '📍',
          type: 'toggle',
          value: settings.locationTracking,
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch between light and dark themes',
          icon: '🌙',
          type: 'toggle',
          value: settings.darkMode,
        },
        {
          id: 'language',
          title: 'Language',
          description: 'English',
          icon: '🌐',
          type: 'navigation',
          route: '/language',
        },
      ],
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      items: [
        {
          id: 'paymentMethods',
          title: 'Payment Methods',
          description: 'Manage your payment options',
          icon: '💳',
          type: 'navigation',
          route: '/payment-methods',
        },
        {
          id: 'billing',
          title: 'Billing History',
          description: 'View your transaction history',
          icon: '📊',
          type: 'navigation',
          route: '/billing',
        },
        {
          id: 'promoCodes',
          title: 'Promo Codes',
          description: 'Manage your discount codes',
          icon: '🎫',
          type: 'navigation',
          route: '/promo-codes',
        },
      ],
    },
    {
      id: 'app',
      title: 'App Settings',
      items: [
        {
          id: 'autoUpdate',
          title: 'Auto Update',
          description: 'Automatically update the app',
          icon: '🔄',
          type: 'toggle',
          value: settings.autoUpdate,
        },
        {
          id: 'biometricLogin',
          title: 'Biometric Login',
          description: 'Use fingerprint or face recognition',
          icon: '👆',
          type: 'toggle',
          value: settings.biometricLogin,
        },
        {
          id: 'cache',
          title: 'Clear Cache',
          description: 'Free up storage space',
          icon: '🗑️',
          type: 'action',
          action: () => {/* Handle clear cache */},
        },
        {
          id: 'storage',
          title: 'Storage Usage',
          description: 'View app storage information',
          icon: '💾',
          type: 'navigation',
          route: '/storage',
        },
      ],
    },
    {
      id: 'support',
      title: 'Support & Legal',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          description: 'Get help and support',
          icon: '❓',
          type: 'navigation',
          route: '/support',
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          description: 'Share your thoughts with us',
          icon: '💬',
          type: 'action',
          action: () => {/* Handle feedback */},
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          description: 'Read our terms and conditions',
          icon: '📄',
          type: 'navigation',
          route: '/terms',
        },
        {
          id: 'privacyPolicy',
          title: 'Privacy Policy',
          description: 'Learn how we protect your data',
          icon: '🔐',
          type: 'navigation',
          route: '/privacy-policy',
        },
      ],
    },
  ];

  const handleToggle = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const handleAction = (action: (() => void) | undefined) => {
    if (action) {
      action();
    }
  };

  return (
    <AdminLayout title="Settings" currentPage="settings">
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#1DA1F2', '#1976D2', '#1565C0']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileInfo}>
              <Text style={styles.profileIcon}>👤</Text>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
                <Text style={styles.profileStatus}>Verified User</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => router.push('/profile' as any)}
            >
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    index < section.items.length - 1 && styles.settingItemWithBorder,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => {
                    if (item.type === 'toggle') {
                      handleToggle(item.id);
                    } else if (item.type === 'navigation' && item.route) {
                      handleNavigation(item.route);
                    } else if (item.type === 'action' && item.action) {
                      handleAction(item.action);
                    }
                  }}
                  disabled={item.type === 'toggle'}
                >
                  <View style={styles.settingItemContent}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <View style={styles.settingInfo}>
                      <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
                      {item.description && (
                        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                          {item.description}
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  {item.type === 'toggle' ? (
                    <View style={[
                      styles.toggle,
                      { backgroundColor: item.value ? colors.primary : colors.lightGray },
                    ]}>
                      <View style={[
                        styles.toggleThumb,
                        { backgroundColor: '#FFFFFF', transform: [{ translateX: item.value ? 20 : 0 }] },
                      ]} />
                    </View>
                  ) : (
                    <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#EF4444' }]}
            onPress={() => {/* Handle logout */}}
          >
            <LinearGradient
              colors={['#EF4444', '#DC2626', '#B91C1C']}
              style={styles.logoutButtonGradient}
            >
              <Text style={styles.logoutButtonText}>🚪 Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            HushRyd v1.0.0
          </Text>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            © 2025 HushRyd. All rights reserved.
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    marginBottom: Spacing.xl,
  },
  profileGradient: {
    padding: Spacing.xxxl,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.large,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileIcon: {
    fontSize: 64,
    marginRight: Spacing.lg,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: FontSizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: Spacing.xs,
  },
  profileStatus: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  editProfileButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  sectionContent: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadows.small,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  settingItemWithBorder: {
    borderBottomWidth: 1,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
    width: 24,
    textAlign: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    ...Shadows.small,
  },
  chevron: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
  },
  logoutSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  logoutButton: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  logoutButtonGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  versionSection: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  versionText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  bottomPadding: {
    height: Spacing.xxxl,
  },
});
