import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../../components/admin/AdminLayout';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';

const { width } = Dimensions.get('window');

export default function AdminUsersPage() {
  const getUsersData = () => [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-01-15',
      avatar: '👤',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Driver',
      status: 'Active',
      joinDate: '2024-01-10',
      avatar: '🚗',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      status: 'Inactive',
      joinDate: '2024-01-05',
      avatar: '👤',
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Driver',
      status: 'Active',
      joinDate: '2024-01-20',
      avatar: '🚗',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#10B981' : '#6B7280';
  };

  const getRoleColor = (role: string) => {
    return role === 'Driver' ? '#3B82F6' : '#8B5CF6';
  };

  const handleViewUser = (userId: string) => {
    console.log('Viewing user:', userId);
    // Navigate to user details page
    router.push(`/admin/users/${userId}` as any);
  };

  const handleEditUser = (userId: string) => {
    console.log('Editing user:', userId);
    // Navigate to edit user page
    router.push(`/admin/users/edit/${userId}` as any);
  };

  const handleAddUser = () => {
    console.log('Adding new user');
    // Navigate to add user page
    router.push('/admin/users/add' as any);
  };

  return (
    <AdminLayout title="User Management" currentPage="users">
      {/* User Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>User Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1234</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>456</Text>
            <Text style={styles.statLabel}>Active Drivers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>New This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>98.5%</Text>
            <Text style={styles.statLabel}>Active Rate</Text>
          </View>
        </View>
      </View>

      {/* User List */}
      <View style={styles.usersSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Users</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
            <Text style={styles.addButtonText}>+ Add User</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.usersList}>
          {getUsersData().map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>{user.avatar}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.userMeta}>
                  <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                    <Text style={styles.roleText}>{user.role}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}>
                    <Text style={styles.statusText}>{user.status}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.userActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEditUser(user.id)}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleViewUser(user.id)}>
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.small,
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    textAlign: 'center',
  },
  usersSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  addButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  usersList: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  userAvatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.sm,
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
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#F3F4F6',
    marginLeft: Spacing.sm,
  },
  actionText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: '#374151',
  },
});