import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable, { TableColumn } from '../../components/admin/DataTable';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';

// Mock data
const mockAdmins = [
  { id: '1', name: 'Super Admin', email: 'superadmin@hushryd.com', role: 'superadmin', status: 'active', lastLogin: '2024-10-11 14:30', createdAt: '2023-01-01' },
  { id: '2', name: 'Finance Manager', email: 'finance@hushryd.com', role: 'finance', status: 'active', lastLogin: '2024-10-11 10:15', createdAt: '2023-03-15' },
  { id: '3', name: 'Support Agent 1', email: 'support1@hushryd.com', role: 'support', status: 'active', lastLogin: '2024-10-11 13:45', createdAt: '2023-05-20' },
  { id: '4', name: 'Support Agent 2', email: 'support2@hushryd.com', role: 'support', status: 'inactive', lastLogin: '2024-10-08 16:20', createdAt: '2023-06-10' },
];

export default function AdminsManagement() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'support' });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => router.replace('/(tabs)/') },
    ]);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin': return '👑';
      case 'finance': return '💰';
      case 'support': return '🎧';
      default: return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return '#8b5cf6';
      case 'finance': return '#10b981';
      case 'support': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'suspended': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', `Admin ${newAdmin.name} has been created!`);
    setShowAddModal(false);
    setNewAdmin({ name: '', email: '', role: 'support' });
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Admin',
      width: 200,
      render: (value, row) => (
        <View style={styles.adminCell}>
          <View style={[styles.avatar, { backgroundColor: getRoleColor(row.role) + '20' }]}>
            <Text style={styles.avatarIcon}>{getRoleIcon(row.role)}</Text>
          </View>
          <View>
            <Text style={[styles.adminName, { color: colors.text }]}>{value}</Text>
            <Text style={[styles.adminEmail, { color: colors.textSecondary }]}>{row.email}</Text>
          </View>
        </View>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      width: 150,
      render: (value) => (
        <View style={[styles.roleBadge, { backgroundColor: getRoleColor(value) + '20' }]}>
          <Text style={styles.roleBadgeIcon}>{getRoleIcon(value)}</Text>
          <Text style={[styles.roleBadgeText, { color: getRoleColor(value) }]}>
            {value === 'superadmin' ? 'Super Admin' : value.charAt(0).toUpperCase() + value.slice(1)}
          </Text>
        </View>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: 100,
      render: (value) => (
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(value) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(value) }]}>{value}</Text>
        </View>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      width: 150,
    },
    {
      key: 'createdAt',
      label: 'Created',
      width: 120,
    },
    {
      key: 'actions',
      label: 'Actions',
      width: 180,
      render: (_, row) => (
        <View style={styles.actionsCell}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}>
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          {row.role !== 'superadmin' && (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#ef4444' + '20' }]}>
              <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    },
  ];

  return (
    <AdminLayout title="Admin Management" currentPage="admins">
      <View style={styles.content}>
        <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
          <View style={styles.mainContent}>
            <View style={styles.pageHeader}>
              <View>
                <Text style={[styles.pageTitle, { color: colors.text }]}>Admin Management</Text>
                <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
                  Manage admin users and their permissions
                </Text>
              </View>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: colors.primary }]}
                onPress={() => setShowAddModal(true)}
              >
                <Text style={styles.addButtonText}>+ Add Admin</Text>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <StatCard icon="🛡️" label="Total Admins" value="4" color="#8b5cf6" />
              <StatCard icon="👑" label="Super Admins" value="1" color="#8b5cf6" />
              <StatCard icon="💰" label="Finance Team" value="1" color="#10b981" />
              <StatCard icon="🎧" label="Support Team" value="2" color="#3b82f6" />
            </View>

            {/* Admins Table */}
            <View style={styles.tableContainer}>
              <DataTable
                columns={columns}
                data={mockAdmins}
                onRowPress={(row) => console.log('Admin clicked:', row)}
                emptyMessage="No admins found"
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Add Admin Modal */}
      <Modal visible={showAddModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }, Shadows.large]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Add New Admin</Text>

            <View style={styles.modalForm}>
              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Full Name</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.lightGray, color: colors.text }]}
                  placeholder="Enter name"
                  placeholderTextColor={colors.textSecondary}
                  value={newAdmin.name}
                  onChangeText={(text) => setNewAdmin(prev => ({ ...prev, name: text }))}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.lightGray, color: colors.text }]}
                  placeholder="Enter email"
                  placeholderTextColor={colors.textSecondary}
                  value={newAdmin.email}
                  onChangeText={(text) => setNewAdmin(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Role</Text>
                <View style={styles.roleSelector}>
                  {['superadmin', 'finance', 'support'].map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleOption,
                        { backgroundColor: newAdmin.role === role ? colors.primary : colors.lightGray }
                      ]}
                      onPress={() => setNewAdmin(prev => ({ ...prev, role }))}
                    >
                      <Text style={styles.roleOptionIcon}>{getRoleIcon(role)}</Text>
                      <Text style={[styles.roleOptionText, { color: newAdmin.role === role ? '#FFFFFF' : colors.text }]}>
                        {role === 'superadmin' ? 'Super Admin' : role.charAt(0).toUpperCase() + role.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.lightGray }]}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={handleAddAdmin}
                >
                  <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>Create Admin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </AdminLayout>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }, Shadows.small]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
    padding: Spacing.medium,
  },
  backIcon: {
    fontSize: FontSizes.large,
  },
  backText: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
  },
  main: {
    flex: 1,
  },
  mainContent: {
    padding: Spacing.large,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  pageTitle: {
    fontSize: FontSizes.extraLarge * 1.2,
    fontWeight: '800',
  },
  pageSubtitle: {
    fontSize: FontSizes.medium,
    marginTop: 4,
  },
  addButton: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.medium,
    borderRadius: BorderRadius.medium,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.small,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.medium,
    marginBottom: Spacing.large,
  },
  statCard: {
    flex: 1,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.small,
  },
  statIconText: {
    fontSize: FontSizes.large,
  },
  statValue: {
    fontSize: FontSizes.large,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSizes.tiny,
  },
  tableContainer: {
    marginBottom: Spacing.large,
  },
  adminCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: FontSizes.medium,
  },
  adminName: {
    fontSize: FontSizes.small,
    fontWeight: '700',
  },
  adminEmail: {
    fontSize: FontSizes.tiny,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    borderRadius: BorderRadius.small,
    alignSelf: 'flex-start',
  },
  roleBadgeIcon: {
    fontSize: FontSizes.tiny,
  },
  roleBadgeText: {
    fontSize: FontSizes.tiny,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    borderRadius: BorderRadius.small,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: FontSizes.tiny,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  actionsCell: {
    flexDirection: 'row',
    gap: Spacing.tiny,
  },
  actionButton: {
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    borderRadius: BorderRadius.small,
  },
  actionButtonText: {
    fontSize: FontSizes.tiny,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.large,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    borderRadius: BorderRadius.large,
    padding: Spacing.extraLarge,
  },
  modalTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: '800',
    marginBottom: Spacing.large,
    textAlign: 'center',
  },
  modalForm: {
    gap: Spacing.medium,
  },
  inputWrapper: {
    gap: Spacing.tiny,
  },
  inputLabel: {
    fontSize: FontSizes.small,
    fontWeight: '600',
  },
  input: {
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    fontSize: FontSizes.medium,
  },
  roleSelector: {
    gap: Spacing.small,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
  },
  roleOptionIcon: {
    fontSize: FontSizes.medium,
  },
  roleOptionText: {
    fontSize: FontSizes.small,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Spacing.medium,
    marginTop: Spacing.medium,
  },
  modalButton: {
    flex: 1,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: FontSizes.small,
    fontWeight: '700',
  },
});

