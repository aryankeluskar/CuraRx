// confirm.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useAssets } from 'expo-asset';

const { width, height } = Dimensions.get('window');

const AnimatedTypingText = ({ text, style, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 37);
      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <Animated.Text style={style}>{displayText}</Animated.Text>;
};

const ConfirmButton = ({ onPress }) => (
  <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
    <ThemedText style={styles.confirmButtonText}>CONFIRM</ThemedText>
  </TouchableOpacity>
);

export default function ConfirmScreen() {
  const [assets] = useAssets([
    require('@/assets/images/speech-bubble.png'),
    require('@/assets/images/cura-calm.png'),
  ]);

  const [isTyping, setIsTyping] = useState(true);
  const fadeAnim = useSharedValue(0);

  const handleTypingComplete = () => {
    setIsTyping(false);
    fadeAnim.value = withTiming(1, { duration: 500 });
  };

  const handleConfirm = () => {
    router.push('/explore/symptoms-confirm');
  };

  const fadeAnimStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  if (!assets) {
    return null; // or a loading indicator
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
          <View style={styles.textWrapper}>
            <AnimatedTypingText
              text="Have you taken all your medications today?"
              style={styles.confirmationText}
              onComplete={handleTypingComplete}
            />
          </View>
        </View>
        <Image
          source={assets[1]}
          style={styles.curaBot}
          resizeMode="contain"
        />
        <Animated.View style={[styles.buttonContainer, fadeAnimStyle]}>
          <ConfirmButton onPress={handleConfirm} />
        </Animated.View>
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
  confirmationText: {
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