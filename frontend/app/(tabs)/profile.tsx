import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

const ProfileSection = () => (
  <View style={styles.section}>
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={60} color="#FFFFFF" />
      </View>
      <View style={styles.profileInfo}>
        <ThemedText style={styles.name}>Ada Bruin</ThemedText>
        <ThemedText style={styles.details}>Age: 28 • Female</ThemedText>
      </View>
    </View>
  </View>
);

const AdherenceSummary = () => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>Adherence Summary</ThemedText>
    <View style={styles.adherenceStats}>
      <View style={styles.adherenceItem}>
        <ThemedText style={styles.adherenceValue}>15</ThemedText>
        <ThemedText style={styles.adherenceLabel}>Current Streak</ThemedText>
      </View>
      <View style={styles.adherenceItem}>
        <ThemedText style={styles.adherenceValue}>87%</ThemedText>
        <ThemedText style={styles.adherenceLabel}>Adherence Rate</ThemedText>
      </View>
      <View style={styles.adherenceItem}>
        <ThemedText style={styles.adherenceValue}>45</ThemedText>
        <ThemedText style={styles.adherenceLabel}>Completed Days</ThemedText>
      </View>
    </View>
    <BarChart
      data={{
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data: [3, 2, 3, 3, 2, 3, 3]
        }]
      }}
      width={300}
      height={200}
      yAxisLabel=""
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(162, 155, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
    <ThemedText style={styles.chartLabel}>Weekly Medication Taken</ThemedText>
  </View>
);

const HealthOverview = () => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>Health Overview</ThemedText>
    <View style={styles.healthStats}>
      <View style={styles.healthItem}>
        <ThemedText style={styles.healthValue}>120/80</ThemedText>
        <ThemedText style={styles.healthLabel}>Blood Pressure</ThemedText>
      </View>
      <View style={styles.healthItem}>
        <ThemedText style={styles.healthValue}>72</ThemedText>
        <ThemedText style={styles.healthLabel}>Heart Rate (bpm)</ThemedText>
      </View>
    </View>
    <LineChart
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [65, 68, 66, 70, 69, 72]
        }]
      }}
      width={300}
      height={200}
      yAxisLabel=""
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(162, 155, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
    <ThemedText style={styles.chartLabel}>6-Month Heart Rate Trend</ThemedText>
  </View>
);

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={['#A29BFF', '#EFEFFF']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ProfileSection />
          <AdherenceSummary />
          <HealthOverview />
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
  scrollContent: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#A29BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  adherenceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  adherenceItem: {
    alignItems: 'center',
  },
  adherenceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A29BFF',
  },
  adherenceLabel: {
    fontSize: 14,
    color: '#666',
  },
  healthStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  healthItem: {
    alignItems: 'center',
  },
  healthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A29BFF',
  },
  healthLabel: {
    fontSize: 14,
    color: '#666',
  },
  chartLabel: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});