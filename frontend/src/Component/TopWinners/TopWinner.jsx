import React, { useEffect } from 'react';
import './TopWinner.css';

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
import top1 from '../../imges/tp-1.png'
import top2 from '../../imges/tp-2.png'
import top3 from '../../imges/tp-3.png'
import top4 from '../../imges/tp-4.png'
import { endpoints } from "../../auth/url";  
import usercalls from "../../auth/endpoints";
import './TopWinner.css'

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
    }
  });

//Owl Carousel Settings
const options = {
  margin: 20,
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
          items: 4,

      }
  },
};





export default function TopWinner({topPlayers}) {

    const classes = useStyles();
    const path = usercalls();

    useEffect(()=>{

      const topUsers =async()=>{
        const url = `${endpoints.cricketTopUsers}`;  
        try {
          const data = await path.getCall({ url });
          const result = await data.json();
          if (result.status === true) {
            if (result && result.data) {
              console.log(result.data)
              // setFootBallTopMatches(result.data)
            }
          }
        }
        catch (error) {
          console.error(error);
        }
      }

      topUsers()
  
    },[])

    console.log(topPlayers,'asd')

return (
<div>
<OwlCarousel className="slider-items owl-carousel topwinner-block" {...options}>
  {
    topPlayers?
topPlayers?.map((item,i)=>{
  return(
    <div class="item">
    <div className='betting-img'><img src={item?.result?.profilePicture} alt={item?.result?.name} height="100px" width="100px" style={{borderRadius:"10px"}}/></div>
    <h5 className='white-color'>{item?.result?.name}</h5>
    <h5 className='yellow-color'>{item?.match_name?item?.match_name:"football"}</h5>
    <h6 className='gp-class'>Total Bets: <span>{item?.bet_amount} LWT</span></h6>
</div>
  )
})

    :<h3>No Data Found!</h3>
  }
{/* <div class="item">
    <div className='betting-img'><img src={top1}/></div>
    <h5 className='white-color'>Name Surname</h5>
    <h5 className='yellow-color'>Game Type Played</h5>
    <h6 className='gp-class'>Games played <span>14368</span></h6>
</div>

<div class="item">
    <div className='betting-img'><img src={top2}/></div>
    <h5 className='white-color'>Name Surname</h5>
    <h5 className='yellow-color'>Game Type Played</h5>
    <h6 className='gp-class'>Games played <span>14368</span></h6>
</div>

<div class="item">
    <div className='betting-img'><img src={top3}/></div>
    <h5 className='white-color'>Name Surname</h5>
    <h5 className='yellow-color'>Game Type Played</h5>
    <h6 className='gp-class'>Games played <span>14368</span></h6>
</div>

<div class="item">
    <div className='betting-img'><img src={top4}/></div>
    <h5 className='white-color'>Name Surname</h5>
    <h5 className='yellow-color'>Game Type Played</h5>
    <h6 className='gp-class'>Games played <span>14368</span></h6>
</div> */}

</OwlCarousel>

</div>
)
};

