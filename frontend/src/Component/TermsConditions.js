import React,{useState} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from './Header/Header';
// import Footer from '../Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { makeStyles } from '@mui/styles';
// import BodyContent from '../BodyContent/BodyContent';
// import Whitebar from '../Whitebar';
// import Whitetopblock from '../Whitetopblock';
import './Homepage/Homepage.css';
import FooterHome from './FooterHome/FooterHome';
import './Privacy.css'

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
      background: 'transparent !important'
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
    height: '100%',
    '& :before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '270%',
        background: '#000 !important',
        top:'100%',
        left: "0px"
    }
  },
  whitebarcls: {
    justifyContent: 'center',
    background: '#000 !important',
    borderRadius: '0px !important',
    height: '100vh',
    boxShadow: 'none !important',
  },

});


export default function TermsConditions() {

  const classes = useStyles();

  const[loader,setLoader] = useState(false)

  setTimeout(()=>{
setLoader(false)
  },6000)

  return (

    <div className='homepage-body-cls privacypolicy-page'>


 <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
      
    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className='desktop-view' style={{position:'sticky',zIndex:'99999',height:'100vh',top:'0px'}}>
    <Item className={classes.sidebarcls}><Sidebar /></Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
    <Item className={classes.removeshadow}>
      <Header />
      <div className='privacty-policy-content'>
      <p>An internet gaming company may have policies and procedures in place to ensure compliance with legal and regulatory requirements, as well as to promote fair and responsible gaming. Some examples of policies and procedures that an internet gaming company may have include:</p>
<p><br/></p>
<p>Age verification: A policy and procedure to verify the age of players to ensure that they are of legal gambling age.</p>
<p><br/></p>
<p>Responsible gaming: A policy and procedure to promote responsible gaming and to prevent problem gambling, such as setting deposit limits, self-exclusion options, and providing resources for problem gambling prevention and treatment.</p>
<p><br/></p>
<p>Anti-money laundering (AML) and know-your-customer (KYC) policies: Procedures to prevent money laundering and to verify the identity of customers, in compliance with AML and KYC regulations.</p>
<p><br/></p>
<p>Game fairness and security: Policies and procedures to ensure the fairness and security of the games offered, such as regular testing and certification of the games by third-party auditors.</p>
<p><br/></p>
<p>Data privacy and security: Policies and procedures to protect the personal and financial information of customers, in compliance with data privacy and security regulations.</p>
<p><br/></p>
<p>Complaints and dispute resolution: Procedures for handling customer complaints and disputes in a timely and fair manner.</p>
<p><br/></p>
<p>Marketing and advertising: Policies and procedures for marketing and advertising that are compliant with legal and regulatory requirements, such as not targeting minors or making false or misleading claims.</p>
<p><br/></p>
<p>It&apos;s important to note that laws and regulations vary by jurisdiction, so a gaming company should ensure that its policies and procedures are compliant with the laws and regulations of the jurisdictions in which it operates.</p>

<strong style={{margin:'40px 0 20px 0', display:'inline-block'}}>Terms of Use policy</strong>

<p>A &quot;Terms of Use&quot; policy, also known as a &quot;Terms of Service&quot; policy, is a legal agreement between a website or online service and its users that outlines the terms and conditions of using the service. The policy typically includes information about the rights and responsibilities of both the service provider and the users, as well as any limitations or restrictions on the use of the service. Here are some key elements that may be included in a typical Terms of Use policy:</p>
<p><br/></p>
<p>Eligibility: Information about who is eligible to use the service and any restrictions on use, such as age or location-based restrictions.</p>
<p><br/></p>
<p>Use of the service: Information about how the service can be used, including any limitations or restrictions on the types of content or activities that are allowed.</p>
<p><br/></p>
<p>User-generated content: Information about how the service handles user-generated content, including any rights or licenses granted to the service provider and any restrictions on the use of the content.</p>
<p><br/></p>
<p>Intellectual property rights: Information about who owns the intellectual property rights to the content on the service and any limitations or restrictions on the use of that content.</p>
<p><br/></p>
<p>Privacy policy: Information about how the service collects, uses, and shares user data, as well as any rights users have in relation to their data.</p>
<p><br/></p>
<p>Disclaimer of warranties: Information about the service&apos;s liability and any warranties or guarantees that are provided.</p>
<p><br/></p>
<p>Governing law and jurisdiction: Information about which laws govern the use of the service and where disputes will be resolved.</p>
<p><br/></p>
<p>Changes to the Terms of Use: Information about how the service provider can change the Terms of Use and the process for notifying users of changes.</p>
<p><br/></p>
<p>It&apos;s important to note that terms of use vary by service and jurisdiction, so it is always recommended to review the terms of use before using any service.</p>
      </div>
      <FooterHome/>
      </Item>
    </Grid>
    </Grid>
    </Box> 

    </div>
  )
}

