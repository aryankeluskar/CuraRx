<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let patient_id;
  let patientData = null;
  let error = null;

  // Retrieve patient_id directly from the route using page store
  $: patient_id = $page.params.patient_id;

  onMount(async () => {
    try {
      if (patient_id) {
        console.log(patient_id);
        const response = await fetch(`https://cura-rx.vercel.app/patients/${patient_id}`);
        if (!response.ok) throw new Error('Failed to fetch patient data');

        const data = await response.json();
        patientData = data.data[0];

        // Handle data formatting anomalies
        patientData.preexisting_conditions = patientData.preexisting_conditions.replace(/,\s+/g, ', ');
        patientData.last_checkin = new Date(patientData.last_checkin).toLocaleString();
      } else {
        error = 'No patient ID provided in the URL';
      }
    } catch (err) {
      error = err.message;
    }
  });

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  function getMedicationsForDay(day) {
    if (!patientData) return [];
    return patientData.medication_schedule.filter(med => 
      med.times[day.toLowerCase()] && med.times[day.toLowerCase()].length > 0
    );
  }

  function formatTime(time) {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
</script>

<div class="patient-dashboard">
  {#if error}
    <p>{error}</p>
  {:else if patientData}
    <div class="patient-header">
      <h1>{patientData.name} (ID: {patient_id})</h1>
      <p><strong>UUID:</strong> {patientData.id}</p>
      <p><strong>Gender:</strong> {patientData.sex === 'M' ? 'Male' : 'Female'}</p>
      <p><strong>Health Level:</strong> {patientData.health_level}/10</p>
      <p><strong>Last Check-In:</strong> {patientData.last_checkin}</p>
    </div>

    <div class="patient-bento">
      <div class="bento-box">
        <h2>Success Rate</h2>
        <div class="speedometer">
          <div class="speedometer-arc">
            <div class="speedometer-fill" style="--percentage: {patientData.success_percentage}"></div>
          </div>
          <div class="speedometer-value">{patientData.success_percentage}%</div>
        </div>
      </div>

      <div class="bento-box">
        <h2>Preexisting Conditions</h2>
        <p>{patientData.preexisting_conditions}</p>
      </div>

      <div class="bento-box">
        <h2>Last Notes</h2>
        <p>{patientData.last_notes}</p>
      </div>

      <div class="medication-calendar">
        <h2>Weekly Medication Schedule</h2>
        <div class="calendar-grid">
          {#each weekDays as day}
            <div class="calendar-day">
              <h3>{day}</h3>
              {#each getMedicationsForDay(day) as med}
                <div class="medication-pill" style="--pill-color: {med.drugName === 'Metformin' ? '#bae6fd' : med.drugName === 'Vitamin D' ? '#fef3c7' : '#ddd6fe'}">
                  <strong>{med.drugName}</strong>
                  <span class="dosage">({med.dosage})</span>
                  <div class="medication-time">
                    {#each med.times[day.toLowerCase()] as time}
                      <span>{formatTime(time)}</span>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <p>Loading patient data...</p>
  {/if}
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .patient-dashboard {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
  }

  .patient-header {
    background: linear-gradient(135deg, #2c5282, #2b6cb0);
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .bento-box {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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
</style>