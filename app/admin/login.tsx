import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        Alert.alert('Success', result.message, [
          { text: 'OK', onPress: () => router.replace('/admin/dashboard' as any) }
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact your system administrator to reset your password.',
      [{ text: 'OK' }]
    );
  };

  const handleBackToHome = () => {
    router.replace('/(tabs)/' as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#32CD32', '#228B22', '#1E7A1E']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back to Home</Text>
          </TouchableOpacity>
          
          <View style={styles.logoSection}>
            <Text style={styles.logoIcon}>🚗</Text>
            <Text style={styles.logoTitle}>HushRyd</Text>
            <Text style={styles.logoSubtitle}>Admin Portal</Text>
          </View>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: colors.text }]}>Admin Login</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                Sign in to access the admin dashboard
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="admin@hushryd.com"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: colors.primary }, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.demoCredentials}>
              <Text style={[styles.demoTitle, { color: colors.text }]}>Demo Credentials:</Text>
              <View style={[styles.credentialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.credentialLabel, { color: colors.textSecondary }]}>Super Admin:</Text>
                <Text style={[styles.credentialText, { color: colors.text }]}>admin@hushryd.com / admin123</Text>
              </View>
              <View style={[styles.credentialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.credentialLabel, { color: colors.textSecondary }]}>Support Agent:</Text>
                <Text style={[styles.credentialText, { color: colors.text }]}>support@hushryd.com / support123</Text>
              </View>
              <View style={[styles.credentialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.credentialLabel, { color: colors.textSecondary }]}>Manager:</Text>
                <Text style={[styles.credentialText, { color: colors.text }]}>manager@hushryd.com / manager123</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: Spacing.large,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  backIcon: {
    fontSize: FontSizes.large,
    color: '#FFFFFF',
    marginRight: Spacing.small,
  },
  backText: {
    fontSize: FontSizes.medium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logoSection: {
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: FontSizes.xxxl * 2,
    marginBottom: Spacing.small,
  },
  logoTitle: {
    fontSize: FontSizes.xxxl * 1.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.tiny,
  },
  logoSubtitle: {
    fontSize: FontSizes.large,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: Spacing.large,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  formTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    marginBottom: Spacing.small,
  },
  formSubtitle: {
    fontSize: FontSizes.medium,
    textAlign: 'center',
  },
  form: {
    marginBottom: Spacing.xxxl,
  },
  inputGroup: {
    marginBottom: Spacing.large,
  },
  inputLabel: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
    marginBottom: Spacing.small,
  },
  input: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.large,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    fontSize: FontSizes.medium,
    ...Shadows.small,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xxxl,
  },
  forgotPasswordText: {
    fontSize: FontSizes.small,
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: Spacing.large,
    borderRadius: BorderRadius.large,
    alignItems: 'center',
    ...Shadows.medium,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.large,
    fontWeight: 'bold',
  },
  demoCredentials: {
    marginTop: Spacing.xxxl,
  },
  demoTitle: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginBottom: Spacing.medium,
    textAlign: 'center',
  },
  credentialCard: {
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    marginBottom: Spacing.small,
    ...Shadows.small,
  },
  credentialLabel: {
    fontSize: FontSizes.small,
    fontWeight: '600',
    marginBottom: Spacing.tiny,
  },
  credentialText: {
    fontSize: FontSizes.small,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});