import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuIcon from '@mui/icons-material/Menu';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {useNavigate} from "react-router-dom"


export default function BottomNavi() {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  

  return (
    <Box className="bottom-fixed-bar">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction icon={<MenuIcon />} onClick={()=>navigate("/")} />
        <BottomNavigationAction icon={<LocalFireDepartmentIcon />} onClick={()=>navigate("/")}  />
        <BottomNavigationAction icon={<SportsBaseballIcon />} onClick={()=>navigate("/cricket")}  />
        <BottomNavigationAction icon={<SportsSoccerIcon />} onClick={()=>navigate("/football")}  />
      </BottomNavigation>
    </Box>
  );
}



