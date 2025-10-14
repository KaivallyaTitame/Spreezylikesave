import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spreezy.app',
  appName: 'Spreezy',
  webDir: 'dist/spreezy-frontend',
  server: {
    androidScheme: 'http',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500, // splash visible for 1.5s
      launchAutoHide: true, // auto-hide after duration
      launchFadeOutDuration: 1500, // fade out smoothly
      backgroundColor: '#FFFFFFFF', // white background
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false, // no spinner
      splashFullScreen: true, // full screen
      splashImmersive: true, // hide system UI
    },
  },
};

export default config;
