import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { FontSizes, Spacing } from '../../constants/Design';
import { useAuth } from '../../contexts/AuthContext';
import { useColorScheme } from '../useColorScheme';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'superadmin' | 'admin' | 'support' | 'manager';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { admin, isAuthenticated, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login' as any);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{
          marginTop: Spacing.medium,
          fontSize: FontSizes.medium,
          color: colors.textSecondary,
        }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!isAuthenticated || !admin) {
    return null; // Will redirect to login
  }

  // Check role-based access
  if (requiredRole && !hasRequiredRole(admin.role, requiredRole)) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: Spacing.large,
      }}>
        <Text style={{
          fontSize: FontSizes.large,
          fontWeight: 'bold',
          color: colors.error,
          textAlign: 'center',
          marginBottom: Spacing.medium,
        }}>
          Access Denied
        </Text>
        <Text style={{
          fontSize: FontSizes.medium,
          color: colors.textSecondary,
          textAlign: 'center',
          lineHeight: FontSizes.medium * 1.5,
        }}>
          You don't have permission to access this page.{'\n'}
          Required role: {requiredRole}
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

// Helper function to check if user has required role
function hasRequiredRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    'superadmin': 4,
    'admin': 3,
    'manager': 2,
    'support': 1,
  };

  return roleHierarchy[userRole as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole as keyof typeof roleHierarchy];
}
