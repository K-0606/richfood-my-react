import { useState, useEffect } from "react";

export const useRestaurants = () => {
  const [mockRestaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // 用來追蹤資料是否正在加載

  // 抓取資料的函數
  const fetchData = async () => {
    const url = "http://localhost:8080/restaurants/list";  // 請確保這是正確的 API 地址
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      // 設置餐廳資料並設置 loading 為 false
      setRestaurants(data);
      setLoading(false); // 資料加載完成
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // 即使錯誤，將 loading 設置為 false
    }
  };

  useEffect(() => {
    fetchData(); // 頁面初次加載時呼叫 fetchData
  }, []);

  return { mockRestaurants, loading }; // 返回 mockRestaurants 和 loading
};
