import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AdminHeader from '../../components/admin/AdminHeader';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';
import { AdminRole } from '../../types/models';

const mockAdmin = {
  id: '1',
  name: 'Super Admin',
  email: 'superadmin@hushryd.com',
  role: 'superadmin' as AdminRole,
};

export default function AdminSettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    autoApproval: false,
    maintenanceMode: false,
    twoFactorAuth: true,
  });

  const handleLogout = () => {
    router.replace('/(tabs)/');
  };

  const handleSave = () => {
    Alert.alert('Success', 'Settings saved successfully!');
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AdminHeader
        adminName={mockAdmin.name}
        adminRole={mockAdmin.role}
        onLogout={handleLogout}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Manage system and account preferences</Text>
          </View>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.lightGray }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.text }]}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.lightGray, color: colors.text }]}
                value={mockAdmin.name}
                placeholder="Enter name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.lightGray, color: colors.text }]}
                value={mockAdmin.email}
                placeholder="Enter email"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Role</Text>
              <View style={[styles.roleBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.roleText}>{mockAdmin.role.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Push Notifications</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Receive push notifications for important events
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Email Alerts</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Receive email notifications for critical alerts
              </Text>
            </View>
            <Switch
              value={settings.emailAlerts}
              onValueChange={() => toggleSetting('emailAlerts')}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
            />
          </View>
        </View>

        {/* System Settings */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>System Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Auto Approval</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Automatically approve verified driver applications
              </Text>
            </View>
            <Switch
              value={settings.autoApproval}
              onValueChange={() => toggleSetting('autoApproval')}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Maintenance Mode</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Put the platform in maintenance mode
              </Text>
            </View>
            <Switch
              value={settings.maintenanceMode}
              onValueChange={() => toggleSetting('maintenanceMode')}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
            />
          </View>
        </View>

        {/* Security Settings */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Two-Factor Authentication</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Add an extra layer of security to your account
              </Text>
            </View>
            <Switch
              value={settings.twoFactorAuth}
              onValueChange={() => toggleSetting('twoFactorAuth')}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.lightGray }]}
            onPress={() => Alert.alert('Change Password', 'Password change functionality would go here')}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  backButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  settingDescription: {
    fontSize: FontSizes.sm,
  },
  input: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    fontSize: FontSizes.md,
  },
  roleBadge: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  button: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.small,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
});

