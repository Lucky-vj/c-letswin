import React,{useEffect,useState} from 'react'
import howtoplayimg from '../../imges/how-to-play-img.png'
import htp1 from '../../imges/htp-1.png'
import htp2 from '../../imges/htp-2.png'
import htp3 from '../../imges/htp-3.png'
import getappbg from '../../imges/get-ap-bg.png'
import getappmob from '../../imges/get-app-mob.png'
import googleplay from '../../imges/googleplay.png'
import appstore from '../../imges/appstore.png'
import './HomeRight.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Events from '../Events/Events'
import TopWinner from '../TopWinners/TopWinner'
import {Link } from "react-router-dom";
import { endpoints } from "../../auth/url";  
import usercalls from "../../auth/endpoints";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const useStyles = makeStyles({

    // homecontleft: {
    //     background:'#172144',
    //     boxShadow: 'none !important'
    // },
    // homecontright: {
    //     background:'#11162a',
    //     boxShadow: 'none !important',
    //     borderRadius: '0 0 8px 8px !important',
    //     paddingBottom: '60px'
    // },
    // homecontleftitem: {
    //     background:'#172144 !important',
    //     boxShadow: 'none !important',
    //     borderRadius: '0px !important',
    //     paddingTop: '50px !important',

    //     '& button': {
    //         fontSize: '20px',
    //         color: '#fff',
    //         padding: '5px',
    //         fontFamily: 'Josefin Sans !important',
    //         textTransform: 'none'
    //     }
    // },
    // homecontrightitem: {
    //     background:'#11162a !important',
    //     boxShadow: 'none !important',
    //     borderRadius: '0px !important',
    // },
    getanappleftitem:{
      background:'transparent !important',
        boxShadow: 'none !important',
        borderRadius: '0px !important',
        paddingLeft: '22px !important',
        paddingBottom: '0px !important',
        paddingTop: '0px !important',
        "@media (max-width: 767.98px)": {
          paddingLeft: '10px !important',
        }
    },
    getanapprightitem: {
      background:'transparent !important',
        boxShadow: 'none !important',
        borderRadius: '0px !important',
        height: '98% !important'
    },
    getanappbottom: {
      position: 'relative', 
      marginTop: '150px',
      "@media (max-width: 767.98px)": {
        marginTop: '100px',
      }
    },
    getanappcontleftitem: {
      background:'transparent !important',
        boxShadow: 'none !important',
        borderRadius: '0px !important',
    },
    getanappcontrightitem: {
      background:'transparent !important',
      boxShadow: 'none !important',
      borderRadius: '0px !important',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '50px !important',
      alignItems: 'center',
    },
    getanappcontent: {
      position: 'absolute',
      top: '-120px',
      width: '100%',
      "@media (max-width: 767.98px)": {
        top: '0px',
        position: 'relative',
      }
    },
    eventsrecommenditem: {
       background:'transparent !important',
        boxShadow: 'none !important',
        borderRadius: '0px !important',
        marginTop: '25px',
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    }
});

const HomeRight = ({setBlogContent,blogContent}) => {

  const classes = useStyles();
  const path = usercalls();
  const [newsData, setNewsData] = useState([])
  const [cricketPlayers, setCricketPlayers] = useState([])
  const [footballPlayers, setFootballPlayers] = useState([])
  // const [topPlayers, setTopPlayers] = useState([])
  useEffect(() => {

  getData()
  topFootballUsers()
  topCricketUsers()
  }, [])
  
  // const [blogContent, setBlogContent] = useState(null)
  const getData =async()=>{
    const url = `${endpoints.recommendedData}`;
    try {
      const data = await path.getCall({ url});
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
           setNewsData(result.data);
         
          //  setBlogContent()
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(blogContent,'asda')

  const topFootballUsers =async()=>{
    const url = `${endpoints.footballTopUsers}`;  
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          setFootballPlayers(result?.data)
          // setTopPlayers(result?.data)
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const topCricketUsers =async()=>{
    const url = `${endpoints.cricketTopUsers}`;  
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          setCricketPlayers(result?.data)
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  console.log([...cricketPlayers,...footballPlayers])

  return (
    <>



{
  !blogContent ?
<>

<Box sx={{ flexGrow: 1 }} className={classes.eventsrecommend}>
      <h3 className='right-cont-head-recommend'>Recommended News</h3>
      
     
<Grid container spacing={0} className={classes.eventsrecommendinner}>

<Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.eventsrecommendleft}>
<Item className={classes.eventsrecommenditem}>
   <Events newsData={newsData} setBlogContent={setBlogContent}/>
</Item>
</Grid>

</Grid>
      
    
  </Box>
  <Box sx={{ flexGrow: 1 }} className={classes.eventsrecommend}>
      <h3 className='right-cont-head-recommend'>Top Bet Users</h3>
    <Grid container spacing={0} className={classes.eventsrecommendinner}>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.eventsrecommendleft}>
    <Item className={classes.eventsrecommenditem}>
       <TopWinner topPlayers={[...cricketPlayers,...footballPlayers]}/>
    </Item>
    </Grid>

    </Grid>
  </Box>


    
    <Box sx={{ flexGrow: 1 }} className={classes.getanapp}>
      <h3 className='right-cont-head'>How To Play</h3>
    <Grid container spacing={0} className={classes.getanappinner}>

    <Grid item xs={12} sm={12} md={6} lg={7} xl={7} className={classes.getanappleft}>
    <Item className={classes.getanappleftitem}>
       <div className='getanapp-img-outer'>
       <div className='getanapp-img-inner'><img src={howtoplayimg} alt={howtoplayimg} /></div> 
       <h2>PREDICTION POWERED BY BLOCKCHAIN</h2>
        </div> 
    </Item>
    </Grid>

    <Grid item xs={12} sm={12} md={6} lg={5} xl={5} className={classes.getanappright}>
    <Item className={classes.getanapprightitem}>

      <div className='steps-follow'>

      <div className='step-1-htp cmn-stp'>
      <div className='step-1-htp-img cmn-stp-img'><img src={htp1}/></div>
      <div className='step-1-htp-detail cmn-stp-dtl'>
        <div className='numeric-part'>1</div>
        <h4>Select Game</h4>
        <h5>Choose an upcoming match that you want to play</h5>
      </div>
      </div>

      <div className='step-2-htp cmn-stp'>
      <div className='step-2-htp-img cmn-stp-img'><img src={htp2}/></div>
      <div className='step-2-htp-detail cmn-stp-dtl'>
        <div className='numeric-part'>2</div>
        <h4>Choose Match</h4>
        <h5>Research, Use our statistical data, Pray to the gods & pick the right odds</h5>
      </div>
      </div>

      <div className='step-3-htp cmn-stp'>
      <div className='step-3-htp-img cmn-stp-img'><img src={htp3}/></div>
      <div className='step-3-htp-detail cmn-stp-dtl'>
        <div className='numeric-part'>3</div>
        <h4>Prediction</h4>
        <h5>Choose between different contests & compete</h5>
      </div>
      </div>


      </div>
        
    </Item>
    </Grid>

    </Grid>
    </Box>
    


    <Box sx={{ flexGrow: 1 }} className={classes.getanappbottom}>

    <Grid container spacing={0} className={classes.getanappbotinner}>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.getanappleft}>
    <Item className={classes.getanappleftitem}>
       <div className='getanapp-img-outer-bg'>
       <div className='getanapp-img-inner-bg'><img src={getappbg} alt={getappbg} /></div> 
       </div> 
    </Item>
    </Grid>
    </Grid>

    <Grid container spacing={0} className={classes.getanappcontent}>

    <Grid id="grid-left" item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.getanappcontentleft}>
    <Item className={classes.getanappcontleftitem}>
       <div className='getanapp-img-outer-left-img'>
       <div className='getanapp-img-inner-left-img'><img src={getappmob} alt={getappmob} /></div> 
       </div> 
    </Item>
    </Grid>

    <Grid id="grid-right" item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.getanappcontentright}>
    <Item className={classes.getanappcontrightitem}>
       <div className='getanapp-img-outer-right-img'>
        <div className='text-right-get-an-app'>
          <h2 className='white-text'>GET THE APP </h2>
          <h2 className='white-text'>&</h2>
          <h2 className='yellow-text'>WIN</h2> 
          <h2 className='yellow-text'>TOKENS</h2>
        </div>
       <div className='getanapp-img-inner-right-img'><img src={googleplay} alt={googleplay} /><img src={appstore} alt={appstore} /></div> 
       </div> 
    </Item>
    </Grid>

    </Grid>

    </Box>
    </>
    :

<Grid>
    <Box sx={{ flexGrow: 1 }} className={classes.eventsrecommend}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0px 20px'}}>
      <h3 className='right-cont-head-recommend'>Trending News</h3>
      <button className='back-button-blog' style={{marginTop:'20px'}} onClick={()=>setBlogContent(null)}><ArrowLeftIcon/>Back</button>
      </div>
    <Grid container spacing={0} className={classes.eventsrecommendinner}>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.eventsrecommendleft}>
    <Item className={classes.eventsrecommenditem}></Item>
     {/* <div>{blogContent?.document_content}</div> */}
     <div className='home-blog-content'
      dangerouslySetInnerHTML={{__html: blogContent?.document_content}} style={{color:'#fff !important',padding:'20px'}}
    />
</Grid>
</Grid>
</Box>
    </Grid>
}



    </>
  )
}

export default HomeRight
