// checkin-success.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  runOnJS
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useAssets } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CheckinSuccessScreen() {
  const [assets] = useAssets([
    require('@/assets/images/speech-bubble.png'),
    require('@/assets/images/cura-default.png'),
  ]);

  const fadeAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);

  useEffect(() => {
    scaleAnim.value = withSequence(
      withTiming(1.1, { duration: 1000 }),
      withTiming(1, { duration: 1000 })
    );

    setTimeout(() => {
      fadeAnim.value = withTiming(0, { duration: 1000 }, () => {
        runOnJS(router.replace)('/explore/checkin-summary');
      });
    }, 3000);
  }, []);

  const fadeAnimStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const scaleAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  if (!assets) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#A29BFF', '#BEBAFD', '#F7F7FC']}
      locations={[0, 0.15, 0.52]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.content, fadeAnimStyle]}>
          <View style={styles.speechBubbleContainer}>
            <Image
              source={assets[0]}
              style={styles.speechBubble}
              resizeMode="contain"
            />
            <View style={styles.textWrapper}>
              <ThemedText style={styles.thankYouText}>
                Thank you, Ada!{'\n'}Have a great day!
              </ThemedText>
            </View>
          </View>
          <Image
            source={assets[1]}
            style={styles.curaBot}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonBackground} />
            <Animated.View style={[styles.button, scaleAnimStyle]}>
              <Ionicons name="checkmark" size={32} color="#F7F7FC" />
            </Animated.View>
          </View>
          <Animated.Text style={[styles.completedText, scaleAnimStyle]}>
            CHECK-IN COMPLETED
          </Animated.Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  speechBubbleContainer: {
    position: 'relative',
    width: 309,
    height: 166,
    marginBottom: 20,
  },
  speechBubble: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  curaBot: {
    width: 300,
    height: 188,
    marginBottom: 70,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#9C97D9',
    opacity: 0.15,
    position: 'absolute',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8F8BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8F8BFF',
    marginTop: 20,
  },
});