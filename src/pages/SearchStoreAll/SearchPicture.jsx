import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function SearchPicture() {
  const [checkedItem, setCheckedItem] = useState(null);  // 存储当前被选中的项

  const handleCheckboxChange = (event) => {
    const label = event.target.name;

    // 如果当前选中的项与点击的项不一样，就更新为新的选项
    setCheckedItem(checkedItem === label ? null : label);

    // 打印当前选中的标签
    if (checkedItem !== label) {
      console.log(`${label} 已選擇`);
      fetchData(label);
    }
  };
  // 发送数据到API
  const fetchData = (category) => {
  // 假设API的URL为 https://example.com/test3/{category}
  const url = `https://example.com/test3/${category}`;
  }  
    
  const cards = Array(10).fill({
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'flex-start', transform: 'translateX(100px)',}}>
      {/* FormGroup: Checkbox controls on the left */}
      <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '火鍋'} onChange={handleCheckboxChange} name="火鍋" />}
        label="火鍋"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '早午餐'} onChange={handleCheckboxChange} name="早午餐" />}
        label="早午餐"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '小吃'} onChange={handleCheckboxChange} name="小吃" />}
        label="小吃"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '餐酒館'} onChange={handleCheckboxChange} name="餐酒館" />}
        label="餐酒館"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '酒吧'} onChange={handleCheckboxChange} name="酒吧" />}
        label="酒吧"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '約會餐廳'} onChange={handleCheckboxChange} name="約會餐廳" />}
        label="約會餐廳"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '甜點'} onChange={handleCheckboxChange} name="甜點" />}
        label="甜點"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '燒肉'} onChange={handleCheckboxChange} name="燒肉" />}
        label="燒肉"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '居酒屋'} onChange={handleCheckboxChange} name="居酒屋" />}
        label="居酒屋"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '日本料理'} onChange={handleCheckboxChange} name="日本料理" />}
        label="日本料理"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '義式料理'} onChange={handleCheckboxChange} name="義式料理" />}
        label="義式料理"
      />
      <FormControlLabel
        control={<Checkbox checked={checkedItem === '中式料理'} onChange={handleCheckboxChange} name="中式料理" />}
        label="中式料理"
      />
    </FormGroup>

      {/* Card section on the right */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          transform: 'translateX(100px)', // Right shift cards by 200px
          // marginLeft: 通过设置 marginLeft: 100px，可以将 Box 整体向右移动 100px。
          // transform: 通过 transform: translateX(100px)，可以在不改变布局流的情况下向右偏移 Box 元素。
        }}
      >
        {cards.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 600 }}>
            <CardActionArea>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {/* Card Image */}
                <CardMedia
                  component="img"
                  sx={{ width: 140 }}
                  image={card.image}
                  alt="green iguana"
                />
                {/* Card Content */}
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';
// import Box from '@mui/material/Box';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// export default function ActionAreaCard() {
//   const cards = Array(10).fill({
//     title: 'Lizard',
//     description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
//     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//   });

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'flex-start', transform: 'translateX(100px)',}}>
//       {/* FormGroup: Checkbox controls on the left */}
//       <FormGroup>
//         <FormControlLabel control={<Checkbox defaultChecked />} label="火鍋" />
//         <FormControlLabel control={<Checkbox Checked />} label="早午餐" />
//         <FormControlLabel control={<Checkbox Checked />} label="小吃" />
//         <FormControlLabel control={<Checkbox Checked />} label="餐酒館" />
//         <FormControlLabel control={<Checkbox Checked />} label="酒吧" />
//         <FormControlLabel control={<Checkbox Checked />} label="約會餐廳" />
//         <FormControlLabel control={<Checkbox Checked />} label="甜點" />
//         <FormControlLabel control={<Checkbox Checked />} label="燒肉" />
//         <FormControlLabel control={<Checkbox Checked />} label="居酒屋" />
//         <FormControlLabel control={<Checkbox Checked />} label="日本料理" />
//         <FormControlLabel control={<Checkbox Checked />} label="義式料理" />
//         <FormControlLabel control={<Checkbox Checked />} label="中式料理" />

//       </FormGroup>

//       {/* Card section on the right */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           alignItems: 'center',
//           transform: 'translateX(150px)', // Right shift cards by 200px
//            // marginLeft: 通过设置 marginLeft: 100px，可以将 Box 整体向右移动 100px。
//     // transform: 通过 transform: translateX(100px)，可以在不改变布局流的情况下向右偏移 Box 元素。
//         }}
//       >
//         {cards.map((card, index) => (
//           <Card key={index} sx={{ maxWidth: 600 }}>
//             <CardActionArea>
//               <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//                 {/* Card Image */}
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 140 }}
//                   image={card.image}
//                   alt="green iguana"
//                 />
//                 {/* Card Content */}
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 2 }}>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {card.title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     {card.description}
//                   </Typography>
//                 </CardContent>
//               </Box>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }
