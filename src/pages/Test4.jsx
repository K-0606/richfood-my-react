import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

const Test4 = () => {
  const location = useLocation(); // 获取从 Test3 传来的 state 数据
  const [checkedValues, setCheckedValues] = useState({
    apple: false,
    banana: false,
  }); // 用于控制多个 Checkbox 的勾选状态

  useEffect(() => {
    // 检查是否有来自 Test3 的 message 数据
    if (location.state && location.state.message) {
      const receivedValue = location.state.message.Test3; // 获取 Test3 传来的数据

      console.log('Received data in Test4:', receivedValue); // 打印传递的数据

      // 根据传递的值更新勾选状态
      if (receivedValue === 'apple') {
        setCheckedValues((prevState) => ({ ...prevState, apple: true }));
      } else if (receivedValue === 'banana') {
        setCheckedValues((prevState) => ({ ...prevState, banana: true }));
      }
    }
  }, [location]);

  // 处理 Checkbox 状态变化
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h2>Test4 Component</h2>
      <p>Check the console for the data received from Test3.</p>

      {/* Apple Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedValues.apple}
            onChange={handleCheckboxChange}
            name="apple"
          />
        }
        label="Apple"
      />

      {/* Banana Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedValues.banana}
            onChange={handleCheckboxChange}
            name="banana"
          />
        }
        label="Banana"
      />
    </div>
  );
};

export default Test4;
