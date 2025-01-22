import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { TextField, Button, CircularProgress, Box } from '@mui/material';

// 定義 libraries 來避免重複創建
const libraries = ['places'];

const containerStyle = {
  width: '50%',
  height: '400px',
};

// 預設地址
const defaultAddress = '408台中市南屯區文心路一段436號';

// 設置紅色標記圖標
const redMarkerIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Google 提供的紅色圖標
//   scaledSize: new window.google.maps.Size(40, 40), // 設置圖標大小
};

function MapComponent() {
  const [location, setLocation] = useState(null); // 初始位置設為 null
  const [address, setAddress] = useState(defaultAddress); // 預設地址
  const [error, setError] = useState('');
  const [placeDetails, setPlaceDetails] = useState(null); // 用來儲存商業資訊
  const [showInfoWindow, setShowInfoWindow] = useState(false); // 控制 InfoWindow 顯示
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // 控制 API 是否加載
  const [loading, setLoading] = useState(true); // 控制地圖是否顯示，加載狀態

  // 確保 Google Maps 加載完成後進行操作
  useEffect(() => {
    if (googleMapsLoaded && address) {
      const geocoder = new window.google.maps.Geocoder();

      // 呼叫 geocode 方法
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setLocation({ lat: lat(), lng: lng() });
          setError('');

          // 嘗試使用 Places API 搜索商業資訊
          const placeId = results[0].place_id;
          fetchPlaceDetails(placeId);
        } else {
          setError('地址無效，無法找到位置');
          setPlaceDetails(null); // 清空結果
        }
      });
    }
  }, [googleMapsLoaded, address]); // 當 googleMapsLoaded 或地址變更時觸發

  // 使用 Places API 獲取更多位置資訊
  const fetchPlaceDetails = (placeId) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails(place); // 更新商業資訊
        setShowInfoWindow(true); // 自動顯示 InfoWindow

        // 打印出 placeDetails 的所有屬性
      console.log('placeDetails:', place);  // 打印整個 place 物件
      console.log('placeDetails 所有屬性:');
      console.log(JSON.stringify(place, null, 2));  // 格式化並打印物件的所有屬性
      
      } else {
        setPlaceDetails(null); // 如果沒有商業信息，清空
      }
    });
  };

  // 確保 Google Maps 加載完成
  const onGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true); // 設置標誌，表示已經加載完成
    setLoading(false); // 地圖加載完成後隱藏 Loading 圖示
  };
  

  return (
    <div>
      {/* 顯示 Loading 畫面，直到 Google Maps 加載完成 */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '400px' }}>
          <CircularProgress />
        </Box>
      )}

      {/* 禁用地址欄輸入，只顯示預設的地址 */}
      {/* <TextField
        label="輸入地址"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)} // 用戶可改變地址
        disabled={true} // 禁止用戶修改預設地址
      /> */}
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => setAddress(address)} // 按鈕不需要觸發任何事件，只是為了符合設計
        style={{ marginTop: '10px' }}
      >
        查找位置
      </Button> */}

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <LoadScript
        googleMapsApiKey="AIzaSyBECL-R3_7fScccBTBJtA3cMCOa86F9rfg"
        libraries={libraries}
        onLoad={onGoogleMapsLoad} // 確保 Google Maps 加載完成
      >
        {/* 只有在 googleMapsLoaded 為 true 時才顯示地圖 */}
        {!loading && googleMapsLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location || { lat: 24.1477, lng: 120.6736 }} // 如果位置未設置，使用默認值
            zoom={18}
          >
            {/* 地圖上的標記，使用紅色圖標 */}
            {location && (
              <Marker
                position={location}
                onClick={() => setShowInfoWindow(true)}
                icon={redMarkerIcon} // 設置紅色圖標
              />
            )}

            {/* 顯示商業資訊的 InfoWindow */}
            {showInfoWindow && placeDetails && (
              <InfoWindow position={location} onCloseClick={() => setShowInfoWindow(false)}>
                <div style={{ width: '300px' }}>
                    
                  <h4>{placeDetails.name}</h4>
                  <p><strong>地址:</strong> {placeDetails.formatted_address}</p>
                  {placeDetails.formatted_phone_number && (
                    <p><strong>電話:</strong> {placeDetails.formatted_phone_number}</p>
                  )}
                  {placeDetails.website && (
                    <p><strong>網站:</strong> <a href={placeDetails.website} target="_blank" rel="noopener noreferrer">訪問網站</a></p>
                  )}
                  {placeDetails.photos && placeDetails.photos.length > 0 && (
                    <div>
                      <strong>圖片:</strong>
                      <img
                        src={placeDetails.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}
                        alt={placeDetails.name}
                        style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                      />
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
}

export default MapComponent;
