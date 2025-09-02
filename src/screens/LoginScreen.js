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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
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
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
      >
        {/* Animated Logo */}
        <Animated.View
          style={[styles.logoContainer, logoAnimatedStyle]}
          entering={FadeInDown.delay(200).springify()}
        >
          <View style={styles.logoCircle}>
            <Icon name="lock" size={40} color="#ffffff" />
          </View>
          <Text style={styles.logoText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>Sign in to continue</Text>
        </Animated.View>

        {/* Animated Form Container */}
        <Animated.View
          style={[styles.formContainer, containerAnimatedStyle]}
          entering={FadeInUp.delay(400).springify()}
        >
          <View style={styles.formCard}>
            {/* Email Input */}
            <Animated.View entering={SlideInLeft.delay(600).springify()}>
              <AnimatedInput
                label="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                leftIcon="email"
                error={errors.email}
                autoCapitalize="none"
                backgroundColor="gray"
              />
            </Animated.View>

            {/* Password Input */}
            <Animated.View entering={SlideInRight.delay(700).springify()}>
              <AnimatedInput
                label="Password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors({ ...errors, password: null });
                  }
                }}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                leftIcon="lock"
                rightIcon={showPassword ? 'visibility-off' : 'visibility'}
                onRightIconPress={togglePasswordVisibility}
                error={errors.password}
              />
            </Animated.View>

            {/* Forgot Password */}
            <Animated.View
              style={styles.forgotContainer}
              entering={FadeInUp.delay(800)}
            >
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Button */}
            <Animated.View
              style={styles.buttonContainer}
              entering={FadeInUp.delay(900).springify()}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <LoadingAnimation size="medium" color="#667eea" />
                  <Text style={styles.loadingText}>Signing you in...</Text>
                </View>
              ) : (
                <AnimatedButton
                  title="Sign In"
                  onPress={handleLogin}
                  variant="primary"
                />
              )}
            </Animated.View>

            {/* Divider */}
            <Animated.View
              style={styles.dividerContainer}
              entering={FadeInUp.delay(1000)}
            >
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </Animated.View>

            {/* Social Login Buttons */}
            <Animated.View
              style={styles.socialContainer}
              entering={FadeInUp.delay(1100)}
            >
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="facebook" size={24} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="email" size={24} color="#dd4b39" />
              </TouchableOpacity>
            </Animated.View>

            {/* Sign Up Link */}
            <Animated.View
              style={styles.signupContainer}
              entering={FadeInUp.delay(1200)}
            >
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
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
    paddingTop: height * 0.1,
    paddingBottom: 40,
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
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 30,
  },
  forgotText: {
    color: '#667eea',
    fontSize: 14,
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
    color: '#667eea',
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
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: '#8892b0',
    fontSize: 14,
  },
  signupLink: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
