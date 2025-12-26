export default () => ({
  appStoreConnect: {
    keyId: process.env.APP_STORE_CONNECT_KEY_ID,
    issuerId: process.env.APP_STORE_CONNECT_ISSUER_ID,
    keyPath: process.env.APP_STORE_CONNECT_KEY_PATH,
  },
  googlePlay: {
    serviceAccountPath: process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_PATH,
    packageName: process.env.GOOGLE_PLAY_PACKAGE_NAME,
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    credentialsPath: process.env.FIREBASE_CREDENTIALS_PATH,
  },
  googleAnalytics: {
    propertyId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID,
    credentialsPath: process.env.GOOGLE_ANALYTICS_CREDENTIALS_PATH,
  },
});

