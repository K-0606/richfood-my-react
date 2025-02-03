import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mockRestaurants } from './mockData'; // 模擬的餐廳數據
import RestaurantList from './RestaurantList';
import SearchBar from './SearchBar';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const MySearchField = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get('region') || '';
  const type = searchParams.get('type') || '';
  const price = searchParams.get('price') ? searchParams.get('price').split(',') : [];
  const popular = searchParams.get('popular') === 'true'; // 這裡需要處理為布林值

  const [filters, setFilters] = useState({
    region: region,
    type: type,
    price: price,
    popular: popular,
  });

  // 使用 useEffect 來監聽 filters 改變後再更新 URL
  useEffect(() => {
    const params = new URLSearchParams(filters);
    navigate(`/search?${params.toString()}`); // 使用 navigate 更新 URL
  }, [filters, navigate]);

  // 當 location 改變時，確保 filters 會跟著更新
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      region: region,
      type: type,
    }));
  }, [region, type]);

  // 更新篩選條件
  const handleSearchChange = (key, value) => {
    setFilters((prevParams) => {
      return { ...prevParams, [key]: value };
    });
  };

  // 檢查餐廳價格是否符合篩選條件
  const isPriceInRange = (price, range) => {
    switch (range) {
      case 'below100':
        return price < 100;
      case '100to300':
        return price >= 100 && price <= 300;
      case '300to500':
        return price > 300 && price <= 500;
      case '500to1000':
        return price > 500 && price <= 1000;
      case '1000to2000':
        return price > 1000 && price <= 2000;
      case 'above2000':
        return price > 2000;
      default:
        return false;
    }
  };

  // 過濾資料
  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesType = filters.type.length > 0 ? filters.type.includes(restaurant.type) : true;
    const matchesRegion = filters.region ? restaurant.region === filters.region : true;
    const matchesPrice = filters.price.length
      ? filters.price.some(range => isPriceInRange(restaurant.price, range))
      : true;
    const matchesPopular = filters.popular ? restaurant.rating >= 4 : true;

    return matchesType && matchesRegion && matchesPrice && matchesPopular;
  });

  return (
    <div>
      <Header />
      <SearchBar onSearchChange={handleSearchChange} searchParams={filters} />
      <RestaurantList restaurants={filteredRestaurants} />
      <Footer />
    </div>
  );
};

export default MySearchField;
