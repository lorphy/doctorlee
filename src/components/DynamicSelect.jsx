import React, {useState} from 'react';
import {Select, Input, Button, Space} from 'antd';

const DynamicSelect = ({initialOptions,onChange, style})=>{
	const [options,setOptions] = useState(initialOptions);
	const [inputValue,setInputValue] = useState('');
	const optionsArray=[];

	const handleInputChange = (e)=>{
		setInputValue(e.target.value);
	};
	const handleSelectChange = (value)=>{
		setInputValue(value);
		onChange(value);
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

	};

	return(
		<Space direction="vertical" style={style}>
			<Select
				style={{width:150}}
				placeholder="请选择"
				options={optionsArray}
				onChange={handleSelectChange}
				allowClear
			/>
			<Space>
				<Input
					placeholder='其他颜色'
					onChange={handleInputChange}
					style={{width:150}}
				/>
				<Button type="primary" onClick={handleAddOption}>
					增加颜色
				</Button>
			</Space>
			
		</Space>
	);
}

export default DynamicSelect;