import React,{useState} from 'react'
import './HomeBodyContent.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import HomeLeft from '../HomeLeft/HomeLeft';
import HomeRight from '../HomeRight/HomeRight';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const useStyles = makeStyles({

    homecontleft: {
        background:'#172144',
        boxShadow: 'none !important'
    },
    homecontright: {
        background:'#11162a',
        boxShadow: 'none !important',
        borderRadius: '0px 0px 8px 8px !important',
        paddingBottom: '150px',
        "@media (max-width: 767.98px)": {
            paddingBottom: '100px',
          }
    },
    homecontleftitem: {
        background:'#172144 !important',
        boxShadow: 'none !important',
        borderRadius: '0px !important',
        paddingTop: '50px !important',

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
    }

});



const HomeBodyContent = () => {

    
const [blogContent, setBlogContent] = useState(null);

// console.log(blogContent,'blgassd')

  const classes = useStyles();
  
  return (
    <div className='home-content-part-cls'>

    <Box sx={{ flexGrow: 1 }} className={classes.homecontmain}>
    <Grid container spacing={0} className={classes.homecontmaingrid}>

    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.homecontleft} >
    <Item className={classes.homecontleftitem} >
        <HomeLeft setBlogContent={setBlogContent} blogContent={blogContent}/>
    </Item>
    </Grid>

    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} className={classes.homecontright}>
    <Item className={classes.homecontrightitem}>
        <HomeRight setBlogContent={setBlogContent} blogContent={blogContent}/>
    </Item>
    </Grid>

    </Grid>
    </Box>
      
    </div>
  )
}

export default HomeBodyContent
