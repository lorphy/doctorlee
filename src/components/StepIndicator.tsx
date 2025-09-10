import React from 'react';
import { Steps } from 'antd';
import { 
  UserOutlined, 
  MedicineBoxOutlined, 
  HeartOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

interface StepIndicatorProps {
  current: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ current }) => {
  const steps = [
    {
      title: '个人基础信息',
      icon: <UserOutlined />,
      description: ''
    },
    {
      title: '问诊信息',
      icon: <MedicineBoxOutlined />,
      description: ''
    },
    {
      title: '日常习惯',
      icon: <HeartOutlined />,
      description: ''
    }
  ];

  return (
    <div className="mb-8">
      <Steps 
        current={current} 
        items={steps}
        className="max-w-4xl mx-auto"
      />
    </div>
  );
};

export default StepIndicator;