import React,{useState} from 'react';
import { Card, Descriptions, Tag, Button, Space, message,Modal} from 'antd';
import { PrinterOutlined, EditOutlined } from '@ant-design/icons';
import { FormData } from '../types/FormData';
import axios from './axios';

interface FormSummaryProps {
  data: FormData;
  onEdit: (step: number) => void;
  onSubmit: ()=>void;
}

const FormSummary: React.FC<FormSummaryProps> = ({ data, onEdit, onSubmit }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messageApi,contextHolder] = message.useMessage();

  const getBMI = () => {
    const { weight, height } = data.lifestyleInfo;
    if (weight && height) {
      const bmi = weight / Math.pow(height / 100, 2);
      return bmi.toFixed(1);
    }
    return 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">信息检查确认</h2>
        <p className="text-gray-600">请在提交前再次检查您填写的信息</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card 
          title="个人信息" 
          extra={<Button type="link" icon={<EditOutlined />} onClick={() => onEdit(0)}>修改</Button>}
        >
          <Descriptions column={{ xs: 1, sm: 2, md: 2 }} bordered>
            <Descriptions.Item label="用户名">{data.personalInfo.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{data.personalInfo.gender==='male'?'男':'女'}</Descriptions.Item>
            <Descriptions.Item label="Age">{data.personalInfo.age}</Descriptions.Item>
            <Descriptions.Item label="Email">{data.personalInfo.email}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card 
          title="问诊信息填表信息" 
          extra={<Button type="link" icon={<EditOutlined />} onClick={() => onEdit(1)}>修改</Button>}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="当前症状">{data.medicalHistory.currentSymptoms}</Descriptions.Item>
            <Descriptions.Item label="初次发病时间及原因">{data.medicalHistory.symptomDuration}</Descriptions.Item>
            <Descriptions.Item label="既往病史、基础史、手术史">{data.medicalHistory.illHistory.toString()}</Descriptions.Item>
            <Descriptions.Item label="肿瘤病史">{data.medicalHistory.tumorHistory}</Descriptions.Item>
            <Descriptions.Item label="其它手术">{data.medicalHistory.operationHistory.toString()}</Descriptions.Item>
            <Descriptions.Item label="冷热情况">{data.medicalHistory.coldOrHot}</Descriptions.Item>
            <Descriptions.Item label="冷热程度">{data.medicalHistory.coldOrHotExtent}</Descriptions.Item>
            <Descriptions.Item label="有无出汗？">{data.medicalHistory.sweatOrNot}</Descriptions.Item>
            <Descriptions.Item label="汗出时间？">{data.medicalHistory.sweatTime}</Descriptions.Item>
            <Descriptions.Item label="汗后怕风？">{data.medicalHistory.sweatFearWind}</Descriptions.Item>
            <Descriptions.Item label="出汗量？">{data.medicalHistory.sweatAmount}</Descriptions.Item>
            <Descriptions.Item label="鼻塞？">{data.medicalHistory.noseStuff}</Descriptions.Item>
            <Descriptions.Item label="打呼噜？">{data.medicalHistory.snorkling}</Descriptions.Item>
            <Descriptions.Item label="呼吸暂停？">{data.medicalHistory.inhalePalse}</Descriptions.Item>
            <Descriptions.Item label="疼痛部位:">{data.medicalHistory.painPart.toString()}</Descriptions.Item>
            <Descriptions.Item label="疼痛程度">{data.medicalHistory.painExtent}</Descriptions.Item>
            <Descriptions.Item label="痛感类型:">{data.medicalHistory.painKind.toString()}</Descriptions.Item>
            <Descriptions.Item label="胸肋痛:">{data.medicalHistory.chestPain}</Descriptions.Item>
            <Descriptions.Item label="腹痛:">{data.medicalHistory.bellyPain}</Descriptions.Item>
            <Descriptions.Item label="肚子凉:">{data.medicalHistory.bellyCold}</Descriptions.Item>
            <Descriptions.Item label="小腹重坠:">{data.medicalHistory.bellyHeavy}</Descriptions.Item>
            <Descriptions.Item label="腰膝怕冷:">{data.medicalHistory.waistFearCold}</Descriptions.Item>
            <Descriptions.Item label="腰膝酸软:">{data.medicalHistory.waistSour}</Descriptions.Item>
            <Descriptions.Item label="腰沉:">{data.medicalHistory.waistHeavy}</Descriptions.Item>
            <Descriptions.Item label="胃部感觉:">{data.medicalHistory.stomachFeeling.toString()}</Descriptions.Item>
            <Descriptions.Item label="食欲:">{data.medicalHistory.appetite}</Descriptions.Item>
            <Descriptions.Item label="饮食量:">{data.medicalHistory.intake}</Descriptions.Item>
            <Descriptions.Item label="饮食喜好:">{data.medicalHistory.intakePreference}</Descriptions.Item>
            <Descriptions.Item label="口中感觉:">{data.medicalHistory.mouthFeeling}</Descriptions.Item>
            <Descriptions.Item label="饮水情况:">{data.medicalHistory.drinking}</Descriptions.Item>
            <Descriptions.Item label="咽喉情况:">{data.medicalHistory.throat}</Descriptions.Item>
            <Descriptions.Item label="痰的情况:">{data.medicalHistory.phlegm.toString()}</Descriptions.Item>
            <Descriptions.Item label="每日大便次数:">{data.medicalHistory.shitTimes}</Descriptions.Item>
            <Descriptions.Item label="形状:">{data.medicalHistory.shitShape}</Descriptions.Item>
            <Descriptions.Item label="颜色:">{data.medicalHistory.shitColor}</Descriptions.Item>
            <Descriptions.Item label="小便:">{data.medicalHistory.peeMoreOrLess}</Descriptions.Item>
            <Descriptions.Item label="伴随症状:">{data.medicalHistory.peeSymptom.toString()}</Descriptions.Item>
            <Descriptions.Item label="夜尿次数:">{data.medicalHistory.peeTimes}</Descriptions.Item>
            <Descriptions.Item label="小便颜色:">{data.medicalHistory.peeColor}</Descriptions.Item>
            <Descriptions.Item label="心慌:">{data.medicalHistory.panic}</Descriptions.Item>
            <Descriptions.Item label="胸闷气短:">{data.medicalHistory.shortBreath}</Descriptions.Item>
            <Descriptions.Item label="眼干涩:">{data.medicalHistory.dryEye}</Descriptions.Item>
            <Descriptions.Item label="脾气暴躁易怒:">{data.medicalHistory.easyAngry}</Descriptions.Item>
            <Descriptions.Item label="最近有无感冒:">{data.medicalHistory.recentCold}</Descriptions.Item>

            {data.personalInfo.gender==='female'? (
            <>  
            <Descriptions.Item label="月经周期:">{data.medicalHistory.menstruationPeriod}</Descriptions.Item>
            <Descriptions.Item label="血块:">{data.medicalHistory.menstruationBlock}</Descriptions.Item>
            <Descriptions.Item label="经量:">{data.medicalHistory.menstruationAmount}</Descriptions.Item>
            <Descriptions.Item label="痛经:">{data.medicalHistory.menstruationPain}</Descriptions.Item>
            <Descriptions.Item label="白带:">{data.medicalHistory.menstruationWhiteBelt}</Descriptions.Item>
            <Descriptions.Item label="白带颜色:">{data.medicalHistory.menstruationWhiteBeltColor}</Descriptions.Item>
            <Descriptions.Item label="气味:">{data.medicalHistory.menstruationOdor}</Descriptions.Item>
            <Descriptions.Item label="颜色:">{data.medicalHistory.menstruationColor.toString()}</Descriptions.Item>
            </>):(<></>)}
          </Descriptions>
        </Card>

        <Card 
          title="生活习惯" 
          extra={<Button type="link" icon={<EditOutlined />} onClick={() => onEdit(2)}>修改</Button>}
        >
          <Descriptions column={{ xs: 1, sm: 2, md: 2 }} bordered>
            <Descriptions.Item label="职业">{data.lifestyleInfo.occupation}</Descriptions.Item>
            <Descriptions.Item label="体重">{data.lifestyleInfo.weight} kg</Descriptions.Item>
            <Descriptions.Item label="身高">{data.lifestyleInfo.height} cm</Descriptions.Item>
            <Descriptions.Item label="BMI">{getBMI()}</Descriptions.Item>
            <Descriptions.Item label="平均睡眠时长">{data.lifestyleInfo.sleepHours} hours/night</Descriptions.Item>
            <Descriptions.Item label="吸烟习惯">{data.lifestyleInfo.smokingStatus}</Descriptions.Item>
            <Descriptions.Item label="饮酒习惯">{data.lifestyleInfo.drinkingStatus}</Descriptions.Item>
            <Descriptions.Item label="健身习惯">{data.lifestyleInfo.exerciseFrequency}</Descriptions.Item>
            <Descriptions.Item label="怕冷程度">{data.lifestyleInfo.fearCold}/10</Descriptions.Item>
            <Descriptions.Item label="怕热程度">{data.lifestyleInfo.fearHot}/10</Descriptions.Item>
            <Descriptions.Item label="怕风程度">{data.lifestyleInfo.fearWind}/10</Descriptions.Item>
            <Descriptions.Item label="睡眠质量">{data.lifestyleInfo.sleepQuality.toString()}</Descriptions.Item>
            <Descriptions.Item label="其他需要补充情况">{data.lifestyleInfo.additionalNotes}</Descriptions.Item>
          </Descriptions>
        </Card>

        <div className="text-center pt-6">
          <Space size="middle">
            <Button 
              type="default" 
              icon={<PrinterOutlined />} 
              size="large"
              onClick={() => window.print()}
            >
              打印报告
            </Button>
            <Button 
              type="primary" 
              size="large"
              name="update"
              onClick={(e)=>onSubmit('update')}
              className="px-8"
            >
              更新
            </Button>
            <Button 
              type="primary" 
              size="large"
              name="submit"
              onClick={(e)=>onSubmit('submit')}
              className="px-8"
            >
              创建新记录
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default FormSummary;