import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  FadeInUp,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authAPI } from '../services/api';
import { authService } from '../services/auth';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedInput from '../components/AnimatedInput';
import { LoadingAnimation } from '../components/LoadingAnimation';

const { height } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const logoScale = useSharedValue(0);
  const containerOpacity = useSharedValue(0);

  React.useEffect(() => {
    // Animate logo entrance
    logoScale.value = withDelay(
      300,
      withSpring(1, {
        damping: 15,
        stiffness: 150,
      }),
    );

    // Fade in container
    containerOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
  }, [logoScale, containerOpacity]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.signup(
        formData.email,
        formData.password,
        formData.name,
      );
      if (response.token) {
        await authService.storeToken(response.token);
        if (response.user) {
          await authService.storeUserData(response.user);
        }
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Invalid response from server');
      }
    } catch (error) {
      Alert.alert(
        'Signup Failed',
        error.message || 'An error occurred during signup',
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = field => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f093fb" />
      <LinearGradient
        colors={['#f093fb', '#f5576c', '#4facfe']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Animated Logo */}
          <Animated.View
            style={[styles.logoContainer, logoAnimatedStyle]}
            entering={FadeInDown.delay(200).springify()}
          >
            <View style={styles.logoCircle}>
              <Icon name="person-add" size={40} color="#ffffff" />
            </View>
            <Text style={styles.logoText}>Join Us</Text>
            <Text style={styles.subtitleText}>Create your account</Text>
          </Animated.View>

          {/* Animated Form Container */}
          <Animated.View
            style={[styles.formContainer, containerAnimatedStyle]}
            entering={FadeInUp.delay(400).springify()}
          >
            <View style={styles.formCard}>
              {/* Name Input */}
              <Animated.View entering={SlideInLeft.delay(600).springify()}>
                <AnimatedInput
                  label="Full Name"
                  value={formData.name}
                  onChangeText={text => updateFormData('name', text)}
                  placeholder="Enter your full name"
                  leftIcon="person"
                  error={errors.name}
                  autoCapitalize="words"
                />
              </Animated.View>

              {/* Email Input */}
              <Animated.View entering={SlideInRight.delay(700).springify()}>
                <AnimatedInput
                  label="Email"
                  value={formData.email}
                  onChangeText={text => updateFormData('email', text)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  leftIcon="email"
                  error={errors.email}
                  autoCapitalize="none"
                />
              </Animated.View>

              {/* Password Input */}
              <Animated.View entering={SlideInLeft.delay(800).springify()}>
                <AnimatedInput
                  label="Password"
                  value={formData.password}
                  onChangeText={text => updateFormData('password', text)}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  leftIcon="lock"
                  rightIcon={showPassword ? 'visibility-off' : 'visibility'}
                  onRightIconPress={() => togglePasswordVisibility('password')}
                  error={errors.password}
                />
              </Animated.View>

              {/* Confirm Password Input */}
              <Animated.View entering={SlideInRight.delay(900).springify()}>
                <AnimatedInput
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={text => updateFormData('confirmPassword', text)}
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  leftIcon="lock"
                  rightIcon={
                    showConfirmPassword ? 'visibility-off' : 'visibility'
                  }
                  onRightIconPress={() =>
                    togglePasswordVisibility('confirmPassword')
                  }
                  error={errors.confirmPassword}
                />
              </Animated.View>

              {/* Terms and Conditions */}
              <Animated.View
                style={styles.termsContainer}
                entering={FadeInUp.delay(1000)}
              >
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </Animated.View>

              {/* Signup Button */}
              <Animated.View
                style={styles.buttonContainer}
                entering={FadeInUp.delay(1100).springify()}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <LoadingAnimation size="medium" color="#f093fb" />
                    <Text style={styles.loadingText}>
                      Creating your account...
                    </Text>
                  </View>
                ) : (
                  <AnimatedButton
                    title="Create Account"
                    onPress={handleSignup}
                    variant="secondary"
                  />
                )}
              </Animated.View>

              {/* Divider */}
              <Animated.View
                style={styles.dividerContainer}
                entering={FadeInUp.delay(1200)}
              >
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </Animated.View>

              {/* Social Signup Buttons */}
              <Animated.View
                style={styles.socialContainer}
                entering={FadeInUp.delay(1300)}
              >
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="facebook" size={24} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="email" size={24} color="#dd4b39" />
                </TouchableOpacity>
              </Animated.View>

              {/* Login Link */}
              <Animated.View
                style={styles.loginContainer}
                entering={FadeInUp.delay(1400)}
              >
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
  },
  formContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    alignItems: 'center',
  },
  termsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    color: '#8892b0',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#f093fb',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 15,
    color: '#f093fb',
    fontSize: 16,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e8ed',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#8892b0',
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#8892b0',
    fontSize: 14,
  },
  loginLink: {
    color: '#f093fb',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
