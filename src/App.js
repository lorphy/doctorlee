import React, { useState } from 'react';
import { Layout, Card, Button, Space, message, Menu} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, BankOutlined,DatabaseOutlined} from '@ant-design/icons';
import StepIndicator from './components/StepIndicator.tsx';
import PersonalInfoStep from './components/PersonalInfoStep.tsx';
import MedicalHistoryStep from './components/MedicalHistoryStep.tsx';
import LifestyleInfoStep from './components/LifestyleInfoStep.tsx';
import PatientList from './components/PatientList.tsx';
import FormSummary from './components/FormSummary.tsx';
import { useFormData } from './hooks/useFormData.ts';
import { validateCurrentStep } from './utils/validation.ts';
import 'antd/dist/reset.css';
import axios from './components/axios.js';
import type {MenuProps} from 'antd';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = () => <h2>Home</h2>;
const list = () => <h2>List</h2>;
const NotFound = () => <h2>404 Not Found</h2>;

type MenuItem = Required<MenuProps>['items'][number];
const items:MenuItem[] = [
  {
    label:(<a href="/">首页</a>),
    key:'home',
    icon:<BankOutlined />
  },
  {
    label:(<a href="/list">列出患者清单</a>),
    key:'list',
    icon:<DatabaseOutlined />
  },
];

const { Header, Content, Footer } = Layout;

function App() {


  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messageApi,contextHolder] = message.useMessage();
  const {
    formData,
    updatePersonalInfo,
    updateMedicalHistory,
    updateLifestyleInfo,
    updateConsultationInfo,
    clearFormData
  } = useFormData();

  const steps = [
    {
      component: (
        <PersonalInfoStep 
          data={formData.personalInfo} 
          onDataChange={updatePersonalInfo} 
        />
      )
    },
    {
      component: (
        <MedicalHistoryStep 
          data={formData} 
          onDataChange={updateMedicalHistory} 
        />
      )
    },
    {
      component: (
        <LifestyleInfoStep 
          data={formData.lifestyleInfo} 
          onDataChange={updateLifestyleInfo} 
        />
      )
    },
    {
      component: (
        <FormSummary 
          data={formData} 
          onEdit={setCurrentStep}
          onSubmit={handleSubmit}
        />
      )
    }
  ];

  const handleNext = () => {
    const errors = validateCurrentStep(currentStep, formData);
    
    if (errors.length > 0) {
      messageApi.error(errors[0]);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      messageApi.success('步骤'+ (currentStep+1)+ '完成');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function handleSubmit(e) {
    const allErrors: string[] = [];
    
    // Validate all steps
    for (let i = 0; i < 3; i++) {
      const stepErrors = validateCurrentStep(i, formData);
      allErrors.push(...stepErrors);
    }

    if (allErrors.length > 0) {
      messageApi.error('请填写所有必填字段');
      return;
    }
    
    setIsSubmitting(true);
    
    let action_target = '';
    e==='submit'?action_target='/answer':action_target='/update_answer';
    alert(action_target);
    try {
      // Simulate API call
      //await new Promise(resolve => setTimeout(resolve, 2000));
      


      const req = await axios.post(action_target,formData);
      
      messageApi.success('您的信息已提交成功!');
      clearFormData();
      setCurrentStep(0);
    } catch (error) {
      messageApi.error('提交失败. 请重试.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout className="min-h-screen text-gray-600">
      <Menu mode="horizontal" items={items}/>
      <Header className="text-gray-600 shadow-sm border-b" style={{backgroundColor:"#aaaaaa"}}>
        <div className="max-w-6xl mx-auto px-4 ">
          <h1 className="text-xl font-semibold text-gray-200 leading-16">
            信息采集单
          </h1>
        </div>
      </Header>
      

      <Content className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {currentStep < 3 && <StepIndicator current={currentStep} />}

          
          <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
            <div className="min-h-[600px]">

              {steps[currentStep].component}
              {contextHolder}
            </div>
            
            {currentStep < 3 && (
              <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                <Button
                  size="large"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  icon={<ArrowLeftOutlined />}
                >
                  上一步
                </Button>
                
                <Button
                  type="primary"
                  size="large"
                  onClick={handleNext}
                  icon={currentStep === 2 ? <CheckOutlined /> : <ArrowRightOutlined />}
                >
                  {currentStep === 2 ? '检查' : '下一步'}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </Content>

      <Footer className="text-center bg-white border-t">
        <div className="text-gray-600">
          信息采集单 © 2025 - 安全 & 保密
        </div>
      </Footer>
    </Layout>
  );
}

export default App;