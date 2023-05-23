import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import anlogo1 from '../../imges/team-icon-an-1.png'
import anlogo2 from '../../imges/team-icon-an-1.png'
import Cricketanbig from '../../imges/Cricket-an-big.png'
import cicsmallan from '../../imges/cic-small-an.png'
import footsmallan from '../../imges/foot-small-an.png'
import moment from "moment"
import './AllNews.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  
  const useStyles = makeStyles({
  
      // homecontleft: {
      //     background:'#000',
      //     boxShadow: 'none !important',
      //     height: '100%',
      // },
      // homecontright: {
      //     background:'#11162a',
      //     boxShadow: 'none !important',
      //     borderRadius: '0 0 8px 8px'
      // },
      homecontleftitem: {
          background:'#172144 !important',
          boxShadow: 'none !important',
          borderRadius: '0px !important',
          paddingTop: '50px !important',
          height: '100%',
  
          '& button': {
              fontSize: '20px',
              color: '#fff',
              padding: '5px',
              fontFamily: 'Josefin Sans !important',
              textTransform: 'none'
          }
      },
      homecontrightitem: {
          background:'#11162a !important',
          boxShadow: 'none !important',
          borderRadius: '0px !important'
      },
      homecontleftitemtop: {
        borderRadius: '0px !important',
        background: 'transparent !important',
        boxShadow: 'none !important',
        textAlign: 'left'
      },
      homecontrightitemtop: {
        borderRadius: '0px !important',
        background: 'transparent !important',
        boxShadow: 'none !important',
      },
      homecontleftitembot: {
        borderRadius: '0px !important',
        background: 'transparent !important',
        boxShadow: 'none !important',
      },
      homecontrightitembot: {
        borderRadius: '0px !important',
        background: 'transparent !important',
        boxShadow: 'none !important',
      },

  });

const AllNews = ({newsData,setBlogContent}) => {

  // console.log(setBlogContent,'asd')

 const classes = useStyles();

 console.log(newsData)

  return (

    <div style={{height:'100vh',overflow:'scroll',overflowX:'hidden'}}>
{  
 newsData?.length!==0?
newsData.map((item)=>(
 <>
    <Box sx={{ flexGrow: 1 }} className={classes.homecontmaintop} >
    <Grid container spacing={0} className={classes.homecontmaingridtop} >

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftlogotop} >
    <Item className={classes.homecontleftitemtop} >
     {/* <div className='team-logo'>
        <img src={anlogo1} alt={anlogo1} />
        <img src={anlogo2} alt={anlogo2} />
     </div> */}
    </Item>
    </Grid>

    {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.rightdetailsdatetop}>
    <Item className={classes.homecontrightitemtop}>
     <div className='date-time-occur'>
      <span className='time-span'>1:58AM</span>
      <span className='date-span'>10 Dec</span>
     </div>
    </Item>
    </Grid> */}

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.rightnewsmainmid} onClick={()=>setBlogContent(item)} style={{cursor:'pointer'}}>
    <Grid container spacing={0} className={classes.rightnewsinnermid}>


    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.rightnewsinnerimgmid} >
    <div className='Cricketanbig'><img src={item?.meta_image_content}  alt={Cricketanbig} /></div>
    </Grid>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.rightnewsinnerdetailmid}>
    <div className='newsbrief'>
      <h5>{item?.game_type}<span className='dot-divide'></span><span>{moment(item?.createdAt).local().format('llll')}</span></h5>
      <h2 style={{color:"#fff"}}>{(item?.meta_title_content).slice(0, 50)}...</h2>
      <h3>{(item?.meta_title_description).slice(0, 100)}...</h3>
      {/* <h3>New Zealand seek Super League boost against Dhawan-led India</h3>
      <h4>Here are the live streaming details of Morocco vs Croatia, Germany vs Japan, Spain vs Costa Rica, Belgium vs Canada at FIFA World Cup 2022</h4> */}
    </div>
    </Grid>



    </Grid>
    </Box>
    </>
))
:
    <h3 style={{color:'white'}}>No news feed today!</h3>
}

    {/* <Box sx={{ flexGrow: 1 }} className={classes.homecontmainbot}>
    <Grid container spacing={0} className={classes.homecontmaingridbot}>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftnewsbot}>
    <Item className={classes.homecontleftitembot}>
     <div className='news-read'>
        <div className='news-img'><img src={cicsmallan} /></div>
        <h5>CRICKET</h5>
        <h3>Clinical win extends Western Australia's unbeaten start</h3>
     </div>
    </Item>
    </Grid>
    

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.rightnewsbot}>
    <Item className={classes.homecontrightitembot}>
     <div className='news-read'>
     <div className='news-img'><img src={footsmallan} /></div>
     <h5>FOOTBALL</h5>
     <h3>Root enters IPL auction in bid to relaunch T20 career</h3>
     </div>
    </Item>
    </Grid>

    </Grid>
    </Box>




    <Box id="lendhty-news" sx={{ flexGrow: 1 }} className={classes.homecontmaintop}>
    <Grid container spacing={0} className={classes.homecontmaingridtop}>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftlogotop}>
    <Item className={classes.homecontleftitemtop}>
     <div className='team-logo'>
        <img src={anlogo1} alt={anlogo1} />
        <img src={anlogo2} alt={anlogo2} />
     </div>
    </Item>
    </Grid>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.rightdetailsdatetop}>
    <Item className={classes.homecontrightitemtop}>
     <div className='date-time-occur'>
      <span className='time-span'>1:58AM</span>
      <span className='date-span'>10 Dec</span>
     </div>
    </Item>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.rightnewsmainmid}>
    <Grid container spacing={0} className={classes.rightnewsinnermid}>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.rightnewsinnerimgmid}>
    <div className='Cricketanbig'><img src={Cricketanbig} alt={Cricketanbig}/></div>
    </Grid>

    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.rightnewsinnerdetailmid}>
    <div className='newsbrief'>
      <h5>FOOTBALL<span className='dot-divide'></span><span>24 NOV 2022</span></h5>
      <h3>New Zealand seek Super League boost against Dhawan-led India</h3>
      <h4>Here are the live streaming details of Morocco vs Croatia, Germany vs Japan, Spain vs Costa Rica, Belgium vs Canada at FIFA World Cup 2022</h4>
    </div>
    </Grid>

    </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} className={classes.homecontmainbot}>
    <Grid container spacing={0} className={classes.homecontmaingridbot}>

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.leftnewsbot}>
    <Item className={classes.homecontleftitembot}>
     <div className='news-read'>
        <div className='news-img'><img src={cicsmallan} /></div>
        <h5>CRICKET</h5>
        <h3>Clinical win extends Western Australia's unbeaten start</h3>
     </div>
    </Item>
    </Grid>
    

    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} className={classes.rightnewsbot}>
    <Item className={classes.homecontrightitembot}>
     <div className='news-read'>
     <div className='news-img'><img src={footsmallan} /></div>
     <h5>FOOTBALL</h5>
     <h3>Root enters IPL auction in bid to relaunch T20 career</h3>
     </div>
    </Item>
    </Grid>

    </Grid>
    </Box> */}
      
    </div>
  )

}

export default AllNews
