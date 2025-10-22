import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Button from '../components/Button';
import HushRydLogoImage from '../components/HushRydLogoImage';
import Input from '../components/Input';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../constants/Design';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // OTP Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOTP = async () => {
    if (!mobileNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOtpSent(true);
      setOtpTimer(60); // 60 seconds timer
      Alert.alert('Success', `OTP sent to ${mobileNumber}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic based on mobile number
      if (mobileNumber === '9876543210') {
        console.log('Admin login successful');
        router.replace('/admin/dashboard');
      } else {
        console.log('User login successful');
        router.replace('/(tabs)/');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (otpTimer > 0) {
      Alert.alert('Wait', `Please wait ${otpTimer} seconds before requesting new OTP`);
      return;
    }
    await handleSendOTP();
  };

  const handleSignUp = () => {
    // Navigate to signup screen (to be created)
    Alert.alert('Sign Up', 'Sign up functionality coming soon!');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <HushRydLogoImage
                size="medium"
                showBackground={false}
                shadow={true}
              />
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>
                Sign in to continue your journey
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.form}>
              <Input
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
                leftIcon="📱"
              />

              {/* OTP Input - Only show after OTP is sent */}
              {otpSent && (
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  maxLength={6}
                  leftIcon="🔐"
                />
              )}

              <Button
                title={
                  isLoading 
                    ? (otpSent ? "Verifying..." : "Sending OTP...") 
                    : (otpSent ? "Verify OTP" : "Send OTP")
                }
                onPress={otpSent ? handleVerifyOTP : handleSendOTP}
                loading={isLoading}
                style={styles.loginButton}
                textStyle={styles.loginButtonText}
              />

              {/* Resend OTP - Only show after OTP is sent */}
              {otpSent && (
                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendOTP}
                  disabled={otpTimer > 0}
                >
                  <Text style={[styles.resendText, { 
                    color: otpTimer > 0 ? '#9CA7B0' : '#32CD32' 
                  }]}>
                    {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              )}

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonIcon}>📱</Text>
                <Text style={styles.socialButtonText}>Continue with Phone</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonIcon}>🔍</Text>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.extraLarge,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: Spacing.extraLarge,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
    maxWidth: 400,
    ...Shadows.medium,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing.extraLarge,
  },
  welcomeText: {
    fontSize: FontSizes.extraLarge,
    fontWeight: '800',
    color: '#1e293b',
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
  },
  subtitleText: {
    fontSize: FontSizes.medium,
    color: '#64748b',
    textAlign: 'center',
  },
  form: {
    gap: Spacing.medium,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.small,
  },
  forgotPasswordText: {
    fontSize: FontSizes.small,
    color: '#32CD32',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#32CD32',
    borderWidth: 1,
    borderColor: '#32CD32',
    marginTop: Spacing.medium,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: Spacing.small,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
  },
  resendText: {
    fontSize: FontSizes.small,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: FontSizes.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.large,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: FontSizes.small,
    color: '#94a3b8',
    marginHorizontal: Spacing.medium,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    gap: Spacing.small,
  },
  socialButtonIcon: {
    fontSize: FontSizes.large,
  },
  socialButtonText: {
    fontSize: FontSizes.medium,
    color: '#1e293b',
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.large,
  },
  signUpText: {
    fontSize: FontSizes.medium,
    color: '#64748b',
  },
  signUpLink: {
    fontSize: FontSizes.medium,
    color: '#32CD32',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
