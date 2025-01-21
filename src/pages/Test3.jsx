import React from 'react';
import { useNavigate } from 'react-router-dom';

const Test3 = () => {
  const navigate = useNavigate(); // 使用 navigate 来控制跳转

  const handleClick = (event) => {
    const value = event.target.value; // 获取按钮的 value

    console.log('Test3 console log:', value); // 在Test3中打印数据

    // 跳转到 Test4 页面，并通过 state 传递数据
    navigate('/test4', { state: { message: { Test3: value } } });
  };

  return (
    <div>
      <h2>Test3 Component</h2>
      <button className='Test3' onClick={handleClick} value='apple'>
        Send Data to Test4
      </button>
    </div>
  );
};

export default Test3;
