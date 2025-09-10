import React from 'react';
import { Form, Select, DatePicker, TimePicker, Input, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { ConsultationInfo } from '../types/FormData';

interface ConsultationInfoStepProps {
  data: ConsultationInfo;
  onDataChange: (data: Partial<ConsultationInfo>) => void;
}

const ConsultationInfoStep: React.FC<ConsultationInfoStepProps> = ({ data, onDataChange }) => {
  const handleFieldChange = (field: keyof ConsultationInfo, value: any) => {
    onDataChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Consultation Details</h2>
        <p className="text-gray-600">Set your appointment preferences and additional information</p>
      </div>

      <Form layout="vertical" className="max-w-4xl mx-auto">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Consultation Type" 
              required
              rules={[{ required: true, message: 'Please select consultation type' }]}
            >
              <Select
                size="large"
                placeholder="Select consultation type"
                value={data.consultationType}
                onChange={(value) => handleFieldChange('consultationType', value)}
              >
                <Select.Option value="initial">Initial Consultation</Select.Option>
                <Select.Option value="followup">Follow-up Visit</Select.Option>
                <Select.Option value="emergency">Emergency Consultation</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Consultation Method" 
              required
              rules={[{ required: true, message: 'Please select consultation method' }]}
            >
              <Select
                size="large"
                placeholder="Select consultation method"
                value={data.consultationMethod}
                onChange={(value) => handleFieldChange('consultationMethod', value)}
              >
                <Select.Option value="inPerson">In-Person Visit</Select.Option>
                <Select.Option value="video">Video Consultation</Select.Option>
                <Select.Option value="phone">Phone Consultation</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Preferred Date"
              required
              rules={[{ required: true, message: 'Please select preferred date' }]}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder="Select preferred date"
                value={data.preferredDate ? dayjs(data.preferredDate) : null}
                onChange={(date) => handleFieldChange('preferredDate', date?.format('YYYY-MM-DD') || '')}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Preferred Time"
              required
              rules={[{ required: true, message: 'Please select preferred time' }]}
            >
              <TimePicker
                size="large"
                style={{ width: '100%' }}
                placeholder="Select preferred time"
                format="HH:mm"
                value={data.preferredTime ? dayjs(data.preferredTime, 'HH:mm') : null}
                onChange={(time) => handleFieldChange('preferredTime', time?.format('HH:mm') || '')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label="Urgency Level" 
          required
          rules={[{ required: true, message: 'Please select urgency level' }]}
        >
          <Select
            size="large"
            placeholder="Select urgency level"
            value={data.urgencyLevel}
            onChange={(value) => handleFieldChange('urgencyLevel', value)}
          >
            <Select.Option value="low">Low - Routine checkup or non-urgent concern</Select.Option>
            <Select.Option value="medium">Medium - Concerning symptoms that need attention</Select.Option>
            <Select.Option value="high">High - Urgent medical attention required</Select.Option>
          </Select>
        </Form.Item>


      </Form>
    </div>
  );
};

export default ConsultationInfoStep;