import React, { useState } from 'react';

const RestaurantImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 下一張圖片
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // 如果到達最後一張，回到第一張
  };

  // 上一張圖片
  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length // 如果到達第一張，回到最後一張
    );
  };

  // 跳轉到指定的圖片
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={styles.carouselContainer}>
      {/* 左側箭頭 */}
      <button onClick={goToPrev} style={styles.arrowButtonLeft}>
        &lt;
      </button>

      <div style={styles.imageContainer}>
        {/* 顯示當前圖片 */}
        <img
          src={images[currentIndex]}
          alt={`Restaurant image ${currentIndex + 1}`}
          style={styles.image}
        />
      </div>

      {/* 右側箭頭 */}
      <button onClick={goToNext} style={styles.arrowButtonRight}>
        &gt;
      </button>

      {/* 預覽圖 */}
      <div style={styles.previewContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            style={{
              ...styles.previewImage,
              border: index === currentIndex ? '2px solid #3498db' : 'none', // 當前選中的圖片顯示邊框
            }}
            onClick={() => goToImage(index)} // 點擊預覽圖跳轉
          />
        ))}
      </div>
    </div>
  );
};

// 样式
const styles = {
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    flexDirection: 'column', // 改為垂直方向排布
  },
  arrowButtonLeft: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '30px',
    color: '#333',
    cursor: 'pointer',
    padding: '10px',
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 0.3s ease',
    zIndex: 20, // 保證箭頭顯示在最上層
  },
  arrowButtonRight: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '30px',
    color: '#333',
    cursor: 'pointer',
    padding: '10px',
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 0.3s ease',
    zIndex: 20, // 保證箭頭顯示在最上層
  },
  imageContainer: {
    width: '80%',
    height: '400px', // 統一圖片的高度
    overflow: 'hidden',
    textAlign: 'center',
    zIndex: 10, // 保證圖片顯示在預覽圖的下方
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 保證圖片不會拉伸變形
  },
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',  // 增加與圖片間的距離
    marginBottom: '40px',  // 增加與其他組件的距離
    position: 'relative',
    zIndex: 30, // 確保預覽圖容器位於最上層
  },
  previewImage: {
    width: '60px',
    height: '60px',
    margin: '0 5px',
    borderRadius: '8px',
    cursor: 'pointer',
    objectFit: 'cover',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 給預覽圖加點陰影
    zIndex: 40, // 確保每一個預覽圖位於最上層
  },
};

export default RestaurantImageCarousel;
