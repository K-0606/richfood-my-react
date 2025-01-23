import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function BookPage() {
  // State to store each step's selected value
  const [peopleCount, setPeopleCount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [step, setStep] = useState(1); // Track the current step
  const location=useLocation();
  const storeId =location.state?.storeId;

  // Handler functions to update states
  const handlePeopleCountChange = (e) => {
    const value = e.target.value;
    if (value > 0) {
      setPeopleCount(value);
    }
  };
  
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  // Form validation
  const isNextStepDisabled = () => {
    switch (step) {
      case 1: return !peopleCount || peopleCount <= 0; // Disable next if people count is not selected or invalid
      case 2: return !date; // Disable next if date is not selected
      case 3: return !time; // Disable next if time is not selected
      default: return false;
    }
  };
  const handleBook = async (event) => {
    const requestData = {
      storeId: storeId,// 預約按鍵進去後要修改這個編號
      reservationDate:date,
      reservationTime:time,
      numPeople:peopleCount 
      };
    console.log(requestData);
    console.log("bookpage"+storeId);
  
    try {
      const response = await fetch('http://localhost:8080/reservation/addseat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        credentials: 'include', // 確保攜帶 Cookie
        body: JSON.stringify(requestData),
      });

        console.log('發送的請求資料：', requestData);
     
        const result = await response.json();
        console.log(result);
        
      } catch (error) {
        console.error(error.message);
        
      }
    };

  // Step 1: Select people count
  const renderStep1 = () => (
    <Grid item xs={12}>
      <TextField
        label="訂位人數"
        type="number"
        value={peopleCount}
        onChange={handlePeopleCountChange}
        fullWidth
        variant="outlined"
        inputProps={{
          min: 1, // Prevent negative numbers and zero
        }}
        helperText={peopleCount <= 0 ? '人數必須大於 0' : ''}
        error={peopleCount <= 0}
      />
    </Grid>
  );

  // Step 2: Select date
  const renderStep2 = () => (
    <Grid item xs={12}>
      <TextField
        label="選擇日期"
        type="date"
        value={date}
        onChange={handleDateChange}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  );

  // Step 3: Select time
  const renderStep3 = () => (
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>選擇時間</InputLabel>
        <Select
          value={time}
          onChange={handleTimeChange}
          label="選擇時間"
        >
          <MenuItem value="早上">早上</MenuItem>
          <MenuItem value="中午">中午</MenuItem>
          <MenuItem value="晚上">晚上</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );

  // Step 4: Show summary and confirmation button
  const renderStep4 = () => (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>請確認您的訂位資訊</Typography>
      <Box mb={2}>
        <Typography variant="body1">訂位人數: {peopleCount} 人</Typography>
        <Typography variant="body1">訂位日期: {date}</Typography>
        <Typography variant="body1">訂位時間: {time}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBook}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        確認訂位
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setPeopleCount('');
          setDate('');
          setTime('');
          setStep(1); // Reset to the first step
        }}
        fullWidth
      >
        重新選擇
      </Button>
    </Grid>
  );

  

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
      <h2>訂位</h2>
      <Grid container spacing={2}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </Grid>

      {/* Navigation buttons */}
      {step > 1 && step < 4 && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setStep(step - 1)} // Go back to the previous step
            fullWidth
          >
            上一步
          </Button>
        </Box>
      )}

      {step < 4 && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep(step + 1)}
            disabled={isNextStepDisabled()}
            fullWidth
          >
            下一步
          </Button>
        </Box>
      )}
    </Box>
  );

}

export default BookPage;
