// health-level.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useAssets } from 'expo-asset';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const ConfirmButton = ({ onPress }) => (
  <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
    <ThemedText style={styles.confirmButtonText}>CONFIRM</ThemedText>
  </TouchableOpacity>
);

export default function HealthLevelScreen() {
  const [assets] = useAssets([
    require('@/assets/images/speech-bubble.png'),
    require('@/assets/images/cura-calm.png'),
  ]);

  const [severity, setSeverity] = useState(1);
  const fadeAnim = useSharedValue(0);

  const handleConfirm = () => {
    router.push('/explore/personalized-qs');
  };

  const getSliderColor = (value: number) => {
    const colors = ['#1384BC', '#86cbd4', '#efd58c', '#ebb18d', '#df9da1'];
    return colors[Math.floor(value) - 1] || '#dedee2';
  };

  const fadeAnimStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  React.useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
  }, []);

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
              <ThemedText style={styles.questionText}>
                Rate the severity of your symptoms (1 = lowest; 5 = highest)
              </ThemedText>
            </View>
          </View>
          <Image
            source={assets[1]}
            style={styles.curaBot}
            resizeMode="contain"
          />
          <View style={styles.sliderContainer}>
            <ThemedText style={styles.severityLabel}>SEVERITY</ThemedText>
            <ThemedText style={styles.severityValue}>{severity}</ThemedText>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={severity}
              onValueChange={setSeverity}
              minimumTrackTintColor={getSliderColor(severity)}
              maximumTrackTintColor="#dedee2"
              thumbTintColor={getSliderColor(severity)}
            />
          </View>
          <ConfirmButton onPress={handleConfirm} />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  questionText: {
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
  sliderContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
  severityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B3292',
    marginBottom: 5,
  },
  severityValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3B3292',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  confirmButton: {
    backgroundColor: '#8F8BFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});