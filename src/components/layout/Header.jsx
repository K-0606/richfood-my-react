import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MyAppBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <div className='myHeader'>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RichFood
          </Typography>
          <Button color="inherit">登入</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="首頁" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="關於我們" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="服務" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="聯絡我們" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default MyAppBar;
