/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/explore/` | `/(tabs)/explore/additional-info` | `/(tabs)/explore/checkin-success` | `/(tabs)/explore/checkin-summary` | `/(tabs)/explore/confirm` | `/(tabs)/explore/health-level` | `/(tabs)/explore/patient-stt-interface` | `/(tabs)/explore/personalized-qs` | `/(tabs)/explore/stt-additional-info` | `/(tabs)/explore/symptoms-confirm` | `/(tabs)/profile` | `/_sitemap` | `/explore` | `/explore/` | `/explore/additional-info` | `/explore/checkin-success` | `/explore/checkin-summary` | `/explore/confirm` | `/explore/health-level` | `/explore/patient-stt-interface` | `/explore/personalized-qs` | `/explore/stt-additional-info` | `/explore/symptoms-confirm` | `/profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
