import React from 'react';
import './Topmatches.css';

//Owl Carousel Libraries and Module
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import {Link} from 'react-router-dom'
import oponent2 from '../../imges/oponent-2.png'
import oponent1 from '../../imges/oponent-1.png'
import germanylogo from '../../imges/germany.png'
import { color } from '@mui/system';
import moment from "moment";

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
      height: '100%'
    },
    whitebarcls: {
      justifyContent: 'center',
      background: '#000 !important',
      borderRadius: '0px !important',
      height: '100vh',
      boxShadow: 'none !important',
    },
    margintopmove: {
      marginTop: '-340px',
    },
    eventdetailsclsleft: {
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
    },
    eventdetailsclsright: {
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
        height: "100%",
        padding: '0px !important'
    },
    matchtoplogo: {
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
    },
    matchtopcontent: {
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important', 
    },
    matchtopgame:{
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important', 
        textAlign: 'left !important'
    },
    matchtoptiming: {
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important', 
        textAlign: 'right !important'
    },
    matchtopbottommatches: {
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important', 
        minHeight: '170px',
        '& h3': {
            margin: '15px 0 10px !important',
        }
    },
    matchtopbottomthreeblockone: {
        boxShadow: 'none !important',
        background: '#EBF8F5',
        borderRadius: '8px !important',
        color: '#56C3A6 !important',
        fontFamily: 'Josefin Sans !important',
        fontWeight: '700 !important'
    },
    matchtopbottomthreeblocktwo:{
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important', 
        borderRadius: '8px !important',
        border: '1px solid #F8F8F8;',
        color: '#050505 !important',
        fontFamily: 'Josefin Sans !important',
        fontWeight: '700 !important'
    },
    matchtopbottomthreeblockthree:{
        borderRadius: '0px !important',
        boxShadow: 'none !important',
        borderRadius: '8px !important',
        background: '#FEF6F5 !important',
        color: '#ED2E1D !important',
        fontFamily: 'Josefin Sans !important',
        fontWeight: '700 !important'
    },
    matchtopcontain: {
        minHeight: '70px',
        
    }
  });

//Owl Carousel Settings
const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  autoplay: true,
  loop: true,
//   navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      700: {
          items: 3,
      },
      1000: {
          items: 3,

      }
  },
};
export default function Topmatches({footBallTopMatches}) {

    const classes = useStyles();
    console.log(footBallTopMatches)
return (

<div>
    {
         footBallTopMatches?.length!==0?
<OwlCarousel className="slider-items owl-carousel event-carousel top-match-caousel-outer" {...options}>

{
   
footBallTopMatches.map((item)=>( 
<div class="item top-match-caousel">
   


    <Box sx={{ flexGrow: 1 }} className={classes.matchtop}>
    <Grid container spacing={0} className={classes.matchtopcontain}>

    {/* <Grid item xs={2} sm={2} md={2} lg={2} xl={2} >
    <Item className={classes.matchtoplogo}>
        <img src={germanylogo} className='oponent-img'/>
    </Item>
    </Grid> */}

    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
    <Item className={classes.matchtopcontent}>
        <h5 className='head-top-match'>{item?.match?.match_name}</h5>
    </Item>
    </Grid>

    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} >
    <Item className={classes.matchtoplogo}>
    <img src={'https://letswinsports.io/service/img/flag/logo-color.png'}alt="tournament" className='oponent-img'/>
    </Item>
    </Grid>

    </Grid>
    </Box>


     <Box sx={{ flexGrow: 1 }} className={classes.matchtopmid}>
    <Grid container spacing={0} className={classes.matchtopmidinner}>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
    <Item className={classes.matchtopgame}>
     <img src={item?.match?.home_team_logo ?item?.match?.home_team_logo:"https://letswinsports.io/service/img/flag/logo-color.png"}alt="home" className='oponent-img-big'/>
     <img src={item?.match?.away_team_logo ?item?.match?.away_team_logo:"https://letswinsports.io/service/img/flag/logo-color.png"}alt="away" className='oponent-img-big'/>   
    </Item>
    </Grid>


    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
    <Item className={classes.matchtoptiming}>
    <h4 className='timimgs-bet-foot'>{moment(item?.match?.match_time* 1000).local().format('HH:mm A')}</h4>
    <span className='timimgs-bet-foot-bot'>Today</span>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopbottom}>
    <Grid container spacing={0} className={classes.matchtopbottominner}>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
    <Item className={classes.matchtopbottommatches}>
        <h3 className='oponent-22'>{item?.match?.home_team_name}</h3>
        <h3 className='oponent-22'>{item?.match?.away_team_name}</h3>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopbottomthree}>
    <Grid container spacing={0} className={classes.matchtopbottomthreeinner}>

    {/* <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblockone}>
        <div className='block-oponent-1'>1x 1.11</div>
    </Item>
    </Grid>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblocktwo}>
    <div className='block-oponent-2'>x 2.11</div>
    </Item>
    </Grid> */}

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblockthree}>
    <div className='block-oponent-2'>+{item?.count} bets</div>
    </Item>
    </Grid>

    </Grid>
    </Box> 
   
</div>
))}

{/* <div class="item top-match-caousel">
   

    <Box sx={{ flexGrow: 1 }} className={classes.matchtop}>
    <Grid container spacing={0} className={classes.matchtopcontain}>

    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} >
    <Item className={classes.matchtoplogo}>
        <img src={germanylogo} className='oponent-img'/>
    </Item>
    </Grid>

    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
    <Item className={classes.matchtopcontent}>
        <h5 className='head-top-match'>Bundesliga</h5>
    </Item>
    </Grid>

    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} >
    <Item className={classes.matchtoplogo}>
    <img src={oponent1} className='oponent-img'/>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopmid}>
    <Grid container spacing={0} className={classes.matchtopmidinner}>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
    <Item className={classes.matchtopgame}>
     <img src={oponent1} className='oponent-img-big'/><img src={oponent2} className='oponent-img-big'/>   
    </Item>
    </Grid>


    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
    <Item className={classes.matchtoptiming}>
    <h4 className='timimgs-bet-foot'>14:00</h4>
    <span className='timimgs-bet-foot-bot'>Today</span>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopbottom}>
    <Grid container spacing={0} className={classes.matchtopbottominner}>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
    <Item className={classes.matchtopbottommatches}>
        <h3 className='oponent-11'>Gimnasia La Plata</h3>
        <h3 className='oponent-22'>Lanus</h3>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopbottomthree}>
    <Grid container spacing={0} className={classes.matchtopbottomthreeinner}>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblockone}>
        <div className='block-oponent-1'>1x 1.11</div>
    </Item>
    </Grid>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblocktwo}>
    <div className='block-oponent-2'>x 2.11</div>
    </Item>
    </Grid>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblockthree}>
    <div className='block-oponent-2'>2x 2.51</div>
    </Item>
    </Grid>

    </Grid>
    </Box>
   
</div>

<div class="item top-match-caousel">
   

    <Box sx={{ flexGrow: 1 }} className={classes.matchtop}>
    <Grid container spacing={0} className={classes.matchtopcontain}>

    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} >
    <Item className={classes.matchtoplogo}>
        <img src={germanylogo} className='oponent-img'/>
    </Item>
    </Grid>

    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
    <Item className={classes.matchtopcontent}>
        <h5 className='head-top-match'>Bundesliga</h5>
    </Item>
    </Grid>

    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} >
    <Item className={classes.matchtoplogo}>
    <img src={oponent1} className='oponent-img'/>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopmid}>
    <Grid container spacing={0} className={classes.matchtopmidinner}>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
    <Item className={classes.matchtopgame}>
     <img src={oponent1} className='oponent-img-big'/><img src={oponent2} className='oponent-img-big'/>   
    </Item>
    </Grid>


    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
    <Item className={classes.matchtoptiming}>
    <h4 className='timimgs-bet-foot'>14:00</h4>
    <span className='timimgs-bet-foot-bot'>Today</span>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopbottom}>
    <Grid container spacing={0} className={classes.matchtopbottominner}>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
    <Item className={classes.matchtopbottommatches}>
        <h3 className='oponent-11'>Gimnasia La Plata</h3>
        <h3 className='oponent-22'>Lanus</h3>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.matchtopbottomthree}>
    <Grid container spacing={0} className={classes.matchtopbottomthreeinner}>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblockone}>
        <div className='block-oponent-1'>1x 1.11</div>
    </Item>
    </Grid>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblocktwo}>
    <div className='block-oponent-2'>x 2.11</div>
    </Item>
    </Grid>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
    <Item className={classes.matchtopbottomthreeblockthree}>
    <div className='block-oponent-2'>2x 2.51</div>
    </Item>
    </Grid>

    </Grid>
    </Box>
   
</div> */}








</OwlCarousel>
         :
<h3>No Data Found!</h3>

    }

</div>
)
};
