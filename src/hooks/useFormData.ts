import { useState, useEffect } from 'react';
import { FormData, PersonalInfo, MedicalHistory, LifestyleInfo, ConsultationInfo } from '../types/FormData';

const defaultPersonalInfo: PersonalInfo = {
  name: '',
  gender: 'male',
  age: 0,
  email: '',
};

const defaultMedicalHistory: MedicalHistory = {
  currentSymptoms: '',
  symptomDuration: '',

  tumorHistory:'',
  illHistory:[],
  operationHistory:'',

  painPart:[],
  painKind:[],

  stomachFeeling:[],
  phlegm:[],

  shitTimes:0,
  shitColor:'',
  peeSymptom:[],
  peeTimes:0,
  peeColor:'',

  menstruationColor:''
};

const defaultLifestyleInfo: LifestyleInfo = {
  occupation: '医生',
  smokingStatus: '从不',
  drinkingStatus: '从不',
  exerciseFrequency: '每周',
  sleepHours: 8,
  fearCold: 5,
  fearHot:5,
  fearWind:5,
  weight: 60,
  height: 170,
  additionalNotes:'',
  sleepQuality:[]
};

// const defaultConsultationInfo: ConsultationInfo = {
//   consultationType: 'initial',
//   preferredDate: '',
//   preferredTime: '',
//   consultationMethod: 'inPerson',
//   urgencyLevel: 'medium',
//   additionalNotes: ''
// };

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    personalInfo: defaultPersonalInfo,
    medicalHistory: defaultMedicalHistory,
    lifestyleInfo: defaultLifestyleInfo,
    //consultationInfo: defaultConsultationInfo
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('consultationFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('consultationFormData', JSON.stringify(formData));
  }, [formData]);

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  };

  const updateMedicalHistory = (data: Partial<MedicalHistory>) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, ...data }
    }));
  };

  const updateLifestyleInfo = (data: Partial<LifestyleInfo>) => {
    setFormData(prev => ({
      ...prev,
      lifestyleInfo: { ...prev.lifestyleInfo, ...data }
    }));
  };

  // const updateConsultationInfo = (data: Partial<ConsultationInfo>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     consultationInfo: { ...prev.consultationInfo, ...data }
  //   }));
  // };

  const clearFormData = () => {
    setFormData({
      personalInfo: defaultPersonalInfo,
      medicalHistory: defaultMedicalHistory,
      lifestyleInfo: defaultLifestyleInfo,
      });
    localStorage.removeItem('consultationFormData');
  };

  return {
    formData,
    updatePersonalInfo,
    updateMedicalHistory,
    updateLifestyleInfo,
    //updateConsultationInfo,
    clearFormData
  };
};