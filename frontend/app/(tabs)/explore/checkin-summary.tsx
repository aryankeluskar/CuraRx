// checkin-summary.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CheckinSummaryScreen() {
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
    scaleAnim.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const fadeAnimStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const scaleAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  const handleContinue = () => {
    router.replace('/explore');
  };

  return (
    <LinearGradient
      colors={['#A29BFF', '#BEBAFD', '#F7F7FC']}
      locations={[0, 0.15, 0.52]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.content, fadeAnimStyle]}>
          <Animated.View style={[styles.buttonContainer, scaleAnimStyle]}>
            <View style={styles.buttonBackground} />
            <View style={styles.button}>
              <Ionicons name="checkmark" size={64} color="#F7F7FC" />
            </View>
          </Animated.View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>34</ThemedText>
              <ThemedText style={styles.statLabel}>COMPLETED DAYS</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>10</ThemedText>
              <ThemedText style={styles.statLabel}>CURRENT STREAK</ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <ThemedText style={styles.continueButtonText}>CONTINUE</ThemedText>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10%',
    paddingBottom: '20%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    
  },
  buttonBackground: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#9C97D9',
    opacity: 0.15,
    position: 'absolute',
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#8F8BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    
    
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 72,
    lineHeight: 100,
    fontWeight: 'bold',
    color: '#8F8BFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#8F8BFF',
    marginTop: 5,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#8F8BFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});