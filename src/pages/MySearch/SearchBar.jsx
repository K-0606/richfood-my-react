import React, { useState, useEffect } from 'react';

const getPriceLabel = (range) => {
  switch (range) {
    case 'below100':
      return '100$以下';
    case '100to300':
      return '100$~300$';
    case '300to500':
      return '300$~500$';
    case '500to1000':
      return '500$~1000$';
    case '1000to2000':
      return '1000$~2000$';
    case 'above2000':
      return '2000$以上';
    default:
      return '';
  }
};

const SearchBar = ({ onSearchChange, searchParams }) => {
  const [safeSearchParams, setSafeSearchParams] = useState({
    type: searchParams?.type || [],
    region: searchParams?.region || '',
    price: searchParams?.price || [],
    popular: searchParams?.popular || false,
  });

  useEffect(() => {
    setSafeSearchParams(searchParams);
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    onSearchChange(key, value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="輸入地區"
          value={safeSearchParams.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
        />
      </div>
      <div>
        <label>餐廳類型：</label>
        <select
          multiple
          value={safeSearchParams.type}
          onChange={(e) => handleFilterChange('type', Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="日式">日式</option>
          <option value="台式">台式</option>
          <option value="義式">義式</option>
        </select>
      </div>
      <div>
        <label>價格範圍：</label>
        <select
          multiple
          value={safeSearchParams.price}
          onChange={(e) => handleFilterChange('price', Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="below100">100$以下</option>
          <option value="100to300">100$~300$</option>
          <option value="300to500">300$~500$</option>
          <option value="500to1000">500$~1000$</option>
          <option value="1000to2000">1000$~2000$</option>
          <option value="above2000">2000$以上</option>
        </select>
      </div>
      <div>
        <label>熱門：</label>
        <input
          type="checkbox"
          checked={safeSearchParams.popular}
          onChange={(e) => handleFilterChange('popular', e.target.checked)}
        />
      </div>
    </div>
  );
};

export default SearchBar;