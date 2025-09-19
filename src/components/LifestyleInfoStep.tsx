import React from 'react';
import { Form, Select, InputNumber, Slider, Row, Col, Input, Checkbox} from 'antd';
import { LifestyleInfo } from '../types/FormData';

interface LifestyleInfoStepProps {
  data: LifestyleInfo;
  onDataChange: (data: Partial<LifestyleInfo>) => void;

}

const plainOptions = ['正常', '失眠', '多梦','不易入睡','睡后易醒','惊醒','醒后困乏','头昏','头沉','头晕'];

const LifestyleInfoStep: React.FC<LifestyleInfoStepProps> = ({ data, onDataChange }) => {
  const handleFieldChange = (field: keyof LifestyleInfo, value: any) => {
    onDataChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">生活习惯</h2>
        <p className="text-gray-600">了解日常生活习惯，有助诊断病情</p>
      </div>

      <Form layout="vertical" className="max-w-4xl mx-auto">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="职业">
              <Input
                size="large"
                placeholder="医生"
                value={data.occupation}
                onChange={(e) => handleFieldChange('occupation', e.target.value)}
              />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="吸烟">
              <Select
                size="large"
                placeholder="选择吸烟频率"
                value={data.smokingStatus}
                onChange={(value) => handleFieldChange('smokingStatus', value)}
              >
                <Select.Option value="从不">从不</Select.Option>
                <Select.Option value="偶尔">偶尔</Select.Option>
                <Select.Option value="常年">常年</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="喝酒">
              <Select
                size="large"
                placeholder="请选择"
                value={data.drinkingStatus}
                onChange={(value) => handleFieldChange('drinkingStatus', value)}
              >
                <Select.Option value="从不">从不</Select.Option>
                <Select.Option value="偶尔">偶尔</Select.Option>
                <Select.Option value="常年">常年</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="运动">
              <Select
                size="large"
                placeholder="请选择"
                value={data.exerciseFrequency}
                onChange={(value) => handleFieldChange('exerciseFrequency', value)}
              >
                <Select.Option value="从不">从不</Select.Option>
                <Select.Option value="偶尔">偶尔</Select.Option>
                <Select.Option value="每周">每周</Select.Option>
                <Select.Option value="每天">每天</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="体重 (kg)">
              <InputNumber
                size="large"
                style={{ width: '100%' }}
                placeholder="体重kg"
                min={20}
                max={300}
                value={data.weight}
                onChange={(value) => handleFieldChange('weight', value || 0)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="身高 (cm)">
              <InputNumber
                size="large"
                style={{ width: '100%' }}
                placeholder="身高cm"
                min={50}
                max={250}
                value={data.height}
                onChange={(value) => handleFieldChange('height', value || 0)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="睡眠时长">
              <InputNumber
                size="large"
                style={{ width: '100%' }}
                placeholder="平均睡眠时长"
                min={0}
                max={24}
                step={0.5}
                value={data.sleepHours}
                onChange={(value) => handleFieldChange('sleepHours', value || 0)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="睡眠质量">
              <Checkbox.Group options={plainOptions} defaultValue={data.sleepQuality} onChange={(value) => handleFieldChange('sleepQuality', value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label={`怕冷程度: ${data.fearCold || 1}/10`}>
              <Slider
                min={1}
                max={10}
                value={data.fearCold}
                onChange={(value) => handleFieldChange('fearCold', value)}
                marks={{
                  1: '不怕',
                  5: '中等',
                  10: '特别怕'
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={1}>
          </Col>
          <Col xs={24} md={11}>
            <Form.Item label={`怕热程度: ${data.fearHot  || 1}/10`}>
              <Slider
                min={1}
                max={10}
                value={data.fearHot}
                onChange={(value) => handleFieldChange('fearHot', value)}
                marks={{
                  1: '不怕',
                  5: '中等',
                  10: '特别怕'
                }}
              />
            </Form.Item>
          </Col>
          </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label={`怕风程度: ${data.fearWind || 1}/10`}>
              <Slider
                min={1}
                max={10}
                value={data.fearWind}
                onChange={(value) => handleFieldChange('fearWind', value)}
                marks={{
                  1: '不怕',
                  5: '中等',
                  10: '特别怕'
                }}
              />
            </Form.Item>
          </Col>

        </Row>
        <Form.Item label="其他需要补充情况">
          <Input.TextArea
            rows={4}
            placeholder="心脏病犯病时，心口肋骨下稍微有痛感，有堵的感觉，心脏犯病后主要痛感在两腮、耳朵及下巴部位疼，现在能干一些基本的家务，烧水做饭，精神状态超好，气色也很好声音底气很足."
            value={data.additionalNotes}
            onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
          />
        </Form.Item>

      </Form>
    </div>
  );
};

export default LifestyleInfoStep;