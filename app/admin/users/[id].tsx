import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../../../components/admin/AdminLayout';
import { BorderRadius, FontSizes, Spacing } from '../../../constants/Design';

export default function UserDetailsPage() {
  const { id: userId } = useLocalSearchParams();
  
  // Mock user data - in real app, fetch from API
  const userData = {
    id: userId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91-9876543210',
    role: 'User',
    status: 'Active',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20 10:30 AM',
    avatar: '👤',
    address: '123 Main Street, Hyderabad, Telangana',
    emergencyContact: '+91-9876543211',
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false,
    },
    rideHistory: {
      totalRides: 25,
      completedRides: 23,
      cancelledRides: 2,
      totalSpent: 'Rs 12,500',
      averageRating: 4.5,
    },
    documents: {
      idProof: 'Verified',
      addressProof: 'Verified',
      drivingLicense: 'Not Required',
    },
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#10B981' : '#6B7280';
  };

  const getRoleColor = (role: string) => {
    return role === 'Driver' ? '#3B82F6' : '#8B5CF6';
  };

  return (
    <AdminLayout title={`User Details - ${userId}`} currentPage="users">
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back to Users</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container}>
        {/* User Overview */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>👤 User Overview</Text>
          <View style={styles.userHeader}>
            <Text style={styles.userAvatar}>{userData.avatar}</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <View style={styles.userMeta}>
                <View style={[styles.roleBadge, { backgroundColor: getRoleColor(userData.role) }]}>
                  <Text style={styles.roleText}>{userData.role}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(userData.status) }]}>
                  <Text style={styles.statusText}>{userData.status}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>📞 Contact Information</Text>
          <Text style={styles.infoText}>📱 Phone: {userData.phone}</Text>
          <Text style={styles.infoText}>📧 Email: {userData.email}</Text>
          <Text style={styles.infoText}>🏠 Address: {userData.address}</Text>
          <Text style={styles.infoText}>🚨 Emergency Contact: {userData.emergencyContact}</Text>
        </View>

        {/* Account Information */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>🔐 Account Information</Text>
          <Text style={styles.infoText}>📅 Join Date: {userData.joinDate}</Text>
          <Text style={styles.infoText}>🕐 Last Login: {userData.lastLogin}</Text>
          <Text style={styles.infoText}>📊 Status: {userData.status}</Text>
          <Text style={styles.infoText}>👤 Role: {userData.role}</Text>
        </View>

        {/* Ride History */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>🚗 Ride History</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.rideHistory.totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.rideHistory.completedRides}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.rideHistory.cancelledRides}</Text>
              <Text style={styles.statLabel}>Cancelled</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.rideHistory.totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
          </View>
          <Text style={styles.infoText}>⭐ Average Rating: {userData.rideHistory.averageRating}/5</Text>
        </View>

        {/* Preferences */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>⚙️ Preferences</Text>
          <Text style={styles.infoText}>
            🔔 Notifications: {userData.preferences.notifications ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={styles.infoText}>
            📧 Email Updates: {userData.preferences.emailUpdates ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={styles.infoText}>
            📱 SMS Alerts: {userData.preferences.smsAlerts ? 'Enabled' : 'Disabled'}
          </Text>
        </View>

        {/* Document Verification */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>📋 Document Verification</Text>
          <Text style={styles.infoText}>
            🆔 ID Proof: {userData.documents.idProof}
          </Text>
          <Text style={styles.infoText}>
            🏠 Address Proof: {userData.documents.addressProof}
          </Text>
          <Text style={styles.infoText}>
            🚗 Driving License: {userData.documents.drivingLicense}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>✏️ Edit User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>💬 Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suspendButton}>
            <Text style={styles.suspendButtonText}>⚠️ Suspend User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  backButtonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: '#374151',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    fontSize: 48,
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.md,
    color: '#6B7280',
    marginBottom: Spacing.sm,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  roleText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoText: {
    fontSize: FontSizes.md,
    color: '#374151',
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  editButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageButton: {
    backgroundColor: '#10B981',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  messageButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  suspendButton: {
    backgroundColor: '#EF4444',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  suspendButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
