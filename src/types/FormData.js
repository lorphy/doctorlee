export interface PersonalInfo {
  name: string;
  gender: 'male' | 'female';
  age: number;
  email: string;
}

export interface MedicalHistory {
  currentSymptoms: string;
  symptomDuration: string;
  previousTreatments: string;

  tumorHistory:string;
  illHistory:[];
  operationHistory:string;

  coldOrHot:'怕冷' | '怕热' |'手冷'|'足冷';
  coldOrHotExtent:'很少' | '一般' |'中等'| '非常';
  sweatOrNot:'有'|'无';
  sweatExtent:'这几年基本不出汗'|'正常出汗'|'动辄出汗';
  sweatTime:'早上'|'傍晚'|'夜晚';
  sweatFearWind:'是'|'否';
  sweatAmount:'很少'|'一般'|'很多';

  snorkling:'多年'|'最近有'|'无';
  noseStuff:'有'|'无';
  inhalePalse:'有'|'无';

  painPart:[];
  painExtent:'轻度'|'中度'|'重度'|'严重';
  painKind:[];

  chestPain:'是'|'否';
  bellyPain:'是'|'否';
  bellyCold:'是'|'否';
  bellyHeavy:'是'|'否';
  waistFearCold:'是'|'否';
  waistSour:'是'|'否';
  waistHeavy:'是'|'否';
  stomachFeeling:[];
  appetite:'差'|'一般'|'很好';
  intake:'很少'|'一般'|'中等'|'很多';
  intakePreference:'喜冷'|'喜热'|'偏甜'|'偏咸'|'偏辣';

  mouthFeeling:'口干'|'口苦'|'口咸'|'口淡'|'仅晨起口苦'|'仅睡前口干';
  drinking:'喜饮'|'不喜饮'|'喜冷饮'|'喜热饮';
  throat:'咽干'|'咽痛';
  phlegm:[];

  shitTimes:number;
  shitShape:'正常'|'不成形'|'偏干'|'偏稀'|'先干后稀';
  shitColor:string;
  peeMoreOrLess:'多'|'少';
  peeSymptom:[];
  peeTimes:number;
  peeColor:string;
  
  panic:'有'|'无';
  shortBreath:'有'|'无';
  dryEye:'有'|'无';
  easyAngry:'有'|'无';
  recentCold:'有'|'无';

  menstruationPeriod:'正常'|'提前'|'延后';
  menstruationBlock:'有'|'无';
  menstruationAmount:'正常'|'多'|'少';
  menstruationPain:'有'|'无';
  menstruationWhiteBelt:'有'|'无'|'多'|'少';
  menstruationWhiteBeltColor:'黄'|'白'|'赤';
  menstruationOdor:'正常'|'腥'|'臭';
  menstruationColor:string; 
}

export interface LifestyleInfo {
  occupation: string;
  smokingStatus: '从不' | '偶尔' | '经常';
  drinkingStatus: '从不' | '偶尔' | '经常';
  exerciseFrequency: '从不' | '偶尔' | '每周' | '每天';
  sleepHours: number;
  fearCold: number;
  weight: number;
  height: number;
  fearHot: number;
  fearWind: number;
  additionalNotes: string;
  sleepQuality:[];
}

export interface FormData {
  personalInfo: PersonalInfo;
  medicalHistory: MedicalHistory;
  lifestyleInfo: LifestyleInfo;
}
