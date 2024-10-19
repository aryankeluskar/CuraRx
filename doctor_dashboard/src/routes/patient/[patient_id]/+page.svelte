<script>
    import { page } from '$app/stores';
  
    // Get the patient_id from the URL
    const patient_id = $page.params.patient_id;
  
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

