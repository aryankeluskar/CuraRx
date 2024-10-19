<script>
    import { page } from '$app/stores';
  
    // Get the patient_id from the URL
    const patient_id = $page.params.patient_id;

    let patientData = 
      {
  "name": "John Doe",
  "uuid": "987e6543-a21b-12c3-b456-426614174000",
  "sex": "M",
  "success_percentage": 85,
  "preexisting_conditions": "Hypertension, Type 2 Diabetes",
  "last_checkin": "2024-10-18T14:30:00",
  "last_set_of_notes": "Patient has shown improved adherence to Metformin, blood sugar levels have stabilized.",
  "health_level": 7,
  "medication_schedule": [
    {
      "drugName": "Metformin",
      "drugNickname": "Met",
      "drugUUID": "123e4567-e89b-12d3-a456-426614174000",
      "start_date": "2023-01-01",
      "end_date": "2023-12-31",
      "dosage": "500mg",
      "times": {
        "monday": ["14:00", "16:00"],
        "tuesday": null,
        "wednesday": ["15:00"],
        "thursday": null,
        "friday": ["14:00", "16:00"],
        "saturday": null,
        "sunday": null
      }
    },
    {
      "drugName": "Vitamin D",
      "drugNickname": "Sunshine",
      "drugUUID": "123e4567-e89b-12d3-a456-426614174001",
      "start_date": "2023-03-01",
      "end_date": "2023-09-30",
      "dosage": "1000 IU",
      "times": {
        "monday": ["09:00"],
        "tuesday": null,
        "wednesday": null,
        "thursday": ["09:00"],
        "friday": null,
        "saturday": null,
        "sunday": null
      }
    },
    {
      "drugName": "Aspirin",
      "drugNickname": "Heart Helper",
      "drugUUID": "123e4567-e89b-12d3-a456-426614174002",
      "start_date": "2023-06-01",
      "end_date": null,
      "dosage": "81mg",
      "times": {
        "monday": null,
        "tuesday": ["08:00"],
        "wednesday": null,
        "thursday": ["08:00"],
        "friday": null,
        "saturday": ["08:00"],
        "sunday": null
      }
    }
  ]
};
    
  
    // You can now use this id to fetch patient data, display it, etc.
    /**
     * @param {any} patient_id
     */
    function getPatientData(patient_id) {
      // Fetch patient data from the server
      console.log('Fetching patient data for patient ID:', patient_id);
      return 123;
    }




  </script>
  
  <h1>Patient ID: {patient_id}</h1>


  
  <!-- Example where you might fetch patient details -->
  <!--
  {#await fetchPatientData(patient_id) then patient}
    <p>Name: {patient.name}</p>
    <p>Age: {patient.age}</p>
  {:catch error}
    <p>Error loading patient data: {error.message}</p>
  {/await}
  -->

