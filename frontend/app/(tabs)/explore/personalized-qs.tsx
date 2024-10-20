// personalized-qs.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useAssets } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for responses
const responses = [
  { id: '1', text: 'Choice 1' },
  { id: '2', text: 'Choice 2' },
  { id: '3', text: 'Choice 3' },
];

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

export default function PersonalizedQsScreen() {
  const [assets] = useAssets([
    require('@/assets/images/speech-bubble.png'),
    require('@/assets/images/cura-calm.png'),
  ]);

  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const fadeAnim = useSharedValue(0);

  const toggleResponse = (id: string) => {
    setSelectedResponses((prev) =>
      prev.includes(id) ? prev.filter((responseId) => responseId !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    // TODO: Send selected responses to the backend
    console.log('Selected responses:', selectedResponses);
    router.push('/explore/additional-info');
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    fadeAnim.value = withTiming(1, { duration: 500 });
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.speechBubbleContainer}>
              <Image source={assets[0]} style={styles.speechBubble} resizeMode="contain" />
              <View style={styles.textWrapper}>
                <AnimatedTypingText
                  text="Question placeholder here"
                  style={styles.questionText}
                  onComplete={handleTypingComplete}
                />
              </View>
            </View>
            <Image source={assets[1]} style={styles.curaBot} resizeMode="contain" />
            <Animated.View style={[styles.responseContainer, fadeAnimStyle]}>
              <ThemedText style={styles.instructionText}>Check all that apply:</ThemedText>
              {responses.map((response) => (
                <TouchableOpacity
                  key={response.id}
                  style={styles.responseCard}
                  onPress={() => toggleResponse(response.id)}
                >
                  <ThemedText style={styles.responseText}>{response.text}</ThemedText>
                  <View style={[styles.checkbox, selectedResponses.includes(response.id) && styles.checkboxChecked]}>
                    {selectedResponses.includes(response.id) && <Ionicons name="checkmark" size={18} color="#FFF" />}
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <ThemedText style={styles.confirmButtonText}>CONFIRM</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginBottom: 30,
  },
  responseContainer: {
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  responseCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#6A5ACD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6A5ACD',
  },
  confirmButton: {
    backgroundColor: '#8F8BFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});