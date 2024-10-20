<script lang="ts">
    
    import Sidebar from "../../Sidebar.svelte";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    
    type Patient = {
        name: string;
        riskLevel: 'Low' | 'Medium' | 'High';
        patient_id: string;
    };

    let patients: Patient[] = [];

    onMount(async () => {
        try {
            const response = await fetch('https://cura-rx.vercel.app/patientsOverview');
            const data = await response.json();
            patients = data.patients;
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    });

    function getRiskColor(riskLevel: string): string {
        switch (riskLevel) {
            case "Low": return "#28C840";
            case "Medium": return "#FDBC2C";
            case "High": return "#F35A51";
            default: return "#CCCCCC";
        }
    }

    function navigateToPatient(patientId: number) {
        goto(`/patient/${patientId}`);
    }
</script>
  
  <div class="dashboard-container">
    <Sidebar />
    <div class="patient-dashboard">   
      <div class="patient-header">
        <h1>Patients</h1>
      </div>
      <div class="patient-bento">
        {#each ['Low', 'Medium', 'High'] as riskLevel}
          <div class="zone-bento-box">
            <div class="zone-header" style="background: {getRiskColor(riskLevel)};">
              <h2>{riskLevel} Risk</h2>
            </div>
            {#each patients.filter(patient => patient.riskLevel === riskLevel) as patient}
              <div class="patient-cell">
                <p>{patient.name}</p>
                <button class="transparent-button" on:click={() => navigateToPatient(patient.patient_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    
    </div>
  </div>
  
  <style>
    :global(*) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    .zone-header {
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 16px;
    }
  
    .dashboard-container {
      display: flex;
    }
    .patient-cell {
      background-color: #d1d1d1;
      padding: 1rem;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
  
    .patient-dashboard {
      flex-grow: 1;
      max-width: calc(100% - 250px);
      padding: 2rem;
      background-color: #F7F7FC;
    }
  
    .patient-header {
      background: linear-gradient(125deg,#d0cefb, #bdb9ff);
      padding: 1rem;
      border-radius: 16px;
      margin-bottom: 2rem;
      color: black;
      
    }
  
    .patient-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
  
    .patient-header p {
      opacity: 0.9;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
  
    .patient-bento {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  
    .bento-box {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
     
      
    }
    .zone-bento-box {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      
    }
    .line-graph-bento-box {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      transition: transform 0.2s;
      grid-column: span 2;  /* Make it span all 3 columns */
    }
    .donut-bento-box {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      
      transition: transform 0.2s;
    }
  
    .bento-box:hover {
      transform: translateY(-2px);
    }
  
    .bento-box h2 {
      color: #2d3748;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
  
    /* Speedometer styles */
    .speedometer {
      position: relative;
      width: 200px;
      height: 100px;
      margin: 0 auto;
      overflow: hidden;
    }
  
    .speedometer-arc {
      position: relative;
      width: 200px;
      height: 100px;
      background: #e2e8f0;
      border-radius: 100px 100px 0 0;
    }
  
    .speedometer-fill {
      position: absolute;
      width: 200px;
      height: 100px;
      background: linear-gradient(90deg, #48bb78, #38a169);
      border-radius: 100px 100px 0 0;
      clip-path: polygon(50% 100%, 50% 0, 100% 0, 100% 100%);
      transform-origin: center bottom;
      transform: rotate(calc((var(--percentage) - 50) * 1.8deg));
      transition: transform 0.5s ease-out;
    }
  
    .speedometer-value {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
    }
  
    /* Calendar styles */
    .medication-calendar {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      grid-column: 1 / -1;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
  
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
      margin-top: 1rem;
    }
  
    .calendar-day {
      background: #f7fafc;
      padding: 1rem;
      border-radius: 8px;
      min-height: 120px;
    }
  
    .calendar-day h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #4a5568;
    }
  
    .medication-pill {
      background: var(--pill-color, #ebf4ff);
      padding: 0.5rem;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      transition: transform 0.2s;
    }
  
    .medication-pill:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  
    .medication-pill .dosage {
      color: #4a5568;
      font-size: 0.75rem;
    }
  
    .medication-time {
      color: #4a5568;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
  
    .medication-time span {
      display: inline-block;
      background: rgba(255, 255, 255, 0.5);
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      margin-right: 0.25rem;
    }
  
    .line-graph-container {
      width: 100%;
      height: 400px;  /* Adjust this value to make the graph taller */
    }
  
    .transparent-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: inherit;
    }
  
    .transparent-button:hover {
      opacity: 0.7;
    }
  
    .transparent-button:focus {
      outline: none;
    }
  </style>
  
