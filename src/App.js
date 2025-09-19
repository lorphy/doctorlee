import React, { useState } from 'react';
import { Layout, Button, Space, Menu} from 'antd';
import {CheckOutlined, BankOutlined,DatabaseOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import InfoForm from './components/InfoForm.tsx';
import PatientList from './components/PatientList.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = () =>(<div className="max-w-4xl mx-auto"><h1>
                      欢迎使用
                   </h1></div>
                  );
const NotFound = () => <h2>404 Not Found</h2>;

type MenuItem = Required<MenuProps>['items'][number];
const items:MenuItem[] = [
  {
    label:(<a href="/">首页</a>),
    icon:<BankOutlined />
  },
  {
    label:(<a href="/list">查看患者信息</a>),
    key:'list',
    icon:<DatabaseOutlined />
  },
  {
    label:(<a href="/info">填表</a>),
    key:'info',
    icon:<DatabaseOutlined />
  }

];

const { Header,Footer } = Layout;


function App() {
  return (
    <Layout className="min-h-screen text-gray-600">
      <Header className="text-gray-600 shadow-sm border-b" style={{backgroundColor:"#aaaaaa"}}>
        <div className="max-w-6xl mx-auto px-4 ">
          <h1 className="text-xl font-semibold text-gray-200 leading-16">
            李大夫的患者信息收集系统
          </h1>
        </div>
      </Header>
      <Menu mode="horizontal" items={items}/>
        <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello-world" element={<Home />} />
        <Route path="/list" element={<PatientList />} />
        <Route path="/info" element={<InfoForm />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
        </Router>

      <Footer className="text-center bg-white border-t">
        <div className="text-gray-600">
          信息采集单 © 2025 - 安全 & 保密
        </div>
      </Footer>
    </Layout>
  );
}

export default App;