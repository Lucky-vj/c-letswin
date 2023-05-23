import React from 'react';
import './Events.css';

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
import cricketbetting from '../../imges/cricket-betting.png'
import footballbetting from '../../imges/football-betting.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
export default function Events({newsData,setBlogContent}) {
// console.log(newsData,"news")
    const classes = useStyles();

return (

<div>
<OwlCarousel className="slider-items owl-carousel event-carousel" {...options}>

 { newsData.map((item)=>(
<div class="item item_carousel" >
   
    <div className='betting-img'><img src={item?.meta_image_content} alt="meta_image_content" style={{width:'200px',height:'250px'}}/></div>
    <h5>{(item?.meta_title_content).slice(0, 45)}...</h5>
    <Box sx={{ flexGrow: 1 }} className={classes.eventdetailsouter}>
    <Grid container spacing={0} className={classes.eventdetailsinner} >

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
    <Item className={classes.eventdetailsclsleft}>
      <h3 className='channel'>{(item?.meta_title_description).slice(0, 100)}...</h3>
    {/* <h6 className='channel'>RduLIVE</h6>
    <h3 className='league-name'>LEAGUE NAME</h3>
    <h6 className='no-of-betters'>356,599 betters</h6> */}
    </Item>
    </Grid>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
    <Item className={classes.eventdetailsclsright}>
    <div className='predict-link'><Link to={item?.game_type}>{item?.game_type}</Link></div>
    </Item>
    </Grid>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
    <Item className={classes.eventdetailsclsright}>
    <div className='read-link' onClick={()=>setBlogContent(item)} ><Link>Read More <ArrowForwardIosIcon/></Link></div>
    </Item>
    </Grid>

    </Grid>
    </Box>
   
</div>
))}



{/* <div class="item">
    
    <div className='betting-img'><img src={footballbetting}/></div>
    <h5>India vs Pakistan I Check</h5>
    <Box sx={{ flexGrow: 1 }} className={classes.eventdetailsouter}>
    <Grid container spacing={0} className={classes.eventdetailsinner}>

    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} >
    <Item className={classes.eventdetailsclsleft}>
    <h6 className='channel'>RduLIVE</h6>
    <h3 className='league-name'>LEAGUE NAME</h3>
    <h6 className='no-of-betters'>356,599 betters</h6>
    </Item>
    </Grid>

    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
    <Item className={classes.eventdetailsclsright}>
    <div className='predict-link'><Link>Predict Now</Link></div>
    </Item>
    </Grid>

    </Grid>
    </Box>
   
</div> */}


</OwlCarousel>
</div>
)
};
