import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
  BounceIn,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authAPI } from '../services/api';
import { authService } from '../services/auth';
import AnimatedButton from '../components/AnimatedButton';
import { LoadingAnimation, PulseLoading } from '../components/LoadingAnimation';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const headerScale = useSharedValue(0);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    loadUserData();

    // Animate header entrance
    headerScale.value = withDelay(
      200,
      withSpring(1, {
        damping: 15,
        stiffness: 150,
      }),
    );

    // Fade in cards
    cardOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
  }, [headerScale, cardOpacity]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
  }));

  const loadUserData = async () => {
    try {
      const storedUserData = await authService.getUserData();
      if (storedUserData) {
        setUserData(storedUserData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: performLogout,
      },
    ]);
  };

  const performLogout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      await authService.clearAuthData();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      await authService.clearAuthData();
      navigation.replace('Login');
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    setRefreshing(true);
    try {
      const profile = await authAPI.getProfile();
      if (profile) {
        setUserData(profile);
        await authService.storeUserData(profile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      Alert.alert('Error', 'Failed to refresh profile. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const getInitials = email => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const formatDate = dateString => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4facfe" />
      <LinearGradient
        colors={['#4facfe', '#00f2fe', '#667eea']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Animated Header */}
          <Animated.View
            style={[styles.headerContainer, headerAnimatedStyle]}
            entering={FadeInDown.delay(200).springify()}
          >
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>
                  {getInitials(userData?.email)}
                </Text>
              </LinearGradient>
            </View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.emailText}>{userData?.email || 'User'}</Text>
          </Animated.View>

          {/* Animated Content */}
          <Animated.View
            style={[styles.contentContainer, cardAnimatedStyle]}
            entering={FadeInUp.delay(400).springify()}
          >
            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <Animated.View entering={SlideInLeft.delay(600).springify()}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.statCard}
                >
                  <Icon name="person" size={30} color="#ffffff" />
                  <Text style={styles.statLabel}>Profile</Text>
                  <Text style={styles.statValue}>Active</Text>
                </LinearGradient>
              </Animated.View>

              <Animated.View entering={SlideInRight.delay(700).springify()}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.statCard}
                >
                  <Icon name="security" size={30} color="#ffffff" />
                  <Text style={styles.statLabel}>Security</Text>
                  <Text style={styles.statValue}>Secure</Text>
                </LinearGradient>
              </Animated.View>
            </View>

            {/* User Info Card */}
            <Animated.View
              style={styles.infoCard}
              entering={BounceIn.delay(800)}
            >
              <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.infoGradient}
              >
                <Text style={styles.cardTitle}>Account Information</Text>

                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Icon name="email" size={20} color="#4facfe" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Email Address</Text>
                    <Text style={styles.infoValue}>
                      {userData?.email || 'Not available'}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Icon name="fingerprint" size={20} color="#f093fb" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>User ID</Text>
                    <Text style={styles.infoValue}>
                      {userData?.id || 'Not available'}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Icon name="calendar-today" size={20} color="#667eea" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Member Since</Text>
                    <Text style={styles.infoValue}>
                      {formatDate(userData?.createdAt)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Quick Actions */}
            <Animated.View
              style={styles.actionsContainer}
              entering={FadeInUp.delay(1000)}
            >
              <Text style={styles.actionsTitle}>Quick Actions</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={refreshProfile}
                  disabled={refreshing}
                >
                  <LinearGradient
                    colors={['#4facfe', '#00f2fe']}
                    style={styles.actionButtonGradient}
                  >
                    {refreshing ? (
                      <PulseLoading size={24} colors={['#ffffff', '#e0f7ff']} />
                    ) : (
                      <Icon name="refresh" size={24} color="#ffffff" />
                    )}
                    <Text style={styles.actionButtonText}>
                      {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.actionButtonGradient}
                  >
                    <Icon name="settings" size={24} color="#ffffff" />
                    <Text style={styles.actionButtonText}>Settings</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Logout Button */}
            <Animated.View
              style={styles.logoutContainer}
              entering={FadeInUp.delay(1200).springify()}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <LoadingAnimation size="medium" color="#ff6b6b" />
                  <Text style={styles.loadingText}>Logging out...</Text>
                </View>
              ) : (
                <AnimatedButton
                  title="Logout"
                  onPress={handleLogout}
                  variant="danger"
                />
              )}
            </Animated.View>
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
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: height * 0.05,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4facfe',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: width * 0.42,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  infoCard: {
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  infoGradient: {
    padding: 25,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8892b0',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: width * 0.42,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  actionButtonGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  logoutContainer: {
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 15,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
