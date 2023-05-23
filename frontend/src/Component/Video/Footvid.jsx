import React from 'react'
// import Advertise from './Advertise'
// import cricimg from '../../imges/image-cric.jpg'
import './FootVideo.css'
import BetslipPromo from '../../imges/Betslip-Promo.png'
import {Link } from "react-router-dom";
import lmf1 from '../../imges/live-match-foot-1.png'
import lmf2 from '../../imges/live-match-foot-2.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Footvid = () => {
  return (
    <div>
      {/* <div className='cricimg'><img src={cricimg} /></div> */}
      <div className='video-cric'>
        <video loop autoPlay={true} muted>
            <source src={require('../../videos/footvideo.mp4')} type="video/mp4" />
        </video>
        <div className='add-banner-right-in-video'>
          {/* <Advertise/> */}
          <Link to='/login'><img alt={BetslipPromo} src={BetslipPromo} /></Link>
        </div>
        {/* <div className='livescore-in-main-banner'>
        <div className='tournament-league'>
          <div className='upcoming-match-conduct'><img src={lmf1}/></div>
          <div className='dis-inline-blk'><MoreVertIcon/></div>
          <div className='upcoming-match'><img src={lmf1}/><img src={lmf2}/></div>
          <div className='upcoming-match-timer'></div>
        </div>
        </div> */}
      </div>
    </div>
  )
}

export default Footvid;
