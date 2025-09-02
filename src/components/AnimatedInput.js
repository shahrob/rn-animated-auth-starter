import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const AnimatedInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  backgroundColor,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnimation = useSharedValue(0);
  const errorAnimation = useSharedValue(0);

  const animatedLabelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      focusAnimation.value,
      [0, 1],
      [0, -25],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      focusAnimation.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderWidth = interpolate(
      focusAnimation.value,
      [0, 1],
      [1, 2],
      Extrapolate.CLAMP,
    );

    return {
      borderWidth,
    };
  });

  const animatedErrorStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      errorAnimation.value,
      [0, 1, 2, 3, 4],
      [0, -10, 10, -5, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX }],
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    focusAnimation.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      focusAnimation.value = withTiming(0, { duration: 200 });
    }
  };

  React.useEffect(() => {
    if (error) {
      errorAnimation.value = withTiming(4, { duration: 500 });
    } else {
      errorAnimation.value = withTiming(0, { duration: 200 });
    }
  }, [error, errorAnimation]);

  React.useEffect(() => {
    if (value && focusAnimation.value === 0) {
      focusAnimation.value = withTiming(1, { duration: 200 });
    }
  }, [value, focusAnimation]);

  const getBorderColor = () => {
    if (error) return '#ff6b6b';
    if (isFocused) return '#667eea';
    return '#cbd5e0';
  };

  const getLabelColor = () => {
    if (error) return '#ff6b6b';
    if (isFocused) return '#667eea';
    return '#4a5568';
  };

  return (
    <Animated.View style={[styles.container, animatedErrorStyle, style]}>
      <Animated.View
        style={[
          styles.inputContainer,
          animatedBorderStyle,
          { borderColor: getBorderColor() },
        ]}
      >
        <LinearGradient
          colors={
            backgroundColor
              ? [backgroundColor, backgroundColor]
              : ['#ffffff', '#f8f9fa']
          }
          style={styles.gradient}
        >
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={20}
              color={isFocused ? '#667eea' : '#4a5568'}
              style={styles.leftIcon}
            />
          )}

          <View style={styles.inputWrapper}>
            <Animated.Text
              style={[
                styles.label,
                animatedLabelStyle,
                { color: getLabelColor() },
              ]}
            >
              {label}
            </Animated.Text>

            <TextInput
              style={[
                styles.input,
                leftIcon && styles.inputWithLeftIcon,
                rightIcon && styles.inputWithRightIcon,
              ]}
              value={value}
              onChangeText={onChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={isFocused ? '' : placeholder}
              placeholderTextColor="#3f5d85ff"
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              {...props}
            />
          </View>

          {rightIcon && (
            <Icon
              name={rightIcon}
              size={20}
              color={isFocused ? '#667eea' : '#4a5568'}
              style={styles.rightIcon}
              onPress={onRightIconPress}
            />
          )}
        </LinearGradient>
      </Animated.View>

      {error && (
        <Animated.View style={styles.errorContainer}>
          <Icon name="error-outline" size={16} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: width * 0.85,
  },
  inputContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    minHeight: 60,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 20,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    color: '#1a202c',
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 0,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 15,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default AnimatedInput;
