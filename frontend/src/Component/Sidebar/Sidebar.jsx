import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SettingsIcon from '@mui/icons-material/Settings';
import BlockIcon from '@mui/icons-material/Block';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import './Sidebar.css'
import { makeStyles } from '@mui/styles';
import {Link } from "react-router-dom";

const useStyles = makeStyles({

  sideiconbutton: {
    paddingTop: '3px !important',
    paddingBottom: '3px !important',
  },
  sideicon: {
    padding: '15px 0',
    '&:hover': {
      background: '#FDD50B',
      boxShadow: '0px 0px 13px #FDD50B',
      borderRadius: '17px'
    }
  },
  activemenu: {
    padding: '15px 0',
    background: '#FDD50B',
      boxShadow: '0px 0px 13px #FDD50B',
      borderRadius: '17px'
    }

});

const Sidebar = () => {

  const classes = useStyles();

  // console.log(window.location.pathname==='/')

  return (
    <div className='sidebar-icons'>

        <List>
          <ListItem disablePadding>
            <ListItemButton className={classes.sideiconbutton}>
              <ListItemIcon className={classes.sideicon}>
                <MenuIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.sideiconbutton}>
              <ListItemIcon className={window.location.pathname==="/"&&classes.activemenu || classes.sideicon}>
              <Link to="/"><LocalFireDepartmentIcon /></Link>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.sideiconbutton}>
              <ListItemIcon  className={window.location.pathname==="/football"&&classes.activemenu || classes.sideicon}>
              <Link to="/football"><SportsSoccerIcon /></Link> 
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.sideiconbutton}>
              <ListItemIcon className={window.location.pathname==="/cricket"&&classes.activemenu || classes.sideicon}>
              <Link to="/cricket"><SportsBaseballIcon /></Link>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      
      
    </div>
  )
}

export default Sidebar
