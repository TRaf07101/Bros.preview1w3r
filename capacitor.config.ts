const config = {
  appId: 'app.bros.caderno',
  appName: 'Bros.',
  webDir: 'dist',
  // useLegacyBridge evita que o Android pare as atualizações de GPS depois de 5 min em segundo plano.
  android: { allowMixedContent: false, useLegacyBridge: true },
  plugins: {
    LocalNotifications: {
      iconColor: '#DE4A38',
      presentationOptions: ['badge', 'sound', 'banner', 'list'],
    },
  },
};

export default config;