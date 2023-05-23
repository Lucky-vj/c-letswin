import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Whitebar from '../Whitebar';
import {Link } from "react-router-dom";
import './FooterHome.css'
import BottomNavi from '../BottomNavi';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
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
  removeshadowlogo: {
    boxShadow: 'none !important',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    background: 'transparent !important',
    padding: '0 8px !imortant'
  },
  menuclslink: {
    fontSize: '20px',
    color: '#fff',
    padding: '30px 20px',
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 700
  },
  bodymain: {
    position: 'relative',
    zIndex: '99',
  },
  loginlogouttop: {
    padding: '15px 30px !important',
    color: '#fff !important',
    fontWeight: '600 !important',
    borderColor: '#fff !important',
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
    alignItems: 'center'
  },
  matchimage: {
      width: '100%'
  },
  matchspan: {
      display: 'block',
      fontSize: '14px',
      margin: '3px 0'
  },
  matchdetailbg: {
      background: '#192201',
      padding: '20px 10px',
      color: '#fff',
      fontSize: '16px',
      marginTop: '-6px',
      textAlign: 'left',
      fontFamily: 'Josefin Sans !important'
  },
  carouselblock: {
      boxShadow: 'none !important',
      paddingLeft: '16px'
  },
  livecrictoday: {
      textAlign: 'left',
      background: '#f8f8f8 !important',
      padding: '20px',
      fontFamily: 'Josefin Sans !important'
  },
  transparent: {
      backgroundColor: 'transparent !important',
      '& span': {
        fontSize: '14px',
        fontFamily: 'Montserrat !important',
        color: '#000',
        fontWeight: '600'
      }
  },
  yellowcolor: {
    color: '#f7d00b',
    textAlign: 'left',
    display: 'block',
    paddingLeft: '40px',
    marginBottom: '10px'
  },
  whitebarcls: {
    height: '100%',
    boxShadow: 'none !important'
  },
  footerrghtpart: {
    background: '#172144'
  }
});


const FooterHome = () => {

  const classes = useStyles();

  return (
    <div className='homefooter'>

      <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
    {/* <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className='desktop-view'>
    <Item className={classes.whitebarcls}><Whitebar/></Item>
    </Grid> */}
    <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='desktop-view'>
    <Item className={classes.whitebarcls}><Whitebar/></Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={9} xl={9} className={classes.footerrghtpart}>
    <Item className={classes.removeshadow}>

<div className='footer-link'>
<ul className='foot-list'>
<li><Link to='/'>Responsible Gaming</Link></li>
<li><Link to='/'>Cookie Policy</Link></li>
<li><Link to='/'>Privacy Policy</Link></li>
<li><Link to='/termsconditions'>Terms and Conditions</Link></li>
<li><Link to='/'>FAQ</Link></li>
<li><Link to='/'>Contact Support</Link></li>
</ul>
</div>

<div className='bottom-content'>
<p>LetsWin Sports LV is registered in the Commercial Register of the Curaçao Chamber of Commerce & Industry under registration number: 162560</p>
</div>

    </Item>
    </Grid>
    </Grid>
    </Box>

    <BottomNavi/>

    </div>
  )
}

export default FooterHome
