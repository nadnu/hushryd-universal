import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../../components/admin/AdminLayout';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const getStatsData = () => [
    {
      title: 'Sessions',
      value: '24k',
      change: '8.5%',
      changeType: 'positive',
      icon: '📊',
      gradient: ['#3B82F6', '#1D4ED8'] as const,
    },
    {
      title: 'Avg.Sessions',
      value: '00:18',
      change: '1.5%',
      changeType: 'positive',
      icon: '⏱️',
      gradient: ['#10B981', '#059669'] as const,
    },
    {
      title: 'Bounce Rate',
      value: '24.5%',
      change: '2.4%',
      changeType: 'negative',
      icon: '📈',
      gradient: ['#F59E0B', '#D97706'] as const,
    },
    {
      title: 'Conversion',
      value: '3.2%',
      change: '0.3%',
      changeType: 'positive',
      icon: '💰',
      gradient: ['#EF4444', '#DC2626'] as const,
    },
  ];

  const getRecentActivity = () => [
    {
      id: '1',
      icon: '👤',
      title: 'New User Registration',
      description: 'John Doe registered for the platform',
      time: '2 minutes ago',
    },
    {
      id: '2',
      icon: '🚗',
      title: 'Ride Completed',
      description: 'Ride from Hyderabad to Chennai completed',
      time: '15 minutes ago',
    },
    {
      id: '3',
      icon: '💰',
      title: 'Payment Received',
      description: 'Payment of Rs 2,500 received for ride booking',
      time: '1 hour ago',
    },
    {
      id: '4',
      icon: '🚨',
      title: 'SOS Alert',
      description: 'Emergency alert from user during ride',
      time: '2 hours ago',
    },
  ];

  const getQuickActions = () => [
    { id: 'add-user', title: 'Add User', icon: '👤', color: '#3B82F6' },
    { id: 'create-ride', title: 'Create Ride', icon: '🚗', color: '#10B981' },
    { id: 'view-reports', title: 'View Reports', icon: '📊', color: '#F59E0B' },
    { id: 'manage-sos', title: 'Manage SOS', icon: '🚨', color: '#EF4444' },
  ];

  return (
    <AdminLayout title="Admin Dashboard" currentPage="dashboard">
      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          {getStatsData().map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <LinearGradient
                colors={stat.gradient}
                style={styles.statGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.statContent}>
                  <View style={styles.statHeader}>
                    <Text style={styles.statIcon}>{stat.icon}</Text>
                    <View style={styles.statChange}>
                      <Text style={[
                        styles.statChangeText,
                        { color: stat.changeType === 'positive' ? '#10B981' : '#EF4444' }
                      ]}>
                        {stat.changeType === 'positive' ? '↗' : '↘'} {stat.change}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {getRecentActivity().map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>{activity.icon}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {getQuickActions().map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                <Text style={styles.quickActionIconText}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  statsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  statGradient: {
    padding: Spacing.sm,
    minHeight: 80,
  },
  statContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statIcon: {
    fontSize: 20,
  },
  statChange: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statChangeText: {
    fontSize: FontSizes.sm,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  activitySection: {
    marginBottom: Spacing.xl,
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  activityIconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  activityDescription: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    marginBottom: Spacing.xs,
  },
  activityTime: {
    fontSize: FontSizes.xs,
    color: '#9CA3AF',
  },
  quickActionsSection: {
    marginBottom: Spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.small,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionIconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  quickActionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
});