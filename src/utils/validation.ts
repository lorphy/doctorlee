import { FormData } from '../types/FormData';

export const validatePersonalInfo = (data: FormData['personalInfo']): string[] => {
  const errors: string[] = [];
  
  if (!data.name.trim()) errors.push('用户名必须填');
  if (data.age <= 0 || data.age>=150) errors.push('请填写有效年龄');
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('邮箱必填');
  }
  
  return errors;
};

export const validateMedicalHistory = (data: FormData['medicalHistory']): string[] => {
  const errors: string[] = [];
  
  if (!data.currentSymptoms.trim()) {
    errors.push('调理目标及主诉为必填项');
  }
  if (!data.symptomDuration.trim()) {
    errors.push('症状产生原因和时间为必填项');
  }
  if(data.illHistory.length===0){
    errors.push('既往病史、基础史、手术史为必填项');
  }

  return errors;
};

// export const validateConsultationInfo = (data: FormData['consultationInfo']): string[] => {
//   const errors: string[] = [];
  
//   if (!data.preferredDate) errors.push('Preferred date is required');
//   if (!data.preferredTime) errors.push('Preferred time is required');
  
//   return errors;
// };

export const validateCurrentStep = (step: number, formData: FormData): string[] => {
  switch (step) {
    case 0:
      return validatePersonalInfo(formData.personalInfo);
    case 1:
      return validateMedicalHistory(formData.medicalHistory);
    case 2:
      return []; // Lifestyle info is mostly optional
    // case 3:
    //   return validateConsultationInfo(formData.consultationInfo);
    default:
      return [];
  }
};