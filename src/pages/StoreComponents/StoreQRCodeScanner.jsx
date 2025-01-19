import React, { useState } from 'react';
//import { QrReader } from 'react-qr-reader';  // 正確導入 QrReader
  // 引入 react-qr-reader

const StoreQRCodeScanner = () => {
    //const QrReader = require('react-qr-reader').default;  // 使用 require 載入

  const [scanResult, setScanResult] = useState(''); // 用來顯示掃描結果

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);  // 儲存掃描的 QR code
    }
  };

  const handleError = (err) => {
    console.error('掃描錯誤:', err);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>掃描餐券 QR Code</h3>
      <QrReader
        delay={300}
        style={{ width: '100%', height: '400px' }}  // 這邊設置了掃描區域大小
        onError={handleError}
        onScan={handleScan}
      />
      <p>掃描結果：{scanResult}</p>
    </div>
  );
};

export default StoreQRCodeScanner;
