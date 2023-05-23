import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
import Cricvid from '../Video/Cricvid';
import BodyContent from '../BodyContent/BodyContent';
import Whitebar from '../Whitebar';
import Whitetopblock from '../Whitetopblock';

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
  },
  sidebarcls: {
    boxShadow: 'none !important',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    background: '#000 !important',
    borderRadius: '0px !important'
  },
  menuclslink: {
    fontSize: '20px',
    color: '#fff',
    padding: '30px 20px',
    display: 'inline-block'
  },
  sidebarcls: {
    justifyContent: 'center',
    background: '#000 !important',
    borderRadius: '0px !important',
    height: '100vh'
  },
  whitebarcls: {
    justifyContent: 'center',
    background: '#fff !important',
    borderRadius: '0px !important',
    height: '100vh',
    boxShadow: 'none !important',
  },
  margintopmove: {
    marginTop: '-340px',
    '@media (max-width: 767.98px)' : {
      marginTop: '0px !important'
    }
  }
});


export default function Cricket() {

  const classes = useStyles();

  return (
    <>

    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className='desktop-view'>
    <Item className={classes.sidebarcls}><Sidebar /></Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
    <Item className={classes.removeshadow}>
      <Header />
      <Cricvid/>
      </Item>
    </Grid>
    </Grid>
    </Box>
    
    <Box sx={{ flexGrow: 1 }} className={classes.margintopmove}>
    <Grid container spacing={0}>
    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className='desktop-view'>
    <Item className={classes.whitebarcls}><Whitetopblock/></Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
    <Item className={classes.removeshadow}>
      <BodyContent/>
      </Item>
    </Grid>
    </Grid>
    </Box>


    <Footer />
    </>
  )
}

