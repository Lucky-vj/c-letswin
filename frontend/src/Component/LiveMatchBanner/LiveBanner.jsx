import React from 'react';
import './LiveBanner.css';

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
import lmf1 from '../../imges/live-match-foot-1.png'
import lmf2 from '../../imges/live-match-foot-2.png'
import lmfrg from '../../imges/live-match-foot-rght-img.png'
import { color } from '@mui/system';



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
        height: '85%'
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
    },
    matchtopbottomthreeblockone:{
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
    livematchtoplogo: {
      borderRadius: '0px !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
    }
  });

//Owl Carousel Settings
const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  autoplay: true,
  loop: true,
  dots: true,
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
          items: 1,
      },
      700: {
          items: 1,
      },
      1000: {
          items: 1,

      }
  },
};
export default function LiveBanner({betMatches}) {
console.log(betMatches);
    const classes = useStyles();

return (

<div>
<OwlCarousel className="slider-items owl-carousel event-carousel live-banner-outer" {...options}>

{betMatches.map((item)=>(
<div class="item live-banner-caousel">
   

    <Box sx={{ flexGrow: 1 }} className={classes.livematchtop}>
    <Grid container spacing={0} className={classes.livematchtopcontain}>

    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
    <Item className={classes.matchtoplogo}>
    <div className='left-football-score'>

    <div className='top-football-score'>
       <div className='lnf-cls'>
        <img src={item?.match?.home_team_logo ?item?.match?.home_team_logo:"https://letswinsports.io/service/img/flag/logo-color.png"}alt="home"/>
        <img src={item?.match?.away_team_logo ?item?.match?.away_team_logo:"https://letswinsports.io/service/img/flag/logo-color.png"}alt="away"/>
        </div>
    </div>

    <div className='bottom-football-score'>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} ><h6 className='bannaer-bottom-genre'>FOOTBALL</h6></Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} ><h4 className='live-team-match-one'>{item?.match?.home_team_name}</h4></Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} ><h4 className='live-team-match-two'>{item?.match?.away_team_name}</h4></Grid>
    <div className='football-bets-in-banner'>
    {/* <div className='bet-badge-1 bet-badge-comn'><span>1x</span> 5.50</div>
    <div className='bet-badge-2 bet-badge-comn'><span>x</span> 3.25</div>
    <div className='bet-badge-3 bet-badge-comn'><span>2x</span> 2.13</div> */}
    <div className='bet-badge-4 bet-badge-comn'>+{item?.count} bets</div>
    </div>
    </div>
     
    </div>
    </Item>
    </Grid>

    


    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
    <Item className={classes.livematchtoplogo}>
    <div className='lmfrg'><img src={lmfrg}/></div>
    </Item>
    </Grid>

    </Grid>
    </Box>

   
</div>
))}
</OwlCarousel>
</div>

)
};
