import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../constants/Design';
import { useColorScheme } from './useColorScheme';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  slot?: 'top' | 'middle' | 'bottom';
}

export default function SideMenu({ isVisible, onClose }: SideMenuProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuItems: MenuItem[] = [
    // Top Section - Main Navigation
    { id: 'dashboard', title: 'Dashboard', icon: '🏠', route: '/', slot: 'top' },
    { id: 'rides', title: 'My Rides', icon: '🚗', route: '/rides', slot: 'top' },
    { id: 'publish', title: 'Publish Ride', icon: '➕', route: '/publish', slot: 'top' },
    { id: 'profile', title: 'Profile', icon: '👤', route: '/profile', slot: 'top' },
    
    // Middle Section - Financial & Management
    { id: 'transactions', title: 'Transactions', icon: '💰', route: '/transactions', slot: 'middle' },
    { id: 'payouts', title: 'Payouts', icon: '💳', route: '/payouts', slot: 'middle' },
    { id: 'fare-management', title: 'Fare Management', icon: '📊', route: '/fare-management', slot: 'middle' },
    { id: 'verifications', title: 'Verifications', icon: '✅', route: '/verifications', slot: 'middle' },
    
    // Bottom Section - Support & Settings
    { id: 'complaints', title: 'Complaints', icon: '📝', route: '/complaints', slot: 'bottom' },
    { id: 'support-tickets', title: 'Support Tickets', icon: '🎫', route: '/support-tickets', slot: 'bottom' },
    { id: 'support', title: 'Support', icon: '🆘', route: '/support', slot: 'bottom' },
    { id: 'settings', title: 'Settings', icon: '⚙️', route: '/settings', slot: 'bottom' },
  ];

  const handleMenuItemPress = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const renderMenuSection = (items: MenuItem[], sectionTitle: string) => (
    <View style={styles.menuSection}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{sectionTitle}</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => handleMenuItemPress(item.route)}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sideMenu, { backgroundColor: colors.background }]}>
        {/* Header */}
        <LinearGradient
          colors={['#32CD32', '#228B22', '#1E7A1E']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>🚗</Text>
            <Text style={styles.headerTitle}>HushRyd</Text>
            <Text style={styles.headerSubtitle}>Navigation Menu</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Menu Content */}
        <View style={styles.menuContent}>
          {renderMenuSection(
            menuItems.filter(item => item.slot === 'top'),
            'Main'
          )}
          
          {renderMenuSection(
            menuItems.filter(item => item.slot === 'middle'),
            'Financial & Management'
          )}
          
          {renderMenuSection(
            menuItems.filter(item => item.slot === 'bottom'),
            'Support & Settings'
          )}
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            HushRyd v1.0.0
          </Text>
        </View>
      </View>
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sideMenu: {
    width: 280,
    height: '100%',
    ...Shadows.large,
  },
  header: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxxl,
    position: 'relative',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FontSizes.lg,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  menuContent: {
    flex: 1,
    padding: Spacing.lg,
  },
  menuSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    ...Shadows.small,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuIcon: {
    fontSize: FontSizes.lg,
    marginRight: Spacing.md,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
});
