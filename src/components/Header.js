import React from 'react';
import './Header.css';
import { Button } from 'antd';
import {UserOutlined,FolderOutlined } from '@ant-design/icons';

const Header=()=>{
	return (
		<div className="header">
			<Button>
				<UserOutlined fontSize="large" className="header_icon" />
			</Button>
			<img className="header_logo" src="logo192.png" alt="header"/>
			<Button>
				<FolderOutlined fontSize="large" className="heder_icon" />
			</Button>
		</div>
	);
}

export default Header;