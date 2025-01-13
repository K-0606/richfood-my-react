import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ActionAreaCard() {
  const cards = Array(10).fill({
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'flex-start', transform: 'translateX(100px)',}}>
      {/* FormGroup: Checkbox controls on the left */}
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="火鍋" />
        <FormControlLabel control={<Checkbox Checked />} label="早午餐" />
        <FormControlLabel control={<Checkbox Checked />} label="小吃" />
        <FormControlLabel control={<Checkbox Checked />} label="餐酒館" />
        <FormControlLabel control={<Checkbox Checked />} label="酒吧" />
        <FormControlLabel control={<Checkbox Checked />} label="約會餐廳" />
        <FormControlLabel control={<Checkbox Checked />} label="甜點" />
        <FormControlLabel control={<Checkbox Checked />} label="燒肉" />
        <FormControlLabel control={<Checkbox Checked />} label="居酒屋" />
        <FormControlLabel control={<Checkbox Checked />} label="日本料理" />
        <FormControlLabel control={<Checkbox Checked />} label="義式料理" />
        <FormControlLabel control={<Checkbox Checked />} label="中式料理" />

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
