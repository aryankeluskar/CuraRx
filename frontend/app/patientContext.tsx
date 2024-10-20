// app/patientContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PatientContextType = {
  patientId: string | null;
  setPatientId: (id: string) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patientId, setPatientId] = useState<string | null>(null);

  return (
    <PatientContext.Provider value={{ patientId, setPatientId }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};