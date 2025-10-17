# Capacitor Setup Guide for SPAR Oman App

This guide will help you convert the SPAR Oman web app into native iOS and Android applications using Capacitor.

## Prerequisites

- Node.js and npm installed
- Xcode (for iOS development) - macOS only
- Android Studio (for Android development)

## Installation Steps

### 1. Install Capacitor

```bash
cd frontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
```

### 2. Initialize Capacitor

```bash
npx cap init
```

When prompted:

- App name: `SPAR Oman`
- App ID: `com.spar.oman` (or your preferred bundle ID)
- Web directory: `dist`

### 3. Build Your Web App

```bash
npm run build
```

### 4. Add Native Platforms

#### For Android:

```bash
npx cap add android
```

#### For iOS:

```bash
npx cap add ios
```

### 5. Sync Web Code to Native Projects

```bash
npx cap sync
```

## Running on Devices

### Android

```bash
npx cap open android
```

This will open Android Studio. From there:

1. Wait for Gradle sync to complete
2. Connect your Android device or start an emulator
3. Click the Run button

### iOS

```bash
npx cap open ios
```

This will open Xcode. From there:

1. Select your device or simulator
2. Click the Run button

## Configuration

### Status Bar Configuration

Create `capacitor.config.json` in the frontend directory:

```json
{
  "appId": "com.spar.oman",
  "appName": "SPAR Oman",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "plugins": {
    "StatusBar": {
      "style": "LIGHT",
      "backgroundColor": "#00853F"
    },
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#00853F",
      "showSpinner": false
    }
  }
}
```

## App Icons and Splash Screens

### Generate Icons

1. Create a 1024x1024 PNG icon with the SPAR logo
2. Use a tool like `cordova-res` to generate all required sizes:

```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
cordova-res ios --skip-config --copy
```

## Native Features (Optional)

### Camera Access

```bash
npm install @capacitor/camera
```

### Geolocation

```bash
npm install @capacitor/geolocation
```

### Push Notifications

```bash
npm install @capacitor/push-notifications
```

## Building for Production

### Android (APK/AAB)

1. Open Android Studio
2. Build > Generate Signed Bundle/APK
3. Follow the wizard to create a release build

### iOS (IPA)

1. Open Xcode
2. Product > Archive
3. Use the Organizer to upload to App Store Connect

## Development Workflow

After making changes to your web code:

```bash
npm run build
npx cap sync
```

Then reopen in Android Studio or Xcode to test.

## Useful Commands

```bash
# Update native projects after web changes
npx cap sync

# Copy web assets to native projects
npx cap copy

# Update Capacitor dependencies
npx cap update

# List installed plugins
npx cap ls
```

## Troubleshooting

### Android

- Ensure `ANDROID_HOME` environment variable is set
- Check that Java JDK 11+ is installed
- Clear Gradle cache if builds fail: `./gradlew clean`

### iOS

- Ensure Xcode Command Line Tools are installed
- Run `pod install` in the `ios/App` directory if needed
- Clear derived data if builds fail

## App Store Submission

### Android (Google Play)

1. Create app listing in Google Play Console
2. Generate signed AAB
3. Upload and complete store listing
4. Submit for review

### iOS (App Store)

1. Create app in App Store Connect
2. Archive in Xcode
3. Upload via Organizer
4. Complete app metadata
5. Submit for review

## Performance Optimization

- Enable production mode in build
- Optimize images (WebP format)
- Minimize bundle size
- Use lazy loading for routes

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)
