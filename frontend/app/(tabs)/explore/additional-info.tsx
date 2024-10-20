// additional-info.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
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

const ResponseButton = ({ title, isPrimary, onPress }) => (
  <TouchableOpacity
    style={[styles.responseButton, isPrimary ? styles.primaryButton : styles.secondaryButton]}
    onPress={onPress}
  >
    <ThemedText style={[styles.responseButtonText, isPrimary ? styles.primaryButtonText : styles.secondaryButtonText]}>
      {title}
    </ThemedText>
  </TouchableOpacity>
);

export default function AdditionalInfoScreen() {
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

  const handleResponse = (response: 'yes' | 'no') => {
    if (response === 'yes') {
      router.push('/explore/stt-additional-info');
    } else {
      router.push('/explore/checkin-success');
    }
  };

  const fadeAnimStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
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
        <View style={styles.content}>
          <View style={styles.speechBubbleContainer}>
            <Image source={assets[0]} style={styles.speechBubble} resizeMode="contain" />
            <View style={styles.textWrapper}>
              <AnimatedTypingText
                text="Anything else you'd like to share?"
                style={styles.questionText}
                onComplete={handleTypingComplete}
              />
            </View>
          </View>
          <Image source={assets[1]} style={styles.curaBot} resizeMode="contain" />
          <Animated.View style={[styles.buttonContainer, fadeAnimStyle]}>
            <ResponseButton title="Yes" isPrimary={true} onPress={() => handleResponse('yes')} />
            <ResponseButton title="Nope, all good!" isPrimary={false} onPress={() => handleResponse('no')} />
          </Animated.View>
        </View>
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
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  responseButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#8F8BFF',
  },
  secondaryButton: {
    backgroundColor: '#DADAFF',
  },
  responseButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#4F49BD',
  },
});