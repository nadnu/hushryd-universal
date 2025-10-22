import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HushRydLogoImage from '../../components/HushRydLogoImage';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';

export default function AdminLoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);

  const handleFillCredentials = (email: string, password: string) => {
    setFormData({
      email: email,
      password: password,
      twoFactorCode: '',
    });
  };

  const handleLogin = async () => {
    const { email, password, twoFactorCode } = formData;

    console.log('Login attempt:', { email, password: '***' });

    if (!email || !password) {
      Alert.alert('Error', 'Please enter your credentials');
      return;
    }

    if (show2FA && !twoFactorCode) {
      Alert.alert('Error', 'Please enter the 2FA code');
      return;
    }

    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      
      // Mock admin user with role detection
      const mockAdmins: Record<string, { password: string; role: string; name: string }> = {
        'superadmin@hushryd.com': { password: 'admin123', role: 'superadmin', name: 'Super Admin' },
        'finance@hushryd.com': { password: 'finance123', role: 'finance', name: 'Finance Manager' },
        'support@hushryd.com': { password: 'support123', role: 'support', name: 'Support Agent' },
      };

      const admin = mockAdmins[email.toLowerCase()];
      console.log('Admin lookup:', admin);
      
      if (admin && admin.password === password) {
        console.log('Login successful for:', admin.name, 'Role:', admin.role);
        
        // Navigate to dashboard using proper Expo Router path
        console.log('Navigating to admin dashboard...');
        router.replace('/admin/dashboard');
        
        // Show success message after navigation
        setTimeout(() => {
          Alert.alert('Success', `Welcome back, ${admin.name}!`);
        }, 500);
      } else {
        console.log('Login failed - invalid credentials');
        Alert.alert('Error', 'Invalid credentials. Please check your email and password.');
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#00AFF5', '#084F8D', '#32CD32']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            {/* HushRyd Logo */}
            <HushRydLogoImage 
              size="large" 
              showBackground={false}
            />
            <Text style={styles.logoSubtext}>Administrative Portal</Text>
            <Text style={styles.logoDescription}>Secure access to platform management</Text>
          </View>
        </LinearGradient>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }, Shadows.large]}>
            <Text style={[styles.formTitle, { color: colors.text }]}>Admin Login</Text>
            <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
              Sign in to access the admin dashboard
            </Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
                <View style={[styles.inputField, { backgroundColor: colors.lightGray, borderColor: colors.border }]}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your admin email"
                    placeholderTextColor={colors.textSecondary}
                    value={formData.email}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Password</Text>
                <View style={[styles.inputField, { backgroundColor: colors.lightGray, borderColor: colors.border }]}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.textSecondary}
                    value={formData.password}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, password: value }))}
                    secureTextEntry
                  />
                </View>
              </View>

              {show2FA && (
                <View style={styles.inputWrapper}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>2FA Code</Text>
                  <View style={[styles.inputField, { backgroundColor: colors.lightGray, borderColor: colors.border }]}>
                    <Text style={styles.inputIcon}>🔐</Text>
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Enter 6-digit code"
                      placeholderTextColor={colors.textSecondary}
                      value={formData.twoFactorCode}
                      onChangeText={(value) => setFormData(prev => ({ ...prev, twoFactorCode: value }))}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: colors.primary }]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Security Info */}
            <View style={styles.securityInfo}>
              <Text style={[styles.securityText, { color: colors.textSecondary }]}>
                🔐 This is a secure admin portal. All actions are logged.
              </Text>
            </View>
          </View>

          {/* Demo Credentials */}
          <View style={[styles.demoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.demoTitle, { color: colors.text }]}>Demo Credentials</Text>
            <View style={styles.demoCredentials}>
              <DemoCredential 
                role="SuperAdmin" 
                email="superadmin@hushryd.com" 
                password="admin123"
                icon="👑"
                onFillCredentials={handleFillCredentials}
              />
              <DemoCredential 
                role="Finance" 
                email="finance@hushryd.com" 
                password="finance123"
                icon="💰"
                onFillCredentials={handleFillCredentials}
              />
              <DemoCredential 
                role="Support" 
                email="support@hushryd.com" 
                password="support123"
                icon="🎧"
                onFillCredentials={handleFillCredentials}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

interface DemoCredentialProps {
  role: string;
  email: string;
  password: string;
  icon: string;
  onFillCredentials: (email: string, password: string) => void;
}

function DemoCredential({ role, email, password, icon, onFillCredentials }: DemoCredentialProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const fillCredentials = () => {
    onFillCredentials(email, password);
  };

  return (
    <TouchableOpacity style={styles.demoItem} onPress={fillCredentials}>
      <Text style={styles.demoIcon}>{icon}</Text>
      <View style={styles.demoInfo}>
        <Text style={[styles.demoRole, { color: colors.text }]}>{role}</Text>
        <Text style={[styles.demoEmail, { color: colors.textSecondary }]}>{email}</Text>
        <Text style={[styles.demoPassword, { color: colors.textSecondary }]}>Password: {password}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.fillButton, { backgroundColor: colors.primary }]}
        onPress={fillCredentials}
      >
        <Text style={styles.fillButtonText}>Fill</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    paddingTop: Spacing.extraLarge * 2,
    paddingBottom: Spacing.extraLarge,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.large,
  },
  logoSubtext: {
    fontSize: FontSizes.large,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginTop: Spacing.medium,
    marginBottom: Spacing.tiny,
  },
  logoDescription: {
    fontSize: FontSizes.medium,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    marginTop: -Spacing.large,
    justifyContent: 'center',
  },
  formCard: {
    borderRadius: BorderRadius.large,
    padding: Spacing.extraLarge,
    borderWidth: 1,
    marginBottom: Spacing.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  formTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.tiny,
  },
  formSubtitle: {
    fontSize: FontSizes.medium,
    textAlign: 'center',
    marginBottom: Spacing.extraLarge,
  },
  inputContainer: {
    marginBottom: Spacing.large,
  },
  inputWrapper: {
    marginBottom: Spacing.medium,
  },
  inputLabel: {
    fontSize: FontSizes.small,
    fontWeight: '600',
    marginBottom: Spacing.tiny,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    paddingHorizontal: Spacing.medium,
    height: 50,
  },
  inputIcon: {
    fontSize: FontSizes.large,
    marginRight: Spacing.small,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.medium,
    height: '100%',
  },
  loginButton: {
    height: 50,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.medium,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.medium,
    fontWeight: '700',
  },
  securityInfo: {
    alignItems: 'center',
    paddingTop: Spacing.medium,
  },
  securityText: {
    fontSize: FontSizes.tiny,
    textAlign: 'center',
  },
  demoCard: {
    borderRadius: BorderRadius.large,
    padding: Spacing.large,
    borderWidth: 1,
    marginBottom: Spacing.large,
  },
  demoTitle: {
    fontSize: FontSizes.large,
    fontWeight: '700',
    marginBottom: Spacing.medium,
    textAlign: 'center',
  },
  demoCredentials: {
    gap: Spacing.medium,
  },
  demoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium,
  },
  demoIcon: {
    fontSize: FontSizes.large,
  },
  demoInfo: {
    flex: 1,
  },
  demoRole: {
    fontSize: FontSizes.medium,
    fontWeight: '700',
    marginBottom: 2,
  },
  demoEmail: {
    fontSize: FontSizes.tiny,
    marginBottom: 2,
  },
  demoPassword: {
    fontSize: FontSizes.tiny,
  },
  fillButton: {
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.tiny,
    borderRadius: BorderRadius.small,
    minWidth: 60,
    alignItems: 'center',
  },
  fillButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.tiny,
    fontWeight: '600',
  },
});

