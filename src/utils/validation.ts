import { FormData } from '../types/FormData';

export const validatePersonalInfo = (data: FormData['personalInfo']): string[] => {
  const errors: string[] = [];
  
  if (!data.name.trim()) errors.push('用户名必须填');
  if (data.age <= 0 || data.age>=150) errors.push('请填写有效年龄');
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('请填写邮箱');
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
  if (data.coldOrHot===undefined||!data.coldOrHot.trim()) {
    errors.push('冷热情况为必填项');
  }
  if (data.coldOrHotExtent===undefined||!data.coldOrHotExtent.trim()) {
    errors.push('冷热程度为必填项');
  }
  if (data.sweatOrNot===undefined||!data.sweatOrNot.trim()) {
    errors.push('有无出汗为必填项');
  }
  if (data.noseStuff===undefined||!data.noseStuff.trim()) {
    errors.push('有无鼻塞必填项');
  }
  if (data.snorkling===undefined||!data.snorkling.trim()) {
    errors.push('打呼噜必填项');
  }
  if (data.inhalePalse===undefined||!data.inhalePalse.trim()) {
    errors.push('呼吸暂停必填项');
  }
  if (data.chestPain===undefined||!data.chestPain.trim()) {
    errors.push('胸肋痛必填项');
  }
  if (data.bellyPain===undefined||!data.bellyPain.trim()) {
    errors.push('腹痛必填项');
  }
  if (data.bellyCold===undefined||!data.bellyCold.trim()) {
    errors.push('肚子凉必填项');
  }
  if (data.bellyHeavy===undefined||!data.bellyHeavy.trim()) {
    errors.push('小腹重坠必填项');
  }


  return errors;
};

export const validateLifestyleInfo = (data: FormData['lifestyleInfo']): string[] => {
  const errors: string[] = [];
  
  if (data.sleepQuality.length===0) {
    errors.push('睡眠质量为必填项');
  }
  if (!data.fearCold) {
    errors.push('怕冷程度为必填项');
  }
  if(!data.fearWind){
    errors.push('怕风程度为必填项');
  }
  if(!data.fearHot){
    errors.push('怕热程度为必填项');
  }

  return errors;
};

export const validateCurrentStep = (step: number, formData: FormData): string[] => {
  switch (step) {
    case 0:
      return validatePersonalInfo(formData.personalInfo);
    case 1:
      return validateMedicalHistory(formData.medicalHistory);
    case 2:
      return validateLifestyleInfo(formData.lifestyleInfo);

    default:
      return [];
  }
};