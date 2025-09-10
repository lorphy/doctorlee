import React,{useState,useEffect,useRef} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Tooltip, Typography,Checkbox } from 'antd';
import axios from './axios';

const { Option } = Select;

const QuestionForm: Form = () => {
  const [form] = Form.useForm();
  const [txt,setTxt] = useState({});

  useEffect(()=>{
    async function fetchData(){
      try{
      const req = await axios.get("/dating/cards");
      
      setTxt(req.data[0]);
      
      }catch(error){
        console.log("ddd");
      }
    }
   fetchData();
  },[txt]);

  return (
    <>
    
  <Form
    name="complex-form"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
  >
  
    
	<Form.Item label="用户名">

	<Form.Item
          name="username"
          noStyle
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input style={{ width: 160,align:"left"}} placeholder="Please input" />
    </Form.Item>
    </Form.Item>

    <Form.Item label="test"><Input  style={{ width: 160,align:"left"}} value={txt.name} />
    </Form.Item>
    <Form.Item label="调理目标及主诉（最明显、最痛苦的主要症状及伴随症状（最想解决的问题））">

      <Space>

        
        <Form.Item
          name="chest_pain"
          noStyle
          rules={[{ required: true, message: '胸肋疼痛' }]}
        >
          <Checkbox >胸肋疼痛</Checkbox>
        </Form.Item>
         <Form.Item
          name="abdomen_pain"
          noStyle
          rules={[{ required: true, message: '腹痛' }]}
        >
          <Checkbox >腹痛</Checkbox>
        </Form.Item>
         <Form.Item
          name="abdomen_cold"
          noStyle
          rules={[{ required: true, message: '肚子凉' }]}
        >
          <Checkbox >肚子凉</Checkbox>
        </Form.Item>
         <Form.Item
          name="abdomen_heavy"
          noStyle
          rules={[{ required: true, message: '小腹重坠' }]}
        >
          <Checkbox >小腹重坠</Checkbox>
        </Form.Item>
      </Space>

    </Form.Item>
    <Form.Item label="Address">
      <Space.Compact>
        <Form.Item
          name={['address', 'province']}
          noStyle
          rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select placeholder="Select province">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['address', 'street']}
          noStyle
          rules={[{ required: true, message: 'Street is required' }]}
        >
          <Input style={{ width: '50%' }} placeholder="Input street" />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
    <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
      <Form.Item
        name="year"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <Input placeholder="Input birth year" />
      </Form.Item>
      <Form.Item
        name="month"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
      >
        <Input placeholder="Input birth month" />
      </Form.Item>
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
  );
};

export default QuestionForm;