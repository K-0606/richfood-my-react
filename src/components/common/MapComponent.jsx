import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { CircularProgress, Box } from "@mui/material";

// 定義 libraries 來避免重複創建
const libraries = ["places"];

const containerStyle = {
  width: "150%",
  height: "400px",
  marginLeft: "400px",
  transform: "translateX(-300px)",
  // marginTop: "-350px",
};

// 預設地址
const defaultAddress = "408台中市南屯區文心路二段436號";

// 設置紅色標記圖標
const redMarkerIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Google 提供的紅色圖標
};

function MapComponent({ adressStorePage }) {
  const [location, setLocation] = useState(null); // 初始位置設為 null
  const [address, setAddress] = useState(adressStorePage); // 預設地址
  const [placeDetails, setPlaceDetails] = useState(null); // 用來儲存商業資訊
  const [showInfoWindow, setShowInfoWindow] = useState(false); // 控制 InfoWindow 顯示
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // 控制 API 是否加載
  const [loading, setLoading] = useState(true); // 控制地圖是否顯示，加載狀態

  // 更新地址
  useEffect(() => {
    setAddress(adressStorePage);
  }, [adressStorePage]);

  // 顯示地址和處理定位
  useEffect(() => {
    console.log("Received Address:", address); // 確保傳入的地址正確
    if (googleMapsLoaded && address) {
      const geocoder = new window.google.maps.Geocoder();

      // 呼叫 geocode 方法
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setLocation({ lat: lat(), lng: lng() });
          console.log("Geocoding Result:", { lat: lat(), lng: lng() });

          // 嘗試使用 Places API 搜索商業資訊
          const placeId = results[0].place_id;
          fetchPlaceDetails(placeId);
        } else {
          setPlaceDetails(null); // 清空結果
        }
      });
    }
  }, [googleMapsLoaded, address]); // 當 googleMapsLoaded 或地址變更時觸發

  // 使用 Places API 獲取更多位置資訊
  const fetchPlaceDetails = (placeId) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails(place); // 更新商業資訊
        setShowInfoWindow(true); // 自動顯示 InfoWindow
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: "400px" }}
        >
          <CircularProgress />
        </Box>
      )}

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
              <InfoWindow
                position={location}
                onCloseClick={() => setShowInfoWindow(false)}
              >
                <div
                  style={{
                    width: "300px",
                    fontFamily: "Arial, sans-serif",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    {placeDetails.name}
                  </h4>
                  <p>
                    <strong>地址:</strong> {placeDetails.formatted_address}
                  </p>
                  {placeDetails.formatted_phone_number && (
                    <p>
                      <strong>電話:</strong>{" "}
                      {placeDetails.formatted_phone_number}
                    </p>
                  )}
                  {placeDetails.website && (
                    <p>
                      <strong>網站:</strong>
                      <a
                        href={placeDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007BFF", textDecoration: "none" }}
                      >
                        訪問網站
                      </a>
                    </p>
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
