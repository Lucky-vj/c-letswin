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
import em1 from '../../imges/em-1.png'
import em2 from '../../imges/em-2.png'
import em3 from '../../imges/em-3.png'
import em4 from '../../imges/em-4.png'
import './Emerging.css'

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
  margin: 10,
  responsiveClass: true,
  nav: true,
  autoplay: true,
  loop: false,
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



export default function Emerging({footballEmerging}) {

    const classes = useStyles();

    console.log(footballEmerging)

return (
<div>
<OwlCarousel className="slider-items owl-carousel topwinner-block top-emerging-player" {...options}>
{
  footballEmerging?
  footballEmerging?.map((item,i)=>{
return(
  <div class="item">
    <div className='betting-img-emerging'><img src={item?.result?.profilePicture} alt={item?.result?.name} width="100px" height="100px" style={{borderRadius:'50%'}}/></div>
    <h5 className='white-color-emerging'>{item?.result?.name}</h5>
    <h5 className='yellow-color-emerging'>Won {item?.bet_amount} LWT</h5>
</div>
)
  })
  :<h3>No Data Found!</h3>
}

{/* <div class="item">
    <div className='betting-img-emerging'><img src={em1}/></div>
    <h5 className='white-color-emerging'>Name Surname</h5>
    <h5 className='yellow-color-emerging'>Won 25000 LWT</h5>
</div>

<div class="item">
    <div className='betting-img-emerging'><img src={em2}/></div>
    <h5 className='white-color-emerging'>Name Surname</h5>
    <h5 className='yellow-color-emerging'>Won 25000 LWT</h5>
</div>

<div class="item">
    <div className='betting-img-emerging'><img src={em3}/></div>
    <h5 className='white-color-emerging'>Name Surname</h5>
    <h5 className='yellow-color-emerging'>Won 25000 LWT</h5>
</div>

<div class="item">
    <div className='betting-img-emerging'><img src={em4}/></div>
    <h5 className='white-color-emerging'>Name Surname</h5>
    <h5 className='yellow-color-emerging'>Won 25000 LWT</h5>
</div> */}

</OwlCarousel>

</div>
)
};

