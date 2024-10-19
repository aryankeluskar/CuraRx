import React, { useState, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

type Medication = {
  id: string;
  name: string;
  time: string;
  dose: string;
  taken: boolean;
};

const initialMedications: Medication[] = [
  { id: '1', name: 'Acetaminophen', time: '8:00 AM', dose: '325mg', taken: false },
  { id: '2', name: 'Acetaminophen', time: '9:00 AM', dose: '325mg', taken: false },
  { id: '3', name: 'Acetaminophen', time: '4:00 PM', dose: '325mg', taken: false },
];

const weekDays = ['M', 'T', 'T', 'W', 'Th', 'Sa', 'Su'];
const monthDates = [14, 15, 16, 17, 18, 19, 20];

export default function HomeScreen() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'DEEP DIVE'>('SCHEDULE');

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

  return (
    <LinearGradient
      colors={['#A29BFF', '#EFEFFF']}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A29BFF" />
      <SafeAreaView style={styles.safeArea}>
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
            style={[styles.tab, activeTab === 'DEEP DIVE' && styles.activeTab]}
            onPress={() => setActiveTab('DEEP DIVE')}
          >
            <ThemedText style={activeTab === 'DEEP DIVE' ? styles.activeTabText : styles.tabText}>
              DEEP DIVE
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent,
            { backgroundColor: '#f7f7fc' }
          ]}
        >
          {activeTab === 'SCHEDULE' ? (
            <View style={styles.medicationList}>
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
            </View>
          ) : (
            <View style={styles.deepDiveContainer}>
              <ThemedText style={styles.deepDiveText}>Deep Dive Content Here</ThemedText>
            </View>
          )}
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  medicationList: {
    paddingTop: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal:4
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  deepDiveText: {
    fontSize: 18,
    color: '#6A5ACD',
  },
});