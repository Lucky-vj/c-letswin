import React,{ useEffect,useState }  from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
// import {Link } from "react-router-dom";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel'
import upnext from '../../imges/football.png'
import upnextnew from '../../imges/football-1.png'
import './FootballRightContent.css'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import indiaflagsmall from '../../imges/ind-flag-con.png'
import pakflagsmall from '../../imges/pak-flag-con.png'
import banflagsmall from '../../imges/ban-flag-con.png'
import league1 from '../../imges/league-1.png'
import league2 from '../../imges/league-2.png'
import league3 from '../../imges/league-3.png'
import league4 from '../../imges/league-4.png'
import league5 from '../../imges/league-5.png'
import manchester from '../../imges/manchester-icon.png'
import barcelona from '../../imges/barcelona-icon.png'
import {Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Emerging from '../Emerging/Emerging';
import Popular from '../PopularLeague/Popular';
import Topmatches from '../Topmatches/Topmatches';
import LiveBanner from '../LiveMatchBanner/LiveBanner';
import AllGames from '../AllGames/AllGames';
import { endpoints } from "../../auth/url";
import usercalls from "../../auth/endpoints"; 
import moment from "moment";
import mqtt from 'precompiled-mqtt'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
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
        background: 'transparent !important'
    },
    removeshadowlogo: {
      boxShadow: 'none !important',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'left',
      background: 'transparent !important',
      padding: '0 8px !imortant'
    },
    menuclslink: {
      fontSize: '20px',
      color: '#fff',
      padding: '30px 20px',
      display: 'inline-block',
      textDecoration: 'none',
      fontWeight: 700
    },
    bodymain: {
      position: 'relative',
      zIndex: '99',
    },
    loginlogouttop: {
      padding: '15px 30px !important',
      color: '#fff !important',
      fontWeight: '600 !important',
      borderColor: '#fff !important',
      '&:hover' : {
        background: '#ccc !important'
      }
    },
    loginlogouttopouter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightheadlock: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    matchimage: {
        width: '100%',
        height:'300px'
    },
    matchspan: {
        display: 'block',
        fontSize: '14px',
        margin: '3px 0'
    },
    matchdetailbg: {
        background: '#192201',
        padding: '20px 10px',
        color: '#fff',
        fontSize: '16px',
        marginTop: '-6px',
        textAlign: 'left',
        fontFamily: 'Josefin Sans !important'
    },
    carouselblock: {
        boxShadow: 'none !important',
        paddingLeft: '16px'
    },
    livecrictoday: {
        textAlign: 'left',
        background: '#f8f8f8 !important',
        padding: '20px',
        fontFamily: 'Josefin Sans !important'
    },
    transparent: {
        backgroundColor: 'transparent !important',
        '& span': {
          fontSize: '14px',
          fontFamily: 'Montserrat !important',
          color: '#000',
          fontWeight: '600'
        }
    },
    countrytransparent: {
      backgroundColor: 'transparent !important',
      minHeight: '450px',
      maxHeight: '450px',
      overflow: 'auto',
      margin: '30px 0 40px !important',
      
        "&::-webkit-scrollbar": {
          width: "5px"
        },
        "&::-webkit-scrollbar-track": {
          background: "#ccc"
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#f7d00b",
          borderRadius: "5px"
        },

      '& img':{
        height: 'auto !important',
        width: '30px !important'
      }
    },
    yellowcolor: {
      color: '#f7d00b',
      textAlign: 'left',
      display: 'block',
      paddingLeft: '40px',
      marginBottom: '10px'
    }
  });
  
const FootballRightContent = () => {

    const classes = useStyles();
    const path = usercalls();
    useEffect(() => {
      liveCountry()
      liveLeague()
      liveMatches()
      mqttConnect ()
      topMatches()
      betMatch()
      topFootballUsers()
      handleFootballLineup()
    }, [])
    
    const [matchValue, setMatchValue] = useState(null)
    var items = [
        {
            image: upnext,
            country1: "Portgal",
            country2: "Croatia",
        },
        {
            image: upnextnew,
            country1: "Argentina",
            country2: "Brazil",
        }
    ]

    const [value, setValue] = React.useState(0);
    const [skeleton, setSkeleton] = React.useState(true);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
    const [countryList, setCountryList] = useState([])
    const [leagueList, setLeagueList] = useState([])
    const [matchList, setMatchList] = useState([])
    const [todayLiveMatches, setTodayLiveMatches] = useState([])
    const [liveData, setLiveData] = useState({})
    const [tournamentName, setTournamentName] = useState('')
    const [footBallSocket, setFootBallSocket] = useState([])
    const [footBallApiSocket, setFootBallApiSocket] = useState([])
    const [footBallTopMatches, setFootBallTopMatches] = useState([])
    const [betMatches, setBetMatches] = useState([])
    const [footballEmerging, setFootballEmerging] = useState([])
    const [liveSlide, setLiveSlide] = useState(null)
    const [liveSlideTeam, setLiveSlideTeam] = useState(null)
    const [isHomeTeamLineUp, setIsHomeTeamLineUp] = useState(false)
    const [lineupData, setLineUpData] = useState(null)
    const liveCountry =async()=>{
      const url = `${endpoints.listFBCountry}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setCountryList(result.data)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    const liveLeague =async()=>{
      const url = `${endpoints.listFBLeague}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setLeagueList(result.data)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    
    const handleLiveMatch=async(data,item)=>{
      
      setLiveSlide(item.tournament_logo)
      setLiveSlideTeam(data)
      // console.log(data,item.tournament_logo,'iadsa')
      setLiveData(data)
      setTournamentName(item?.tournament_name)
       const url = `${endpoints.footBallSocketMatches}`;  
      //  const urlLineup = `${endpoints.footballLineup}`
      //  let payloadLineup ={match_key:data?.id};  
      let payload ={match_id:data?.id}
      try {
        const data = await path.postCall({ url ,payload});
        // const dataLineup = await path.postCall({ urlLineup ,payloadLineup});
        const result = await data.json();
        // const resultLineup =  await dataLineup.json();
        // console.log(resultLineup.data,'dataurl');
        if (result.status === true) {
          if (result && result.data) {
            setFootBallApiSocket(result.data[0].score)
            window.scrollTo({behavior: 'smooth', top:0})
          }
        }
  
      }
   
      catch (error) {
        console.error(error);
      }
     }


     const handleFootballLineup=async(data,item)=>{
      console.log(data)
      setLiveSlide(item.tournament_logo)
      setLiveSlideTeam(data)
      // console.log(data,item.tournament_logo,'iadsa')
      setLiveData(data)
      setTournamentName(item?.tournament_name)
       const url = `${endpoints.footballLineup}`;  
      let payload ={match_key:data?.id}
      try {
        const data = await path.postCall({ url ,payload});
        const result = await data.json();
        console.log(result?.data?.results?.lineup);
        if (result.status === true) {
          setLineUpData(result?.data?.results?.lineup)
          // if (result && result.data) {
          //   setFootBallApiSocket(result.data[0].score)
          //   window.scrollTo({behavior: 'smooth', top:0})
          // }
        }
  
      }
   
      catch (error) {
        console.error(error);
      }
     }



    const liveMatches =async()=>{
      const url = `${endpoints.todayFBLiveMatches}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setTournamentName(result.data[0].tournament_name)
            setTodayLiveMatches(result.data)
            setLiveData(result.data[0].data[0])
            handleLiveMatch(result.data[0].data[0],result.data[0])
            handleFootballLineup(result.data[0].data[0],result.data[0])
            setSkeleton(false)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    const [client, setClient] = useState(null);
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    const mqttConnect = (host, mqttOption) => {
    const connectUrl = `wss://mq.thesports.com:443/mqtt`
    setClient(mqtt.connect(connectUrl, {
    clientId:clientId,
    clean: true,
    username: 'alpharive',
    password: '9ecc1d920c56bebadc08a6301108e67a',
    rejectUnauthorized: false,
    retain:false,
    protocol: "wss",
    // connectTimeout: 4000,
    // reconnectPeriod: 1000
    }));
  };
    useEffect(() => {
      if (client) {
        let cricket ='thesports/football/match/v1'
        client.on('connect', () => {
          console.log('Connected');
        });
        client.on('error', (err) => {
          console.error('Connection error: ', err);
          client.end();
        });
        // client.on('reconnect', () => {
        //   console.log('Reconnecting');
        // });
        client.subscribe(cricket,{qos: 0})
        client.on('message', (topic, message) => {
         if(topic ==='thesports/football/match/v1'){
          const payload = JSON.parse(message.toString())
          payload.forEach((e)=>{
          if(e?.score !==undefined){
          setFootBallSocket(e?.score)
           }
          // if(e?.incidents !==undefined){
          //   setTimelineElements(e)
          //}
          })
        }
        
        });
      }
    }, [client]);
    const topMatches =async()=>{
      const url = `${endpoints.footBallTopMatches}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setFootBallTopMatches(result.data)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    const betMatch =async()=>{
      const url = `${endpoints.footBallBetMatches}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setBetMatches(result.data)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }

    const topFootballUsers =async()=>{
      const url = `${endpoints.footballTopUsers}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setFootballEmerging(result?.data)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    



  return (
    <div>
    <Box sx={{ flexGrow: 1 }} className={classes.bodymain}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='carouselgrid'>
          <Item className={classes.carouselblock}>
         <div className='carouselouter'>
          {/* <Carousel className='carouselouter'> */}
            {
              // items?.length!==0?
              //   items.map( (item,i) => (
                    <div style={{position:'relative',zIndex:'9999',background:'white'}}>
                    <div className={classes.matchimageouter}><img className={classes.matchimage} src={liveSlide?liveSlide:items[0].image} alt={liveSlide} /></div>
                    <div className={classes.matchdetailbg}>
                      <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                        {
                           liveSlideTeam?.homeTeamLogo &&
                           <img width='30px' height="30px" src={liveSlideTeam?.homeTeamLogo} alt={liveSlideTeam?.homeTeamLogo} />
                        }
                   
                    {liveSlideTeam?.homeTeamName? liveSlideTeam?.homeTeamName:items[0].country1}
                      </div>
                   
                    <span className={classes.matchspan} >vs</span>
                    <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      {
                        liveSlideTeam?.awayTeamLogo &&
<img width="30px" height="30px" src={liveSlideTeam?.awayTeamLogo} alt={liveSlideTeam?.awayTeamLogo} />
                      }
                    
                    {liveSlideTeam?.awayTeamName?liveSlideTeam?.awayTeamName:items[0].country2}
                    </div>
                    </div>
                    </div>
                // ) ):
                // <h3>No Data Found!</h3>
            }
        {/* </Carousel> */}
        </div>

        <div className={classes.livecrictoday}>

           {/* <h1 className='livehead'><span>Football</span> Live</h1>

           <div className='target-live-scores'>
           
          
           <div className='target-live-score left'>
           <Link to="/football">
             <div className='football-score'><img alt={manchester} src={manchester} className='team1'/><span>1</span>:<span style={{fontWeight: "bold"}}>2</span><img src={barcelona} className='team2'/></div>
           </Link>
           </div>
           

           <div className='target-live-score right'>
           <Link to="/football">
             <div className='football-score'><img alt={manchester} src={manchester} className='team1'/><span>1</span>:<span style={{fontWeight: "bold"}}>2</span><img src={barcelona} className='team2'/></div>
           </Link>
           </div>

           </div> */}


           <div className='country'>

           <span className='country-list'>Country</span>

           <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.countrytransparent}
    >
       {
        countryList?.length!==0?
       countryList.map( (item,i) => (
      <ListItemButton key={i} disabled={true} style={{cursor:'context-menu',opacity:'1'}} >
        <ListItemIcon>
          <img alt={item?.id} src={item?.logo} width="25px" height="25px"/>
        </ListItemIcon>
        <ListItemText primary={item?.name} />
      </ListItemButton>
)):
<h3>No Data Found!</h3>}
    </List>

           </div>
        </div>


          </Item>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
          <Item className={classes.removeshadow}>
          <div className='top-block'>  
          {Object.keys(liveData).length !== 0 && <span className={classes.yellowcolor}>Football</span>}
          <h2>{tournamentName}</h2>
          {
            liveData?.id &&
            <div className='target-live-score-high left'>

            <div className='first-batting-high'><h3>{liveData.homeTeamName} :&nbsp;
            {
           footBallSocket[0] ===liveData?.id && footBallSocket.length!==0?
           footBallSocket[2][0]: 
           footBallApiSocket.length !==0 && footBallApiSocket[2][0]
           }
          </h3> </div>
            <div className='secnd-batting-high'><h3>{liveData.awayTeamName} :&nbsp;
            {
           footBallSocket[0] ===liveData?.id && footBallSocket.length!==0?
           footBallSocket[3][0]: 
           footBallApiSocket.length !==0 && footBallApiSocket[3][0]
           }</h3></div>
            </div>

          }
          
             <div className='block-point-outer'>
                <Link to="/football">
                {Object.keys(liveData).length !== 0 && 
                <div className='block-point-1'>
               <img alt={manchester} src={liveData && liveData.homeTeamLogo ?liveData.homeTeamLogo :"https://letswinsports.io/service/img/flag/logo-color.png"} className='team1-banner-point'/>
                <span className='team-name'>{liveData.homeTeamName} :</span>
                <span className='team-points'> 
                   {
                                    footBallSocket[0] ===liveData?.id && footBallSocket.length!==0?
    <h3 style={{ fontSize: '15px' }}>{  footBallSocket[2][0]}</h3>: footBallApiSocket.length !==0 && footBallApiSocket[2][0]
                                  }</span>
                </div>
}
                </Link>
                <Link to="/football">
                {Object.keys(liveData).length !== 0 && 
                <div className='block-point-2'>
                <img alt={barcelona} src={liveData.awayTeamLogo ?liveData.awayTeamLogo :"https://letswinsports.io/service/img/flag/logo-color.png"} className='team2-banner-point'/>
                <span className='team-name'>{liveData.awayTeamName} :</span>
                <span className='team-points'>    {
                                    footBallSocket[0] ===liveData?.id && footBallSocket.length!==0?
    <h3 style={{ fontSize: '15px' }}>{  footBallSocket[3][0]}</h3>: footBallApiSocket.length !==0 && footBallApiSocket[3][0]
                                  }</span>
                </div>
}
                </Link>
                
             </div>
           </div>

           <div className='scoreboard'>

            <div className='bottom-block'>
                <h3 className='bottom-block-head'><span className='cicket-font'>F<span>oo</span>tball</span> Games</h3>
                <div className="date-right"></div>
            </div>

            <Box className='tab-mid-part' sx={{ width: '100%' }}>
      <Box className='tab-mid-part-tabs' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab label="All Games" {...a11yProps(0)} /> */}
          <Tab label="Live Games" {...a11yProps(0)} />
          <Tab label="Pre-matches" {...a11yProps(1)} />
          <Tab label="All Matches" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* <TabPanel className='allgame-tab' value={value} index={0}>
      {/* <AllGames/> */}
      {/* </TabPanel> */} 
      <TabPanel className='live-match-table-panel' value={value} index={0} >
        {
          lineupData &&
          <div>
          <h3>Line-ups</h3>
             <div className='homeAwayTitle'>
              <h5 onClick={()=>setIsHomeTeamLineUp(true)} className={isHomeTeamLineUp&&"homeLineup"} style={{cursor:'pointer'}}>Home</h5>
              <h5 onClick={()=>setIsHomeTeamLineUp(false)} className={!isHomeTeamLineUp&&"awayLineup"} style={{cursor:'pointer'}}>Away</h5>
             </div>
            <div className='lineup-background'>
              <div style={{top:'50%',transform:'translateY(-0%)',height:'100vh'}}>
              {
                isHomeTeamLineUp ?
             lineupData?.home?.map((item,i)=>{
              if(item?.first===1){
                return(
                  <div style={{position:'absolute',zIndex:'99999',transform:`translate(${(item.y)*7}px, ${(item.x)*7}px)`}}>
                    <img src={item.logo? item.logo : "https://letswinsports.io/service/img/flag/logo-color.png"} alt={item.name}  height="50px" width="50px" style={{borderRadius:'50%'}}/>
                    <p style={{color:'white',margin:'0px',padding:'0px'}}>{item?.name}({item?.position})</p>
                    <p style={{color:'white',margin:'0px',padding:'0px'}}>{item?.rating}</p>
                  </div>
                )
              }
             })
             :

             lineupData?.away?.map((item,i)=>{
              if(item?.first===1){
                return(
                  <div style={{position:'absolute',zIndex:'99999',transform:`translate(${(item.y)*7}px, ${(item.x)*7}px)`}}>
                    <img src={item.logo? item.logo : "https://letswinsports.io/service/img/flag/logo-color.png"} alt={item.name}  height="50px" width="50px" style={{borderRadius:'50%'}}/>
                    {/* <p style={{color:'white'}}>{item?.position}</p> */}
                    <p style={{color:'white',margin:'0px',padding:'0px'}}>{item?.name}({item?.position})</p>
                  </div>
                )
              }
             })
              }
              </div>
            </div>
          
        </div>
        }
       
      <List>
      {
      todayLiveMatches?.length!==0?
      todayLiveMatches.map( (item,i) => (
      <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
        <div className='league-held-name-main' style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'flex-start'}}>
        <ListItemIcon className='league-held-name-main-icon'>
        <img alt={item?.id} src={item?.tournament_logo?item?.tournament_logo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="25px"/>
        </ListItemIcon>
        <ListItemText className='league-held-name-main-text' primary={item?.tournament_name} />
        </div>
        {item?.data?.map( (data) => (
      
      <ListItemButton className='league-held-table-main' style={{display:'flex',alignItems:'center'}} onClick={()=>{handleLiveMatch(data,item);handleFootballLineup(data,item)}}>
        
        <div className='league-held-table'>
        <div className='league-held-table-team' style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}} >
        {data.homeTeamName} 
        <img alt={item?.id} src={data?.homeTeamLogo?data?.homeTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        <span className='vs-span'>Vs</span>
        <div className='league-held-table-team' style={{display:'flex',alignItems:'center'}}>
        {data.awayTeamName}
        <img alt={item?.id} src={data?.awayTeamLogo?data?.awayTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        </div>


        <div className='league-held-table-timing' style={{display:'flex',alignItems:'center'}}>
        <p> {moment(data?.matchTime* 1000).local().format('HH:mm A')}</p>
        </div>
        <div className='league-held-table-status' style={{display:'flex',alignItems:'center'}}>
        <p> {data?.status}</p>
        </div>
      </ListItemButton>
))}
      </div>
         )):
         <h3>No Data Found!</h3>
        }

       </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <List>
       {
       leagueList?.length!==0?
       leagueList.map( (item,i) => (
      <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
        <div className='league-held-name-main' style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'flex-start'}}>
        <ListItemIcon className='league-held-name-main-icon'>
        <img alt={item?.id} src={item?.tournament_logo?item?.tournament_logo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="25px"/>
        </ListItemIcon>
        <ListItemText className='league-held-name-main-text' primary={item?.tournament_name} />
        </div>
        {item?.data?.map( (data) => (
        data.status ==="Not started"&&
      <div className='league-held-table-main' style={{display:'flex',alignItems:'center'}}>
      
        <div className='league-held-table'>
        <div className='league-held-table-team' style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}} >
        {data.homeTeamName} 
        <img alt={item?.id} src={data?.homeTeamLogo?data?.homeTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        <span className='vs-span'>Vs</span>
        <div className='league-held-table-team' style={{display:'flex',alignItems:'center'}}>
        {data.awayTeamName}
        <img alt={item?.id} src={data?.awayTeamLogo?data?.awayTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        </div>

        <div className='league-held-table-timing' style={{display:'flex',alignItems:'center'}}>
        <p> {moment(data?.matchTime* 1000).local().format('HH:mm A')}</p>
        </div>

        <div className='league-held-table-status' style={{display:'flex',alignItems:'center'}}>
        <p> {data?.status}</p>
        </div>

      </div>
))}
      </div>
         ))
        :
        <h3>No Data Found!</h3>}

       </List>
      </TabPanel>
      <TabPanel className='league-match-table-panel' value={value} index={2}>
       <List>
       {
       leagueList?.length!==0?
       leagueList.map( (item,i) => (
      <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
        <div className='league-held-name-main' style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'flex-start'}}>
        <ListItemIcon className='league-held-name-main-icon'>
        <img alt={item?.id} src={item?.tournament_logo?item?.tournament_logo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="25px"/>
        </ListItemIcon>
        <ListItemText className='league-held-name-main-text' primary={item?.tournament_name} />
        </div>
        {item?.data?.map( (data) => (
      
      <div className='league-held-table-main' style={{display:'flex',alignItems:'center'}}>
      
        <div className='league-held-table'>
        <div className='league-held-table-team' style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}} >
        {data.homeTeamName} 
        <img alt={item?.id} src={data?.homeTeamLogo?data?.homeTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        <span className='vs-span'>Vs</span>
        <div className='league-held-table-team' style={{display:'flex',alignItems:'center'}}>
        {data.awayTeamName}
        <img alt={item?.id} src={data?.awayTeamLogo?data?.awayTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        </div>

        <div className='league-held-table-timing' style={{display:'flex',alignItems:'center'}}>
        <p> {moment(data?.matchTime* 1000).local().format('HH:mm A')}</p>
        </div>

        <div className='league-held-table-status' style={{display:'flex',alignItems:'center'}}>
        <p> {data?.status}</p>
        </div>

      </div>
))}
      </div>
         )):
         <h3>No Data Found!</h3>
         
         }

       </List>
      </TabPanel>
    </Box>

    <div className='Top-players-for-football'>
    <h6>LETS WIN</h6>
    <h5><span>Top</span> Betting Players</h5>
    <Emerging footballEmerging={footballEmerging}/>
    </div>

    <div className='Top-players-for-football'>
    <h6>PLAY NOW</h6>
    <h5><span>Popular</span> Leagues</h5>
    <Popular/>
    </div>


    <div className='Top-players-for-football football-live-scores'>
      <LiveBanner betMatches={betMatches}/>
    </div>


    <div className='Top-players-for-football top-matches-football'>
    <h6>PLAY NOW</h6>
    <h5><span>Top</span> Matches</h5>
    <Topmatches footBallTopMatches={footBallTopMatches}/>
    </div>
    

           </div>

          </Item>
        </Grid>

        {/* <Grid item xs={3}>
          <Item className={classes.removeshadow}>
          <h2>Right Right Content</h2>
          </Item>
        </Grid> */}

      </Grid>
    </Box>
    </div>
  )
}

export default FootballRightContent
