import React,{useState} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
// import BodyContent from '../BodyContent/BodyContent';
// import Whitebar from '../Whitebar';
// import Whitetopblock from '../Whitetopblock';
import './Homepage.css';
import Homebanner from '../Video/Homebanner'
import HomeBodyContent from '../HomeBodyContent/HomeBodyContent';
import FooterHome from '../FooterHome/FooterHome';


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


export default function Homepage() {

  const classes = useStyles();

  const[loader,setLoader] = useState(false)

  setTimeout(()=>{
setLoader(false)
  },6000)

  return (

    <div className='homepage-body-cls'>

      {
        loader?
<div style={{overflow:'hidden'}}>
<video autoPlay={true}  style={{width:'100%',height:'100vh'}}>
            <source src="https://letswinsports.io/service/img/video/loader.mp4" type="video/mp4"/>
        </video>
</div>

:

 <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
      
    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className='desktop-view' style={{position:'sticky',zIndex:'99999',height:'100vh',top:'0px'}}>
    <Item className={classes.sidebarcls}><Sidebar /></Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
    <Item className={classes.removeshadow}>
      <Header />
      <Homebanner/>
      <HomeBodyContent/>
      <FooterHome/>
      </Item>
    </Grid>
    </Grid>
    </Box> 
      }




    
    


    

    </div>
  )
}

