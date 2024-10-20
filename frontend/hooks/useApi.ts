// app/hooks/useApi.ts
import { usePatient } from '../patientContext';

export const useApi = () => {
  const { patientId } = usePatient();

  const fetchWithPatientId = async (url: string, options: RequestInit = {}) => {
    if (!patientId) {
      throw new Error('Patient ID is not set');
    }

    const headers = new Headers(options.headers);
    headers.append('X-Patient-ID', patientId);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return response.json();
  };

  return { fetchWithPatientId };
};