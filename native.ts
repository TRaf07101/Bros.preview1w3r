import { Capacitor } from '@capacitor/core';
import { BackgroundGeolocation } from '@capgo/background-geolocation';
import type { Fix } from './gps';

/** True só no aplicativo instalado (APK). No navegador o rastreio usa o GPS comum da página. */
export const isNativeTrip = () => Capacitor.isNativePlatform();

/**
 * Inicia o GPS em segundo plano. No Android isso cria um serviço em primeiro plano com uma notificação fixa,
 * que mantém a localização funcionando com a tela bloqueada ou em outro app.
 */
export async function startNativeWatch(onFix: (fix: Fix) => void, onDenied: () => void, onFail: () => void): Promise<void> {
  await BackgroundGeolocation.start(
    { backgroundTitle: 'Viagem em andamento', backgroundMessage: 'O bros. está somando os km da moto.', requestPermissions: true, stale: false, distanceFilter: 5 },
    (location, error) => {
      if (error) { if (error.code === 'NOT_AUTHORIZED') onDenied(); else onFail(); return; }
      if (!location) return;
      onFix({ lat: location.latitude, lon: location.longitude, t: location.time ?? Date.now(), acc: location.accuracy });
    },
  );
}

export const stopNativeWatch = () => BackgroundGeolocation.stop().catch(() => undefined);
export const openLocationSettings = () => BackgroundGeolocation.openSettings().catch(() => undefined);
