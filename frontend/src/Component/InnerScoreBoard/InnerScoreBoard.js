import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Commentry from '../Commentary/Commentary';
import './InnerScoreBoard.css'
import Highlights from '../Highlights/Highlights';
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

export default function BasicTabs({isHighlightDisplay,setIsHighlightDisplay,liveData,cricketSocket,cricketApiSocket,firstInningsExtra,secondInningsExtra}) {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // console.log(newValue,'newdaasd');
    setValue(newValue);
    setIsHighlightDisplay(false)
  };


 
  
  React.useEffect(()=>{
    
  // console.log(isHighlightDisplay)
  //  if(value===0){
  //   setValue(0)
  //  }
   if(isHighlightDisplay){
    setValue(1)
   }
    
  },[isHighlightDisplay])

  // console.log(liveData,cricketSocket,cricketApiSocket,'cricket');

  return (
    <Box className='tab-mid-part' sx={{ width: '100%' }}>
      <Box className='tab-mid-part-tabs' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Scorecard" {...a11yProps(0)} />
          <Tab label="Highlights" {...a11yProps(1)} />
          {/* <Tab label="Highlights" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Commentry firstInningsExtra={firstInningsExtra} secondInningsExtra={secondInningsExtra} liveData={liveData} cricketSocket={cricketSocket} cricketApiSocket={cricketApiSocket}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Highlights/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <Highlights/>
      </TabPanel> */}
    </Box>
  );
}