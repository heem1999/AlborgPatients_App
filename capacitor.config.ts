import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dara.alborgdx.patient',
  appName: 'Alborgdx',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "SplashScreen": {
      "showSpinner": true,
      "spinnerColor": "#007265",
      "launchShowDuration": 30000,
      "launchAutoHide": false,
      "androidScaleType": "CENTER_CROP",
      "splashImmersive": true,
     // "backgroundColor": "#ab0048",
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
    },
    /*"cordova": {
      "preferences": {
        "LottieFullScreen":"true",
        "LottieHideAfterAnimationEnd":"true",
        "LottieAnimationLocation":"public/assets/splash.json"
      }
  },*/
    "PushNotifications": {
        "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
