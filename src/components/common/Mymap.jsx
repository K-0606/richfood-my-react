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

// 地圖容器樣式
const containerStyle = {
  width: "40%", // 確保地圖填滿寬度
  height: "400px",
  marginLeft: "180px",
  marginTop: "50px",
};

// 設置紅色標記圖標
const redMarkerIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Google 提供的紅色圖標
};

function MyMap({ restaurantName, latitude, longitude, restaurantImage }) {
  const [location, setLocation] = useState(null); // 初始位置設為 null
  const [placeDetails, setPlaceDetails] = useState(null); // 用來儲存商業資訊
  const [showInfoWindow, setShowInfoWindow] = useState(false); // 控制 InfoWindow 顯示
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // 控制 API 是否加載
  const [loading, setLoading] = useState(true); // 控制地圖是否顯示，加載狀態

  // 取得餐廳的位置信息和商業資訊
  useEffect(() => {
    console.log("Received Latitude and Longitude:", { latitude, longitude });

    if (googleMapsLoaded && latitude && longitude) {
      setLocation({ lat: latitude, lng: longitude });
    }

    if (googleMapsLoaded && restaurantName) {
      searchRestaurantByName(restaurantName); // 根據餐廳名稱進行搜尋
    }
  }, [googleMapsLoaded, latitude, longitude, restaurantName]);

  // 使用 Places API 根據餐廳名稱搜尋餐廳
  const searchRestaurantByName = (name) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    // 搜索餐廳名稱
    const request = {
      query: name,
      fields: [
        "name",
        "geometry",
        "formatted_address",
        "place_id",
        "formatted_phone_number",
        "website",
        "photos",
      ],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const place = results[0]; // 獲取搜尋結果中的第一個商業資訊
        setPlaceDetails(place);
        setLocation(place.geometry.location); // 更新地圖位置
        setShowInfoWindow(true); // 顯示 InfoWindow
      } else {
        setPlaceDetails(null); // 如果沒有結果，清空
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
        {!loading && googleMapsLoaded && location && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location} // 使用從 props 中取得的座標
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
                  {restaurantImage && (
                    <img
                      src={restaurantImage}
                      alt={placeDetails.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
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

export default MyMap;
