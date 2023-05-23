import React from 'react'
// import Advertise from './Advertise'
// import cricimg from '../../imges/image-cric.jpg'
import './Videostyle.css'
import BetslipPromo from '../../imges/Betslip-Promo.png'
import {Link } from "react-router-dom";

const Cricvid = () => {
  return (
    <div>
      {/* <div className='cricimg'><img src={cricimg} /></div> */}
      <div className='video-cric'>
        <video loop autoPlay={true} muted>
            <source src={require('../../videos/cricvideo.mp4')} type="video/mp4" />
        </video>
        <div className='add-banner-right-in-video'>
          {/* <Advertise/> */}
          <Link to='/login'><img alt={BetslipPromo} src={BetslipPromo} /></Link>
        </div>
      </div>
    </div>
  )
}

export default Cricvid
