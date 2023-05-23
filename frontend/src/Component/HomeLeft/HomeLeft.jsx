import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllNews from '../AllNews/AllNews';
import './HomeLeft.css'
import { endpoints } from "../../auth/url";  
import usercalls from "../../auth/endpoints"; 
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

export default function HomeLeft({setBlogContent,blogContent}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const path = usercalls();
  useEffect(() => {

  getData()
  }, [])
  const [newsData, setNewsData] = useState([])
  const [todayData,setTodayData] = useState([])
  const getData =async()=>{
    const url = `${endpoints.recommendedData}`;
    try {
      const data = await path.getCall({ url});
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
           setNewsData(result.data);
           const todayResult = result?.data?.filter((item,i)=>{
            if(new Date().toLocaleDateString()===new Date(item.createdAt).toLocaleDateString()){
             return item
            }
           })
           console.log(todayResult,'rees')
           setTodayData(todayResult)
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All News" {...a11yProps(0)} />
          {/* <Tab label="Top" {...a11yProps(1)} /> */}
          <Tab label="Today" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className='tabpanel-news-tabs' >
        <AllNews newsData={newsData} setBlogContent={setBlogContent}/>
      </TabPanel>
      {/* <TabPanel value={value} index={1} className='tabpanel-news-tabs'>
        Top News
      </TabPanel> */}
      <TabPanel value={value} index={1} className='tabpanel-news-tabs'>
      <AllNews newsData={todayData} />
      </TabPanel>
    </Box>
  );
}

