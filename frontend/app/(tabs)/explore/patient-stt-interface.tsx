// patient-stt-interface.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useAssets } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

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

const RecordButton = ({ isRecording, onPress }) => (
  <TouchableOpacity
    style={[styles.recordButton, isRecording && styles.recordButtonActive]}
    onPress={onPress}
  >
    <Ionicons name="mic" size={32} color="#FFFFFF" />
  </TouchableOpacity>
);

const DoneButton = ({ isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.doneButton, isActive && styles.doneButtonActive]}
    onPress={isActive ? onPress : undefined}
    disabled={!isActive}
  >
    <ThemedText style={[styles.doneButtonText, isActive && styles.doneButtonTextActive]}>
      DONE
    </ThemedText>
  </TouchableOpacity>
);

export default function PatientSTTInterface() {
  const [assets] = useAssets([
    require('@/assets/images/speech-bubble.png'),
    require('@/assets/images/cura-calm.png'),
  ]);

  const [isTyping, setIsTyping] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const fadeAnim = useSharedValue(0);

  const handleTypingComplete = () => {
    setIsTyping(false);
    fadeAnim.value = withTiming(1, { duration: 500 });
  };

  const handleRecordPress = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setHasRecorded(true);
      console.log('Recording stopped');
      // Simulate processing time
      setTimeout(() => {
        console.log('Recording processed successfully');
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      setHasRecorded(false);
      console.log('Recording started');
    }
  };

  const handleDonePress = () => {
    if (hasRecorded) {
      console.log('DONE button pressed. Recording data ready to be sent.');
      // Simulate sending the recording data to the backend
      setTimeout(() => {
        console.log('Recording data sent successfully');
        // Navigate to the health-level screen
        router.push('/explore/health-level');
      }, 1000);
    }
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
              text="Please describe these symptoms. When did they start?"
              style={styles.questionText}
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
          <RecordButton isRecording={isRecording} onPress={handleRecordPress} />
          <DoneButton isActive={hasRecorded} onPress={handleDonePress} />
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
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#8F8BFF',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordButtonActive: {
    backgroundColor: '#7A76D6',
  },
  doneButton: {
    backgroundColor: '#D1D1D1',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
  },
  doneButtonActive: {
    backgroundColor: '#8F8BFF',
  },
  doneButtonText: {
    color: '#9B9B9B',
    fontSize: 18,
    fontWeight: '600',
  },
  doneButtonTextActive: {
    color: '#FFFFFF',
  },
});