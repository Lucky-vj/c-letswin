import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import logo from '../imges/LetsWin-logo.png'
import { makeStyles } from '@mui/styles';
import {Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
    'Football',
    'Cricket',
    'Liveplay',
    'Chat',
    'News',
    'Promotions'
  ];
  
  const ITEM_HEIGHT = 80;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    removeshadow: {
        boxShadow: 'none !important',
        padding: '0px !important',
        background: 'transparent !important'
    },
    removeshadowmenu:{
       boxShadow: 'none !important',
        padding: '0px !important',
        background: 'transparent !important',
        textAlign: 'right !important',
        paddingRight: '15px !important',
    },
    removeshadowlogo: {
      boxShadow: 'none !important',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'left',
      background: 'transparent !important',
      padding: '0 8px !important'
    },
    menuclslink: {
      fontSize: '16px',
      color: '#fff',
      padding: '30px 20px',
      display: 'inline-block',
      textDecoration: 'none',
      fontWeight: 700
    },
    headmain: {
      position: 'relative',
      zIndex: '99',
      padding: '0 30px',
      borderBottom: '1px solid #fff'
    },
    loginlogouttop: {
      color: '#fff !important',
    padding: '18px 30px !important',
    fontWeight: '600 !important',
    border: '1px solid #fff !important',
    borderRadius: '4px !important',
    textDecoration: 'none !important',
      '&:hover' : {
        background: '#ccc !important'
      }
    
    },
    loginlogouttopouter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightheadlock: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: '0px'
    }
  });

export default function BasicGrid() {

    const classes = useStyles();

    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className='headmain'>
      <Grid container spacing={2} >
        <Grid item xs={6} sm={6} md={6} lg={2} xl={2} className='headmain-logo'>
          <Item className='removeshadowlogo'><Link to="/">
            <img className={classes.logoimg} src='./logo-main.png' alt={logo} style={{height:'100px',width:'100px'}} />
            </Link></Item>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2} xl={2} className='menu-mobile' style={{paddingTop:'50px'}}>
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            background: '#000',
            color: '#fff',
            position:'absolute !',
            right: '0px !important',
            left: 'auto !important',
            top: '68px !important',
          },
        }}
      >

          <MenuItem className='menu-mobile-block' onClick={handleClose} >
                <Link  className={classes.menuclslink} to="/football">Football</Link>
                <Link className={classes.menuclslink} to="/cricket">Cricket</Link>
                <Link className={classes.menuclslink} to="/liveplay">Live Play</Link>
                <Link className={classes.menuclslink} to="/chat">Chat</Link>
                <Link className={classes.menuclslink} to="/news">News</Link>
                <Link className={classes.menuclslink} to="/promotions">Promotions</Link>
          </MenuItem>

      </Menu>
        </Grid>

        {/* <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.rightheadlock}></Grid> */}

        <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className='headmain-menu'>
          <Item className={classes.removeshadowmenu}>
            
                <nav className={classes.menucls}>
                <ul>
                <li className={`${window.location.pathname==="/football"&&"activemenu"}`}>
                <Link className={classes.menuclslink} to="/football">Football</Link>
                </li>
                <li className={`${window.location.pathname==="/cricket"&&"activemenu"}`}>
                <Link className={classes.menuclslink} to="/cricket">Cricket</Link>
                </li>
                <li>
                <Link className={classes.menuclslink} to="#">Live Play</Link>
                </li>
                <li>
                <Link className={classes.menuclslink} to="#">Chat</Link>
                </li>
                <li>
                <Link className={classes.menuclslink} to="/">News</Link>
                </li>
                <li>
                <Link className={classes.menuclslink} to="/">Promotions</Link>
                </li>
                </ul>
                </nav>
          </Item>
        </Grid>

        {/* <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.rightheadlock}>
          <Item className={classes.removeshadow}>

        <Grid container spacing={2}>

        <Grid item xs={6}>
          <FormControl sx={{ m: 1, minWidth: 120 }} className="selectboxoptn">
        <InputLabel id="demo-simple-select-helper-label">GMT</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="GMT"
          onChange={handleChange}
          className={classes.selectboxtop}
        >

          <MenuItem className={classes.selectboxtopitem} value={1}>15:41 (GMT+1)</MenuItem>
          <MenuItem className={classes.selectboxtopitem} value={2}>15:41 (GMT+1)</MenuItem>
          <MenuItem className={classes.selectboxtopitem} value={3}>15:41 (GMT+1)</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid className={classes.loginlogouttopouter} item xs={6}>
      <Link to='/login' className={classes.loginlogouttop} variant="outlined">LOGIN</Link>
      </Grid>

      </Grid>

          </Item>
        </Grid> */}

      </Grid>
    </Box>
  );
}