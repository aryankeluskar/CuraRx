import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import { useAssets } from 'expo-asset';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

const { width, height } = Dimensions.get('window');

const AnimatedTypingText = ({ text, style }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const speedRef = useRef(37);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speedRef.current);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <Animated.Text style={style}>{displayText}</Animated.Text>;
};

export default function ExploreScreen() {
  const [assets] = useAssets([
    require('@/assets/images/speech-bubble.png'),
    require('@/assets/images/cura-default.png'),
  ]);

  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const pulseAnimation = () => {
    buttonScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  };

  useEffect(() => {
    pulseAnimation();
  }, []);

  const handleArrowPress = () => {
    router.push('/explore/confirm');
  };

  if (!assets) {
    return null; 
  }

  return (
    <LinearGradient
      colors={['#A29BFF', '#BEBAFD', '#F7F7FC']}
      locations={[0, 0.15, 0.52]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.speechBubbleContainer}>
          <Image
            source={assets[0]}
            style={styles.speechBubble}
            resizeMode="contain"
          />
          <View style={styles.greetingWrapper}>
            <AnimatedTypingText
              text="Good morning, Ada! How are you feeling today?"
              style={styles.greeting}
            />
          </View>
        </View>
        <Image
          source={assets[1]}
          style={styles.curaBot}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonBackground} />
          <Animated.View style={[styles.button, buttonAnimatedStyle]}>
            <TouchableOpacity onPress={handleArrowPress}>
              <Ionicons name="arrow-forward" size={32} color="#F7F7FC" />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <ThemedText style={styles.checkInText}>CHECK-IN</ThemedText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
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
  greetingWrapper: {
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
  greeting: {
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
    marginBottom: 30,
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
  checkInText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#8F8BFF',
  },
});