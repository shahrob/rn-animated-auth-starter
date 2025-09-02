# 🚀 React Native Authentication Starter with Animations

A beautiful, production-ready React Native authentication starter template featuring stunning animations, modern UI components, and comprehensive authentication flow.

## ✨ Features

### 🎨 **Beautiful Animations**
- **Reanimated v4** - Smooth, performant animations using React Native Reanimated
- **Gesture Handler** - Touch interactions and gesture support
- **Linear Gradients** - Beautiful gradient backgrounds and buttons
- **Loading Animations** - Custom loading states with animated components
- **Entrance Animations** - Staggered entrance animations for UI elements
- **Micro-interactions** - Button press animations, input focus effects

### 🔐 **Authentication System**
- **Login/Signup Screens** - Complete authentication flow
- **Form Validation** - Real-time validation with error handling
- **Token Management** - Secure token storage using AsyncStorage
- **Password Visibility Toggle** - User-friendly password input
- **Forgot Password** - Password reset functionality (ready for API integration)

### 🎯 **Modern UI Components**
- **AnimatedInput** - Floating label inputs with smooth animations
- **AnimatedButton** - Interactive buttons with press animations and gradients
- **LoadingAnimation** - Customizable loading indicators
- **Custom Icons** - Material Design icons throughout the app

### 📱 **Cross-Platform Support**
- **iOS & Android** - Full cross-platform compatibility
- **Responsive Design** - Adapts to different screen sizes
- **TypeScript Ready** - TypeScript configuration included

## 📁 Project Structure

```
src/
├── components/          # Reusable animated components
│   ├── AnimatedButton.js    # Interactive button with animations
│   ├── AnimatedInput.js     # Floating label input with animations
│   └── LoadingAnimation.js  # Loading indicators
├── navigation/          # App navigation setup
│   └── AppNavigator.js      # Stack navigation configuration
├── screens/            # Application screens
│   ├── LoginScreen.js       # Login screen with animations
│   ├── SignupScreen.js      # Signup screen with form validation
│   └── HomeScreen.js        # Dashboard with user profile
└── services/           # API and utility services
    ├── api.js              # API endpoints and HTTP client
    └── auth.js             # Authentication utilities
```

## 🛠 Installation

### Prerequisites
- Node.js (>=18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd reactNativeStarterAuth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   
   **Android:**
   ```bash
   npm run android
   ```
   
   **iOS:**
   ```bash
   npm run ios
   ```

## 📦 Dependencies

### Core Dependencies
- **React Native 0.81.0** - Core framework
- **React Navigation 7** - Navigation library
- **React Native Reanimated 4** - Animation library
- **React Native Gesture Handler** - Gesture support
- **AsyncStorage** - Local storage for tokens

### UI & Animation Libraries
- **react-native-linear-gradient** - Gradient backgrounds
- **react-native-vector-icons** - Icon library
- **lottie-react-native** - Complex animations (ready for use)
- **react-native-worklets** - JavaScript worklets support

### HTTP & Storage
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Secure local storage

## 🎨 Animation Features

### Input Animations
- **Floating Labels** - Smooth label transitions on focus
- **Border Animations** - Animated border colors and width
- **Error Shake** - Shake animation for validation errors
- **Icon Color Transitions** - Smooth color changes on focus

### Button Animations
- **Press Effects** - Scale and rotation animations on press
- **Gradient Animations** - Dynamic gradient color changes
- **Loading States** - Animated loading indicators
- **Spring Physics** - Natural spring-based animations

### Screen Transitions
- **Entrance Animations** - Staggered element entrances
- **Logo Animations** - Smooth logo scaling and fading
- **Form Animations** - Slide-in animations for form elements
- **Loading Overlays** - Full-screen loading with animations

## 🔧 Configuration

### Babel Configuration
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

### Metro Configuration
Ensure Metro is running on the correct port:
```bash
npx react-native start --port 8084
```

## 🎯 Usage Examples

### AnimatedInput Component
```javascript
<AnimatedInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  keyboardType="email-address"
  leftIcon="email"
  error={errors.email}
  backgroundColor="gray" // Custom background color
/>
```

### AnimatedButton Component
```javascript
<AnimatedButton
  title="Sign In"
  onPress={handleLogin}
  variant="primary"
  loading={isLoading}
/>
```

### LoadingAnimation Component
```javascript
<LoadingAnimation 
  size="medium" 
  color="#667eea" 
/>
```

## 🎨 Customization

### Color Scheme
The app uses a consistent color palette:
- **Primary**: `#667eea`
- **Secondary**: `#764ba2`
- **Success**: `#4facfe`
- **Error**: `#ff6b6b`

### Animation Timing
Customize animation timing in components:
```javascript
const animationConfig = {
  duration: 300,
  damping: 15,
  stiffness: 150
};
```

## 🔐 API Integration

### Authentication Endpoints
The app is ready for backend integration with these endpoints:

```javascript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### API Service
Update `src/services/api.js` with your backend URL:
```javascript
const API_BASE_URL = 'https://your-api-url.com';
```

## 🚨 Troubleshooting

### Common Issues

1. **Metro Bundle Issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android Build Issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

3. **iOS Build Issues**
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

4. **Animation Performance**
   - Ensure `react-native-reanimated/plugin` is in babel.config.js
   - Use `useSharedValue` for animated values
   - Avoid heavy computations in animation worklets

### Port Conflicts
If port 8081 is busy:
```bash
npx react-native start --port 8084
npm run android -- --port 8084
```

## 📱 Testing

### Run Tests
```bash
npm test
```

### Manual Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Registration with valid data
- [ ] Form validation errors
- [ ] Password visibility toggle
- [ ] Animation smoothness
- [ ] Loading states
- [ ] Navigation flow

## 🚀 Production Deployment

### Android
1. Generate signed APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. Bundle for Play Store:
   ```bash
   ./gradlew bundleRelease
   ```

### iOS
1. Build for release in Xcode
2. Archive and upload to App Store Connect

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💡 Tips for Development

### Performance Optimization
- Use `runOnJS` sparingly in animations
- Implement lazy loading for screens
- Optimize image sizes and formats
- Use `getSize` for responsive layouts

### Animation Best Practices
- Keep animations under 300ms for UI responsiveness
- Use spring animations for natural feel
- Implement proper cleanup in useEffect hooks
- Test animations on lower-end devices

### Code Organization
- Keep components small and focused
- Use custom hooks for complex logic
- Implement proper error boundaries
- Follow React Native best practices

## 🆘 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the React Native documentation
3. Check React Native Reanimated documentation
4. Create an issue in the repository

---

**Happy Coding! 🎉**

Built with ❤️ using React Native, Reanimated, and modern development practices.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
