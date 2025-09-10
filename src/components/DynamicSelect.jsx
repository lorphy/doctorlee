import React, {useState} from 'react';
import {Select, Input, Button, Space} from 'antd';

const DynamicSelect = ({initialOptions,onChange, style})=>{
	const [options,setOptions] = useState(initialOptions);
	const [inputValue,setInputValue] = useState('');
	const optionsArray=[];

	const handleInputChange = (e)=>{
		setInputValue(e.target.value);
	};
	const handleSelectChange = (e)=>{
		setInputValue(e.value);
	};

	const makeOptions=(list)=>{
		for (var item of list){
			optionsArray.push({label:item,value:item});
		}
		return optionsArray;
	}
	makeOptions(options);

	const handleAddOption = ()=>{
		if (inputValue.trim() === '') return;
		if (options.indexOf(inputValue.trim())!==-1) return;
		const newOption = inputValue.trim();
		setOptions(options.concat(newOption));
		makeOptions(options)
		setInputValue('');

	};

	return(
		<Space direction="vertical" style={style}>
			<Select
				style={{width:200}}
				placeholder="请选择"
				options={optionsArray}
				onChange={handleSelectChange}
				allowClear
			/>
			<Space>
				<Input
					placeholder='其他'
					value={inputValue}
					onChange={handleInputChange}
					style={{width:200}}
				/>
				<Button type="primary" onClick={handleAddOption}>
					添加选项
				</Button>
			</Space>
			
		</Space>
	);
}

export default DynamicSelect;