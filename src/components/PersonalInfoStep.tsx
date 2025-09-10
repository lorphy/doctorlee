import React from 'react';
import { Form, Input, Select, InputNumber, Row, Col } from 'antd';
import { PersonalInfo } from '../types/FormData';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onDataChange: (data: Partial<PersonalInfo>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onDataChange }) => {
  const handleFieldChange = (field: keyof PersonalInfo, value: any) => {
    onDataChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">个人信息</h2>
      </div>

      <Form layout="vertical" className="max-w-4xl mx-auto">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="姓名" 
              required
              rules={[{ required: true, message: '姓名' }]}
            >
              <Input
                size="large"
                placeholder="王小二"
                value={data.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="性别" 
              required
              rules={[{ required: true }]}
            >
              <Select
                size="large"
                placeholder="选择性别"
                value={data.gender}
                onChange={(value) => handleFieldChange('gender', value)}
              >
                <Select.Option value="male">男</Select.Option>
                <Select.Option value="female">女</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="年龄" 
              required
              rules={[{ required: true, message: '0-150' }]}
            >
              <InputNumber
                size="large"
                style={{ width: '100%' }}
                placeholder="30"
                min={0}
                max={120}
                value={data.age}
                onChange={(value) => handleFieldChange('age', value || 0)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Email"
              rules={[{ type: 'email', message: '邮箱' }]}
            >
              <Input
                size="large"
                placeholder="abc@abc.com"
                value={data.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PersonalInfoStep;