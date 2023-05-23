import React,{useState} from 'react'
// import Advertise from './Advertise'
// import cricimg from '../../imges/image-cric.png'
import './Homebanner.css'
import BetslipPromo from '../../imges/Betslip-Promo.png'
import {Link } from "react-router-dom";
// import bannericon from "../../imges/banner-icon-img-home.png"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import smallslide1 from '../../imges/side-img-1.png'
import smallslide2 from '../../imges/side-img-2.png'
import smallslide3 from '../../imges/side-img-3.png'
import smallslide4 from '../../imges/side-img-1.png'
import smallslide5 from '../../imges/side-img-2.png'
import smallslide6 from '../../imges/side-img-3.png'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Homebanner = () => {

  const[backImage,setBackImage] = useState(`https://letswinsports.io/image/bannerslide-${1}.jpg`)

  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function(currentSlide, nextSlide) {
      // console.log("before change", currentSlide, nextSlide);
      setBackImage(`https://letswinsports.io/image/bannerslide-${nextSlide+1}.jpg`)
    },
    afterChange: function(currentSlide) {
      // console.log("after change", currentSlide);
      setBackImage(`https://letswinsports.io/image/bannerslide-${currentSlide+1}.jpg`)
    }
  };
// console.log(backImage,'asd')

  return (
    <div>
      <div className='cricimg-outer'>
        {/* <video loop autoplay="" muted>
            <source src={require('../../videos/cricvideo.mp4')} type="video/mp4" />
        </video> */}
        <div className='cricimg' ><img src={backImage} alt="cricket" /></div>


    <Box sx={{ flexGrow: 1 }} className='banner-content'>
    <Grid container spacing={0}>
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
    <Item className='banner-caption'>

            <h1>Predict <span>&</span> Win</h1>
            <ul className='banner-list-home'>
                {/* <li><img src='https://letswinsports.io/image/bannerslide-1.jpg' alt='asasd' /></li> */}
                <li><a href="#" style={{fontFamily: 'Josefin Sans',fontSize:'16px'}}>Blockchain Supported</a></li>
                <li style={{marginTop:'-5px'}}>|</li>
                <li><a href="#">FUTURE OF SPORTS PREDICTION</a></li>
            </ul>
            <div className='register-btn-home'>
                <Link>REGISTER NOW</Link>
            </div>

    </Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='vertical-slide-part '>


      <div className='container' style={{width:'200px',height:'200px'}}>
        <Slider {...settings}>
          <div>
          <img src={`https://letswinsports.io/image/bannerslide-1.jpg`} className='img-fluid' alt={smallslide1} />
          </div>
          <div>
          <img src={`https://letswinsports.io/image/bannerslide-2.jpg`} className='img-fluid' alt={smallslide2} />
          </div>
          <div>
          <img src={`https://letswinsports.io/image/bannerslide-3.jpg`} className='img-fluid' alt={smallslide3} />
          </div>
          <div>
          <img src={`https://letswinsports.io/image/bannerslide-4.jpg`} className='img-fluid' alt={smallslide4} />
          </div>
          <div>
          <img src={`https://letswinsports.io/image/bannerslide-5.jpg`} className='img-fluid' alt={smallslide5} />
          </div>
          <div>
          <img src={`https://letswinsports.io/image/bannerslide-6.jpg`} className='img-fluid' alt={smallslide6} />
          </div>
        </Slider>
      </div>

   
    </Grid>
    </Grid>
    </Box>

      </div>
    </div>
  )
}

export default Homebanner
