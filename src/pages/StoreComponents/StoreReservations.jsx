import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

// 假資料
// const reservations = [
  // { date: "2025-01-15", time: "中午", peopleCount: 2 },
  // { date: "2025-01-16", time: "晚上", peopleCount: 4 },
  // { date: "2025-01-17", time: "中午", peopleCount: 6 },
  // { date: "2025-01-18", time: "晚上", peopleCount: 3 },
  // { date: "2025-01-19", time: "中午", peopleCount: 2 },
  // { date: "2025-01-20", time: "晚上", peopleCount: 5 },
  // { date: "2025-01-21", time: "中午", peopleCount: 8 },
  // { date: "2025-01-22", time: "晚上", peopleCount: 4 },
  // { date: "2025-01-23", time: "中午", peopleCount: 3 },
  // { date: "2025-01-24", time: "晚上", peopleCount: 2 },
  // { date: "2025-01-25", time: "中午", peopleCount: 4 },
  // { date: "2025-01-26", time: "晚上", peopleCount: 6 },
  // { date: "2025-01-27", time: "中午", peopleCount: 5 },
  // { date: "2025-01-28", time: "晚上", peopleCount: 3 },
  // { date: "2025-01-29", time: "中午", peopleCount: 7 },
// ];

const StoreReservations = () => {
  const [reservations,setReservations]=useState([]);
  const [currentPageReservations, setCurrentPageReservations] = useState(1);
  const reservationsPerPage = 10;

  useEffect(()=>{
    const fetchReservations=async ()=>{
      try{
        const response=await fetch('http://localhost:8080/storeReservation/selectAllReservationAsc',
        { 
          method: 'GET',
          credentials: 'include', // 如果需要攜帶憑據（如 Cookies）
          headers: {
            'Content-Type': 'application/json',
          }
      });
        const data=await response.json();
        console.log(data);

        // 映射資料結構
        const formattedData=data.map((item)=>({
          date: item.reservationDate,
          time: item.reservationTime,
          peopleCount: item.numPeople,
        })) 

        setReservations(formattedData);
        console.log(formattedData)
      }catch(error){
        console.error(error);
      }
    }
    fetchReservations();
    

  },[]);



  const handlePageChangeReservations = (page) => {
    setCurrentPageReservations(page);
  };

  const getReservationsForPage = () => {
    const startIndex = (currentPageReservations - 1) * reservationsPerPage;
    return reservations.slice(startIndex, startIndex + reservationsPerPage);
  };

  return (
    <div>
      {getReservationsForPage().map((reservation, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            訂位日期: {reservation.date} {reservation.time} {reservation.peopleCount} 人
          </Typography>
        </Box>
      ))}
      {/* 頁碼控制 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChangeReservations(currentPageReservations - 1)}
          disabled={currentPageReservations === 1}
        >
          上一頁
        </Button>
        <Typography variant="body2" sx={{ mx: 2 }}>
          第 {currentPageReservations} 頁
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handlePageChangeReservations(currentPageReservations + 1)}
          disabled={currentPageReservations * reservationsPerPage >= reservations.length}
        >
          下一頁
        </Button>
      </Box>
    </div>
  );
};

export default StoreReservations;
