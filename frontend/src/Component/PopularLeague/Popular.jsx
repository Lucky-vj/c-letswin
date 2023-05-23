import React from 'react';

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
import pl1 from '../../imges/pl-1.png'
import pl2 from '../../imges/pl-2.png'
import pl3 from '../../imges/pl-3.png'
import pl4 from '../../imges/pl-4.png'
import pl5 from '../../imges/pl-5.png'
import './Popular.css'

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
  });

//Owl Carousel Settings
const options = {
  margin: 15,
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
          items: 6,

      }
  },
};



export default function Popular() {

    const classes = useStyles();

return (
<div>
<OwlCarousel className="slider-items owl-carousel top-poplar-league" {...options}>
<div class="item pplr-league-item green-bg">
    <div className='betting-img-popular-league'><img src={`fifa.png`} alt='fifa.png' width="50px" height="50px"/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>FIFA </h5>
    <h5 className='yellow-color-popular-league'>World Cup</h5>
    </div>
</div>

<div class="item pplr-league-item orange-bg">
    <div className='betting-img-popular-league'><img src={`UEFA champions league.png`} alt='UEFA champions league.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>UEFA Champions</h5>
    <h5 className='yellow-color-popular-league'>League</h5>
    </div>
</div>

<div class="item pplr-league-item red-bg">
    <div className='betting-img-popular-league'><img src={`UEFA europa league.png`} alt='UEFA europa league.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>UEFA Europa</h5>
    <h5 className='yellow-color-popular-league'>League</h5>
    </div>
</div>

<div class="item pplr-league-item yellow-bg">
    <div className='betting-img-popular-league'><img src={`UEFA europa conference.png`} alt='UEFA europa conference.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>UEFA Europa</h5>
    <h5 className='yellow-color-popular-league'>Conference League</h5>
    </div>
</div>

<div class="item pplr-league-item green-bg">
    <div className='betting-img-popular-league'><img src={`English premier league.png`} alt='English premier league.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>English Premier</h5>
    <h5 className='yellow-color-popular-league'>League</h5>
    </div>
</div>
<div class="item pplr-league-item orange-bg">
    <div className='betting-img-popular-league'><img src={`Spanish la liga.png`} alt='Spanish la liga'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>Spanish La</h5>
    <h5 className='yellow-color-popular-league'>Liga</h5>
    </div>
</div>
<div class="item pplr-league-item red-bg">
    <div className='betting-img-popular-league'><img src={`bundesliga.png`} alt='bundesliga.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>Bundesliga</h5>
    {/* <h5 className='yellow-color-popular-league'>Liga</h5> */}
    </div>
</div>
<div class="item pplr-league-item yellow-bg">
    <div className='betting-img-popular-league'><img src={`italian series A.png`} alt='italian series A.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>Italian Serie A</h5>
    {/* <h5 className='yellow-color-popular-league'>Liga</h5> */}
    </div>
</div>
<div class="item pplr-league-item yellow-bg">
    <div className='betting-img-popular-league'><img src={`french ligue A.png`} alt='french ligue A.png'/></div>
    <div className='league-name'>
    <h5 className='white-color-popular-league'>French Ligue 1</h5>
    {/* <h5 className='yellow-color-popular-league'>Liga</h5> */}
    </div>
</div>
</OwlCarousel>

</div>
)
};

