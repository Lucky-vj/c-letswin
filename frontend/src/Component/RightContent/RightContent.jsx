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
import upnext from '../../imges/Up-Next-Image.png'
import upnextnew from '../../imges/Up-Next-Image-new.png'
import './RightContent.css'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import indiaflag from '../../imges/india-flag.png'
import newflag from '../../imges/newzealand-flag.png'
import ausflag from '../../imges/aus-flag.png'
import sriflag from '../../imges/srilanka-flag.png'
import indiaflagsmall from '../../imges/ind-flag-con.png'
import pakflagsmall from '../../imges/pak-flag-con.png'
import banflagsmall from '../../imges/ban-flag-con.png'
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import league1 from '../../imges/league-1.png'
import league2 from '../../imges/league-2.png'
import league3 from '../../imges/league-3.png'
import league4 from '../../imges/league-4.png'
import league5 from '../../imges/league-5.png'
import manchester from '../../imges/manchester-icon.png'
import barcelona from '../../imges/barcelona-icon.png'
import {Link } from "react-router-dom";
import { endpoints } from "../../auth/url";
import usercalls from "../../auth/endpoints";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import mqtt from 'precompiled-mqtt'
import Skeleton from '@mui/material/Skeleton';
import moment from "moment";

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
    },
    // carouselskeleton: {
    //   position: 'relative',
    //   "&, &:before, &:after":{
    //     content: '""',
    //     position: 'absolute',
    //     width: '50%',
    //     height: '100%',
    //     background: '#000',
    //     left: '-80%',
    //     zIndex: '-1',
    //   }
    // }
  });

const RightContent = () => {

    const classes = useStyles();
    const path = usercalls();
    const [countryList, setCountryList] = useState([])
    const [leagueList, setLeagueList] = useState([])
    const [matchList, setMatchList] = useState([])
    const [todayLiveMatches, setTodayLiveMatches] = useState([])
    const [liveData, setLiveData] = useState({})
    const [tournamentName, setTournamentName] = useState(null)
    const [ftballSocket, setFtBallSocket] = useState([])
    const [cricketSocket, setCricketSocket] = useState([])
    const [cricketApiSocket, setCricketApiSocket] = useState([])
    const [cricketData, setCricketData] = useState([])
    const [skeleton, setSkeleton] = useState(true);
    const [firstInningsExtra, setFirstInningsExtra] = useState(null)
    const [secondInningsExtra, setSecondInningsExtra] = useState(null)
    const [liveSlide, setLiveSlide] = useState(null)
    const [liveSlideTeam, setLiveSlideTeam] = useState(null)
    const [isHighlightDisplay, setIsHighlightDisplay] = useState(false)
    const [matchValue, setMatchValue] = useState(null)
    var items = [
        {
            image: upnext,
            country1: "India",
            country2: "Newzealand",
        },
        {
            image: upnextnew,
            country1: "Australia",
            country2: "Srilanka",
        }
    ]
    useEffect(() => {
      liveCountry()
      liveLeague()
      liveMatches()
      mqttConnect ()
    }, [])

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
        let cricket ='thesports/cricket/match/v1'
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
         if(topic ==='thesports/cricket/match/v1'){
          const payload = JSON.parse(message.toString())
          payload.forEach((e)=>{
        
          if(e?.score !==undefined){
          setCricketSocket(e?.score)
           }
          // if(e?.incidents !==undefined){
          //   setTimelineElements(e)
          //}
          })
        }
        
        });
      }
    }, [client]);

    const liveCountry =async()=>{
      const url = `${endpoints.listCountry}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setCountryList(result.data)
            // setSkeleton(false)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    const liveLeague =async()=>{
      const url = `${endpoints.listLeague}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setLeagueList(result.data)
            // setSkeleton(false)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }


    const liveMatches =async()=>{
      const url = `${endpoints.todayLiveMatches}`;  
      try {
        const data = await path.getCall({ url });
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setTodayLiveMatches(result?.data)
            setTournamentName(result?.data[0]?.tournament_name)
            setLiveData(result?.data[0]?.data[0])
            handleLiveMatch(result?.data[0]?.data[0],result?.data[0])
            setSkeleton(false)
          }
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    const handleTournament=async(e)=>{
      const url = `${endpoints.listMatches}`;  
      let payload ={match_key:e?.id}
      try {
        const data = await path.postCall({ url ,payload});
        const result = await data.json();
        if (result.status === true) {
          if (result && result.data) {
            setMatchList(result.data)
           
          }
        }
        setMatchValue(e.id);
      }
   
      catch (error) {
        console.error(error);
      }
    }

   const handleLiveMatch=async(item,data)=>{
    console.log(item,data,'live match')
    setLiveData(item)
    setTournamentName(data?.tournament_name)
    setLiveSlide(data?.tournament_logo)
    setLiveSlideTeam(item)
    cricketLiveMatchData(item)
    const url = `${endpoints.cricketSocketMatches}`;  
    let payload ={match_id:item?.id}
    try {
      const data = await path.postCall({ url ,payload});
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          // console.log(`${result?.data[0]?.players[0]?.bowling?.extra}( ${result?.data[0]?.players[0]?.bowling?.wides}WD, ${result?.data[0]?.players[0]?.bowling?.no_balls}NB, ${result?.data[0]?.players[0]?.bowling?.byes}B, ${result?.data[0]?.players[0]?.bowling?.leg_byes}PENALTY)`)
          setFirstInningsExtra(`${result?.data[0]?.players[0]?.bowling?.extra}( ${result?.data[0]?.players[0]?.bowling?.wides}WD, ${result?.data[0]?.players[0]?.bowling?.no_balls}NB, ${result?.data[0]?.players[0]?.bowling?.byes}B, ${result?.data[0]?.players[0]?.bowling?.leg_byes}PENALTY)`)
          setSecondInningsExtra(`${result?.data[0]?.players[1]?.bowling?.extra}( ${result?.data[0]?.players[1]?.bowling?.wides}WD, ${result?.data[0]?.players[1]?.bowling?.no_balls}NB, ${result?.data[0]?.players[1]?.bowling?.byes}B, ${result?.data[0]?.players[1]?.bowling?.leg_byes}PENALTY)`)
          setCricketApiSocket(result?.data[0]?.score)
          window.scrollTo({behavior: 'smooth', top:0})
        }
      }
    }
 
    catch (error) {
      console.error(error);
    }
   }

   const cricketLiveMatchData = async (item) => {
    const url = `${endpoints.cricketTableData}`;
    let payload = { match_key: item?.id };
    try {
      const data = await path.postCall({ url, payload });
      const result = await data.json();
      if (result.status === true) {
        if (result && result?.data) {
          setCricketData(result?.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };



  const handleStatusHighlights = (data)=>{
    
      if(data?.status==="ENDED"){
        console.log(data?.status)
        setIsHighlightDisplay(true)
      }
  }

  // console.log(liveData,'livedataasddasdas')

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.bodymain}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='carouselgrid'>
          <Item className={classes.carouselblock}>
          <div className='carouselouter'>
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
                   
                    {liveSlideTeam?.homeTeamName?liveSlideTeam?.homeTeamName:items[0]?.country1}
                      </div>
                   
                    <span className={classes.matchspan} >vs</span>
                    <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      {
                        liveSlideTeam?.awayTeamLogo &&
<img width="30px" height="30px" src={liveSlideTeam?.awayTeamLogo} alt={liveSlideTeam?.awayTeamLogo} />
                      }
                    
                    {liveSlideTeam?.awayTeamName?liveSlideTeam?.awayTeamName:items[0]?.country2}
                    </div>
                    </div>
                    </div>
                // ) ):
                // <h3>No Data Found!</h3>
            }
</div>
          {/* <Carousel className='carouselouter'>
            {
                items.map( (item) => (
                    <div>
                    <div className={classes.matchimageouter}><img className={classes.matchimage} src={item.image} alt={item.image} /></div>
                    <div className={classes.matchdetailbg}>
                    {item.country1}
                    <span className={classes.matchspan}>vs</span>
                    {item.country2}
                    </div>
                    </div>
                ) )
            }
        </Carousel> */}


{skeleton ? <Skeleton class={classes.carouselskeleton} variant="rectangular" width="100%" height="100%" /> :
        <div className={classes.livecrictoday}>

           <h1 className='livehead'><span>Cricket</span> Live</h1>
           <div className='target-live-scores'>  
           {
           todayLiveMatches.map((data)=>(
           <div className='tour-name-match'>
            <p>{data?.tournament_name}</p>
             {
              data?.data?.map((item)=>(
             <div style={{display:"flex",flexDirection:"column"}} className='football-score' onClick={()=>handleLiveMatch(item,data)}>
            <div className='total-tour-match-block' style={{display:"flex",flexDirection:"row"}}>
            <div className='team-opnt-1'>  
            <div className='team-name-match-1'>{item?.homeTeamName}</div>
             <img  src={item.homeTeamLogo ?item?.homeTeamLogo :"https://letswinsports.io/service/img/flag/logo-color.png"} className='team1'alt={item.homeTeamLogo} width="25px" height="25px"/>
             </div>
             <span className='vs'>vs</span>
             <div className='team-opnt-2'>
             <div className='team-name-match-2'>{item?.awayTeamName}</div>
             <img src={item?.awayTeamLogo ?item?.awayTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} className='team2' alt={item.awayTeamLogo} width="25px" height="25px"/>
             </div>
             </div>
          </div>
            ))}        
           </div>
))}
           </div>

           <div className='country'>

           <span className='country-list'>Country</span>

           <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.countrytransparent}
    >
      {countryList?.map( (item) => (
      <ListItemButton disabled={true} style={{cursor:'context-menu',opacity:'1'}} >
        <ListItemIcon>
          <img alt={item?.id} src={item?.logo} width="25px" height="25px"/>
        </ListItemIcon>
        <ListItemText primary={item?.name} />
      </ListItemButton>
))}
    </List>

           </div>


           <div className='League'>

            <span className='league-list'>League</span>

           <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.transparent}
    >
 {leagueList.map( (item,i) => (
      <div className='margin-tb' onClick={()=>handleTournament(item)} style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'flex-start'}}>
        <ListItemIcon>
        <img alt={item?.id} src={item?.logo?item?.logo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="25px"/>
        </ListItemIcon>
        <ListItemText primary={item?.name} />
        </div>
        {
        item.id===matchValue&&
        matchList?.map( (data) => (
      
      <ListItemButton className='football-score cricket-league-sideblck' style={{display:'flex',alignItems:'center',opacity:1,cursor:'pointer'}}  onClick={()=>handleStatusHighlights(data)}>
        <div className='total-tour-match-block' style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}  >
        <div className='team-opnt-1'>  
        <div className='team-name-match-1'>{data?.homeTeamName}</div>
        <img className='team1' alt={item?.id} src={data?.homeTeamLogo?data?.homeTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        <span className='vs'>vs</span>
        <div className='team-opnt-2'>
        <div className='team-name-match-2'>{data.awayTeamName}</div>
        <img className='team2' alt={item?.id} src={data?.awayTeamLogo?data?.awayTeamLogo:"https://letswinsports.io/service/img/flag/logo-color.png"} width="25px" height="30px" style={{padding:"2px",borderRadius:"50%",background:"#c9cccc4d"}}/>
        </div>
        </div>
        
        <div style={{fontWeight:'800',width:'100%'}}>
          <p style={{textAlign:'left'}}>Match Time: {moment(data?.matchTime* 1000).local().format('HH:mm A')}</p>
          <p style={{textAlign:'left'}} >Status: {data?.status}</p>
        </div>
      </ListItemButton>
      
))}
      </div>
))}

{/* {leagueList.map( (item,i) => (
  <div>
    <div style={{display:'flex',alignItems:'center',gap:'10px'}} onClick={()=>handleTournament(item,i)}>
     <img alt={item?.id} src={item?.logo?item?.logo:"https://gsad.letswinsports.io/dummyFlag.png"} width="25px" height="25px"/>
     <p>{item.name}</p>
     </div>
     <div>
      {
        item.id===matchValue&&
        matchList?.map((data)=>(
          <div style={{display:'flex',alignItems:'center',gap:'10px'}} >
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img alt={item?.id} src={data?.homeTeamLogo?data?.homeTeamLogo:"https://gsad.letswinsports.io/dummyFlag.png"} width="25px" height="25px"/>
          <p>{data.homeTeamName}</p>
            </div>
            vs
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img alt={item?.id} src={data?.awayTeamLogo?data?.awayTeamLogo:"https://gsad.letswinsports.io/dummyFlag.png"} width="25px" height="25px"/>
          <p>{data.awayTeamName}</p>
            </div>
          
          </div>
        ))
      }
     </div>
  </div>
))} */}

     
    </List>
    

           </div>

        </div>

}
          </Item>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
          <Item className={classes.removeshadow}>
          <div className='top-block'>  
          {liveData && Object?.keys(liveData)?.length !== 0 && <span className={classes.yellowcolor}>Cricket</span>}
         {tournamentName && <h2>{tournamentName}</h2>} 
            <div className='target-live-score-high left'>
             <div className='first-batting-high'><h3>{liveData?.homeTeamName} :<span> 
              
              {liveData?.id?
              cricketSocket?.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===1 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===1 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===1 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===1 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null:null}
                </span></h3></div>
             <div className='secnd-batting-high' style={{display:'flex',alignItems:'center'}}>
              <h3>{liveData !==null && liveData?.awayTeamName } :<span>
                
              {liveData?.id?
              cricketSocket.length !== 0 && cricketSocket[0] === liveData?.id ?
               cricketSocket[4]?.innings !== undefined && cricketSocket[4].innings.length ===2 &&
               cricketSocket[4]?.innings[1][0]===2 ?
               cricketSocket[4]?.innings[1][1]+"/"+cricketSocket[4]?.innings[1][3]+"("+cricketSocket[4]?.innings[1][2]+")":
               cricketSocket[4]?.innings[0][0]===2 ?
               cricketSocket[4]?.innings[0][1]+"/"+cricketSocket[4]?.innings[0][3]+"("+cricketSocket[4]?.innings[0][2]+")"
               :"0/0(0)":
               cricketApiSocket !== undefined && cricketApiSocket[0] === liveData?.id ?
               cricketApiSocket[4]?.innings !== undefined && cricketApiSocket[4].innings.length ===2 &&
               cricketApiSocket[4]?.innings[1][0]===2 ?
               cricketApiSocket[4]?.innings[1][1]+"/"+cricketApiSocket[4]?.innings[1][3]+"("+cricketApiSocket[4]?.innings[1][2]+")":
               cricketApiSocket[4]?.innings[0][0]===2 ?
               cricketApiSocket[4]?.innings[0][1]+"/"+cricketApiSocket[4]?.innings[0][3]+"("+cricketApiSocket[4]?.innings[0][2]+")"
               :"0/0(0)":null:null}
         </span></h3>
             </div>
             </div>
             <div className='block-point-outer'>
                <Link to="/cricket">
                {liveData &&Object?.keys(liveData).length !== 0 && 
                <div className='block-point-1'>
                <img alt={manchester}  src={liveData && liveData.homeTeamLogo ?liveData.homeTeamLogo :"https://letswinsports.io/service/img/flag/logo-color.png"}  className='team1-banner-point'/>
                {liveData.homeTeamName && <span className='team-name'>{liveData.homeTeamName}</span>}:
                <span className='team-points'>{cricketSocket.length !==0 &&
                cricketSocket[0] === liveData?.id ? cricketSocket[3]?.ft[0]:
                (cricketApiSocket !==undefined &&cricketApiSocket[0] === liveData.id) ?cricketApiSocket[3]?.ft[0]:"0/0(0)"
              }</span>
                </div>
}
                </Link>
                <Link to="/cricket">
                {liveData &&Object?.keys(liveData).length !== 0 && 
                <div className='block-point-2'>
                <img alt={barcelona} src={liveData.awayTeamLogo ?liveData.awayTeamLogo :"https://letswinsports.io/service/img/flag/logo-color.png"} className='team2-banner-point'/>
                {liveData.awayTeamName &&<span className='team-name'>{liveData.awayTeamName}</span>}:
                <span className='team-points'>{cricketSocket?.length !==0 &&
                cricketSocket[0] === liveData?.id ? cricketSocket[3]?.ft[1]:
                (cricketApiSocket !==undefined &&cricketApiSocket[0] === liveData?.id) ?cricketApiSocket[3]?.ft[1]:"0/0(0)"
                }</span>
                </div>
}
                </Link>
                
             </div> 
           </div>

           <div className='scoreboard'>

            <div className='bottom-block'>
                <h3 className='bottom-block-head'><span className='cicket-font'>Cr<span>i</span>cket</span> Games</h3>
                <div className="date-right"></div>
            </div>

            <ScoreBoard isHighlightDisplay={isHighlightDisplay} setIsHighlightDisplay={setIsHighlightDisplay} firstInningsExtra={firstInningsExtra} secondInningsExtra={secondInningsExtra} liveData ={liveData} cricketSocket={cricketSocket} cricketApiSocket={cricketApiSocket}/>

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
  )
}

export default RightContent
