/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/explore/` | `/(tabs)/explore/confirm` | `/(tabs)/explore/patient-stt-interface` | `/(tabs)/explore/symptoms-confirm` | `/_sitemap` | `/explore` | `/explore/` | `/explore/confirm` | `/explore/patient-stt-interface` | `/explore/symptoms-confirm`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
