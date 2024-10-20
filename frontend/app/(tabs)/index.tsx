import React, { useState, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { usePatient } from '../patientContext';


type Medication = {
  id: string;
  name: string;
  time: string;
  dose: string;
  taken: boolean;
};

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'cura';
  status: 'sent' | 'received' | 'loading';
};

const initialMedications: Medication[] = [
  { id: '1', name: 'Acetaminophen', time: '8:00 AM', dose: '325mg', taken: false },
  { id: '2', name: 'Zoloft', time: '9:00 AM', dose: '50mg', taken: false },
  { id: '3', name: 'Benadryl', time: '4:00 PM', dose: '25mg', taken: false },
];

const weekDays = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const monthDates = [14, 15, 16, 17, 18, 19, 20];

const LoadingDots = () => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.loadingText, { opacity }]}>...</Animated.Text>
  );
};

export default function HomeScreen() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'INSIGHTS'>('SCHEDULE');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const toggleMedication = (id: string) => {
    setMedications(meds =>
      meds.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const medicationCounter = useMemo(() => {
    const takenCount = medications.filter(med => med.taken).length;
    return `${takenCount}/${medications.length}`;
  }, [medications]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    if (inputMessage.toLowerCase() === '/clear') {
      setChatMessages([]);
      setInputMessage('');
      return;
    }

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      status: 'sent',
    };

    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');

    // Simulate Cura's response
    setTimeout(() => {
      const loadingMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: '',
        sender: 'cura',
        status: 'loading',
      };
      setChatMessages(prevMessages => [...prevMessages, loadingMessage]);

      // TODO: CALL API

      // Simulate response delay
      setTimeout(() => {
        setChatMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === loadingMessage.id
              ? { ...msg, text: 'Message Received', status: 'received' }
              : msg
          )
        );
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatMessages]);

  return (
    <LinearGradient
      colors={['#A29BFF', '#EFEFFF']}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A29BFF" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={styles.header}>
            <ThemedText style={styles.title}>Good morning, Ada!</ThemedText>
            <View style={styles.nextDoseContainer}>
              <ThemedText style={styles.nextDoseLabel}>Next Dose:</ThemedText>
              <ThemedText style={styles.nextDoseTime}>4:00 PM</ThemedText>
            </View>
          </View>

          <View style={styles.calendarContainer}>
            <View style={styles.monthYearContainer}>
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
              <ThemedText style={styles.monthYear}>October 2024</ThemedText>
            </View>
            <View style={styles.daysContainer}>
              {weekDays.map((day, index) => (
                <View key={index} style={styles.dayColumn}>
                  <ThemedText style={styles.dayText}>{day}</ThemedText>
                  <View 
                    style={[
                      styles.dateContainer, 
                      index === 1 && styles.selectedDateContainer
                    ]}
                  >
                    <ThemedText 
                      style={[
                        styles.dateText, 
                        index === 1 && styles.selectedDateText
                      ]}
                    >
                      {monthDates[index]}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'SCHEDULE' && styles.activeTab]}
              onPress={() => setActiveTab('SCHEDULE')}
            >
              <ThemedText style={activeTab === 'SCHEDULE' ? styles.activeTabText : styles.tabText}>
                SCHEDULE
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'INSIGHTS' && styles.activeTab]}
              onPress={() => setActiveTab('INSIGHTS')}
            >
              <ThemedText style={activeTab === 'INSIGHTS' ? styles.activeTabText : styles.tabText}>
                INSIGHTS
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {activeTab === 'SCHEDULE' ? (
              <ScrollView contentContainerStyle={styles.medicationList}>
                <View style={styles.counterContainer}>
                  <ThemedText style={styles.todayText}>TODAY</ThemedText>
                  <ThemedText style={styles.counterText}>{medicationCounter}</ThemedText>
                </View>
                {medications.map(med => (
                  <TouchableOpacity 
                    key={med.id} 
                    style={styles.medicationCard}
                    onPress={() => toggleMedication(med.id)}
                  >
                    <View style={styles.medicationInfo}>
                      <ThemedText style={styles.medicationName}>{med.name}</ThemedText>
                      <ThemedText style={styles.medicationDetails}>{med.dose} | {med.time}</ThemedText>
                    </View>
                    <View style={[styles.checkbox, med.taken && styles.checkboxChecked]}>
                      {med.taken && <Ionicons name="checkmark" size={18} color="#FFF" />}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.deepDiveContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  contentContainerStyle={styles.chatContainer}
                >
                  {chatMessages.map((message) => (
                    <View
                      key={message.id}
                      style={[
                        styles.messageRow,
                        message.sender === 'user' ? styles.userMessageRow : styles.curaMessageRow,
                      ]}
                    >
                      {message.sender === 'cura' && (
                        <View style={[styles.avatar, styles.curaAvatar]} />
                      )}
                      <View
                        style={[
                          styles.messageContainer,
                          message.sender === 'user' ? styles.userMessage : styles.curaMessage,
                        ]}
                      >
                        {message.status === 'loading' ? (
                          <LoadingDots />
                        ) : (
                          <ThemedText style={styles.messageText}>{message.text}</ThemedText>
                        )}
                      </View>
                      {message.sender === 'user' && (
                        <View style={[styles.avatar, styles.userAvatar]} />
                      )}
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Ask Cura..."
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="arrow-up" size={24} color="#A29BFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  nextDoseContainer: {
    flexDirection: 'column',
  },
  nextDoseLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextDoseTime: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  calendarContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#FFFFFF',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#7B7F9E',
    marginBottom: 5,
  },
  dateContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    backgroundColor: '#6A5ACD',
    borderRadius: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#7B7F9E',
  },
  selectedDateText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#7B7F9E',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#6A5ACD',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f7f7fc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  medicationList: {
    padding: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  todayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6A5ACD',
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#7B7F9E',
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
  deepDiveContainer: {
    flex: 1,
    backgroundColor: '#f7f7fc',
  },
  chatContainer: {
    padding: 15,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  curaMessageRow: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '70%',
  },
  userMessage: {
    backgroundColor: '#E9E9FD',
    marginLeft: 10,
  },
  curaMessage: {
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4
  },
  userAvatar: {
    backgroundColor: '#CCCCCC',
  },
  curaAvatar: {
    backgroundColor: '#A29BFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFFF',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#EFEFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFFF',
    borderRadius: 20,
  },
});