import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRestaurants } from "./mockData"; // 模擬的餐廳數據
import RestaurantList from "./RestaurantList";
import SearchBar from "./SearchBar";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const MySearchField = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get("region") || "";
  const type = searchParams.get("type") || "";
  const price = searchParams.get("price") ? searchParams.get("price").split(",") : [];
  const popular = searchParams.get("popular") === "true";

  const [filters, setFilters] = useState({
    region: region,
    type: type,
    price: price,
    popular: popular,
  });

  useEffect(() => {
    const params = new URLSearchParams(filters);
    navigate(`/search?${params.toString()}`);
  }, [filters, navigate]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      region: region,
      type: type,
    }));
  }, [region, type]);

  const handleSearchChange = (key, value) => {
    setFilters((prevParams) => {
      return { ...prevParams, [key]: value };
    });
  };

  const isPriceInRange = (price, range) => {
    switch (range) {
      case "below100":
        return price < 100;
      case "100to300":
        return price >= 100 && price <= 300;
      case "300to500":
        return price > 300 && price <= 500;
      case "500to1000":
        return price > 500 && price <= 1000;
      case "1000to2000":
        return price > 1000 && price <= 2000;
      case "above2000":
        return price > 2000;
      default:
        return false;
    }
  };

  // 模糊查詢函數
  const fuzzyMatch = (target, query) => {
    if (!query) return true;
    const normalizedTarget = target.replace(/[台臺]/g, "台").toLowerCase(); // 處理台、臺的模糊匹配
    const normalizedQuery = query.replace(/[台臺]/g, "台").toLowerCase(); // 查詢的關鍵字處理
    const regex = new RegExp(normalizedQuery, "i"); // 不區分大小寫進行匹配
    return regex.test(normalizedTarget);
  };

  const { mockRestaurants, loading } = useRestaurants();

  // 當 mockRestaurants 還沒有資料時，避免進行過濾
  const filteredRestaurants =
    loading || !mockRestaurants.length
      ? [] // 資料還未加載或是無資料，則顯示空列表
      : mockRestaurants.filter((restaurant) => {
          const matchesType =
            filters.type.length > 0
              ? restaurant.categories.some((cat) => filters.type.includes(cat.name))
              : true;

          const matchesRegion =
            filters.region ? fuzzyMatch(restaurant.country, filters.region) : true;

          const matchesPrice =
            filters.price.length
              ? filters.price.some((range) => isPriceInRange(restaurant.average, range))
              : true;

          const matchesPopular = filters.popular ? restaurant.score >= 4 : true;

          return matchesType && matchesRegion && matchesPrice && matchesPopular;
        });

  return (
    <div>
      <Header />
      <SearchBar onSearchChange={handleSearchChange} searchParams={filters} />
      {loading ? (
        <div>Loading...</div> // 如果資料加載中，顯示 Loading
      ) : (
        <RestaurantList restaurants={filteredRestaurants} /> // 資料加載完成後顯示餐廳列表
      )}
      <Footer />
    </div>
  );
};

export default MySearchField;
