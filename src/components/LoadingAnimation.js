import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const LoadingAnimation = ({ size = 'medium', color = '#667eea' }) => {
  const scale1 = useSharedValue(0.5);
  const scale2 = useSharedValue(0.5);
  const scale3 = useSharedValue(0.5);
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);

  React.useEffect(() => {
    const duration = 600;
    const delay = 200;

    // First dot animation
    scale1.value = withRepeat(
      withSequence(withTiming(1, { duration }), withTiming(0.5, { duration })),
      -1,
      false,
    );

    opacity1.value = withRepeat(
      withSequence(withTiming(1, { duration }), withTiming(0.3, { duration })),
      -1,
      false,
    );

    // Second dot animation with delay
    scale2.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration }),
          withTiming(0.5, { duration }),
        ),
        -1,
        false,
      ),
    );

    opacity2.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration }),
          withTiming(0.3, { duration }),
        ),
        -1,
        false,
      ),
    );

    // Third dot animation with more delay
    scale3.value = withDelay(
      delay * 2,
      withRepeat(
        withSequence(
          withTiming(1, { duration }),
          withTiming(0.5, { duration }),
        ),
        -1,
        false,
      ),
    );

    opacity3.value = withDelay(
      delay * 2,
      withRepeat(
        withSequence(
          withTiming(1, { duration }),
          withTiming(0.3, { duration }),
        ),
        -1,
        false,
      ),
    );
  }, [scale1, scale2, scale3, opacity1, opacity2, opacity3]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity2.value,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: opacity3.value,
  }));

  const getDotSize = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'medium':
        return 12;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };

  const dotSize = getDotSize();

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <Animated.View style={[animatedStyle1]}>
          <View
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
              },
            ]}
          />
        </Animated.View>

        <Animated.View style={[animatedStyle2]}>
          <View
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
              },
            ]}
          />
        </Animated.View>

        <Animated.View style={[animatedStyle3]}>
          <View
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

// Pulse Loading Animation
const PulseLoading = ({ size = 60, colors = ['#667eea', '#764ba2'] }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(0.8, { duration: 1000 }),
      ),
      -1,
      false,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 }),
      ),
      -1,
      false,
    );
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.pulseContainer}>
      <Animated.View style={[animatedStyle]}>
        <LinearGradient
          colors={colors}
          style={[
            styles.pulseCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 50,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export { LoadingAnimation, PulseLoading };
