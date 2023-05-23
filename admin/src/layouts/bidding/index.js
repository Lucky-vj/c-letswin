
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { endpoints } from "../../auth/url";
import usercalls from "../../auth/endpoints";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import MDButton from "components/MDButton";
import moment from "moment";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
function Tables() {
  const path = usercalls();
  const [collection, setCollection] = useState({})
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getdata();
  }, [])

  const getdata = async () => {
    setLoading(true);
    const url = endpoints.footBallBettingHistory;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          buildData(result.data);
          setLoading(false);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  const getdata1 = async () => {
    setLoading(true);
    const url = endpoints.cricketBettingHistory;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          buildData(result.data);
          setLoading(false);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  const buildData = (users, index) => {
    const tempArr = [];
    users.forEach((element, index) => {
      console.log(element,"fghjkl");
      var temp = {}
      temp.srno = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index + 1}
        </MDTypography>
      )
      temp.email = (
        <MDTypography variant="caption" color="text" fontWeight="bold" >
          {element.userDetail.email}
        </MDTypography>
      )
      temp.username = (
        <MDTypography variant="caption" color="text" fontWeight="bold" >
          {element.userDetail.name}
        </MDTypography>
      )
      temp.tournamentname = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.match_info.match_name ?element.match_info.match_name:"-"}
        </MDTypography>
      )
      temp.matchname = (
        <MDTypography variant="caption" color="text" fontWeight="medium" style={{display:'flex',alignItems:'center',width:'100%',margin:'auto',gap:'20px'}}>
         <div style={{display:'flex',alignItems:'center',justifyContent:'end',width:'50%',gap:'5px',margin:'auto'}}>
         <b style={{color:'black',textAlign:'right'}}>{element.match_info.home_team_name} </b> 
          
          <img src={element.match_info.home_team_logo?element.match_info.home_team_logo:"dummyFlag.png"} alt="home_team_logo" style={{width:"25px"}}/>
         </div>
         <div>  VS </div>
      <div style={{display:'flex',alignItems:'center',width:'50%',justifyContent:'start',gap:'5px',margin:'auto'}}>
      <img src={element.match_info.away_team_logo?element.match_info.away_team_logo : "dummyFlag.png"} alt="home_team_logo" style={{width:"25px"}}/>
   
        <b style={{color:'black',textAlign:'left'}}> {element.match_info.away_team_name}</b> 
      </div>
        
        
        </MDTypography>
      )
      temp.time = (
        <MDTypography variant="caption" color="text" fontWeight="medium"> 
         {moment(element.match_info.match_time * 1000).local().format('lll')}
        </MDTypography>
      )
      temp.betamount = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.bet_amount}
        </MDTypography>
      )
      temp.betinfo = (
        // value ==='1'?
       <div style={{textAlign:'left'}}>
          {element.winning_team ===true &&
          <MDTypography variant="caption" color="text" fontWeight="medium" >
           Bet Type :Team
           <br/>Team Name :{element.winning_team_name ==="home"? element.match_info.home_team_name:element.winning_team_name ==="away"?element.match_info.away_team_name:element.winning_team_name}
          </MDTypography>}
          {element.time_bet ===true &&
          <MDTypography variant="caption" color="text" fontWeight="medium" >
           Bet Type :Time Bet
           <br/>Time :{element.time} <br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>}
          {element.double_chance ===true &&
          <MDTypography variant="caption" color="text" fontWeight="medium">
          Bet Type :Double chance<br/>
          Double chance Type :{element.double_chance_reason.split('_')[2]}/draw<br/>
          Team Name :{element.double_chance_reason.split('_')[0] ==="home"?element.match_info.home_team_name:element.match_info.away_team_name}
          </MDTypography>
    }
     {element.total_bet ===true &&
          <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :overAll<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>}{
            element.first_half_bet ===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :overAll / First Half<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
          { element.second_half_bet ===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :overAll / Second Half<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>}
          { element.away_team_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :OverAll<br/>
           Team Name :{element.match_info.away_team_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
           { element.away_team_first_half_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :First Half<br/>
           Team Name :{element.match_info.away_team_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
           { element.away_team_second_half_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium"style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :Second Half<br/>
           Team Name :{element.match_info.away_team_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
            { element.home_team_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :OverAll<br/>
           Team Name :{element.match_info.home_team_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
           { element.home_team_first_half_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :First Half<br/>
           Team Name :{element.match_info.home_team_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
           { element.home_team_second_half_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Goal<br/>
           Goal Type :Second Half<br/>
           Team Name :{element.match_info.home_team_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
           { element.is_player_bet===true &&
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
           Bet Type :Player<br/>
           Player Name :{element?.player_name}<br/>
           Number of Goals :{element.no_of_goals}
          </MDTypography>
          }
          {/* </div>:
        <div style={{textAlign:'left'}}> */}
        {element.bet_type ==="run"&&
          <MDTypography variant="caption" color="text" fontWeight="medium" >
           Bet Type :Run
           <br/>
          
           No of Over :{element.no_of_over}<br/>
           No of Ball :{element.no_of_ball}<br/>
           No of run:{element.no_of_run}<br/>
          </MDTypography>}
          {element.bet_type ==="extra"&&
          <MDTypography variant="caption" color="text" fontWeight="medium" >
           Bet Type :Extra
           <br/>
           Team Name :{element.betting_team ==="home"? element.match_info.home_team_name:element.betting_team ==="away"?element.match_info.away_team_name:element.betting_team}<br/>
           No of Over :{element.no_of_over}<br/>
           No of Ball :{element.no_of_ball}<br/>
           No of run:{element.no_of_run}<br/>
           Extra Reason :{element.extra_description ==='WD' ?"Wide" :element.extra_description ==='NB' ?'No Ball':
           element.extra_description ==='LB'? "Leg Byes" :element.extra_description ==='B'?'Byes':
           element.extra_description ==='P'? "Penalty":null}
           <br/>
          </MDTypography>
          }
          {element.bet_type ==="wicket"&&
          <MDTypography variant="caption" color="text" fontWeight="medium" >
           Bet Type :Wicket
           <br/>
           Team Name :{element.betting_team ==="home"? element.match_info.home_team_name:element.betting_team ==="away"?element.match_info.away_team_name:element.betting_team}<br/>
           No of Over :{element.no_of_over}<br/>
           No of Ball :{element.no_of_ball}<br/>
          </MDTypography>
          }
          </div>
      )
      temp.winprice = (
        <MDTypography variant="caption" color="text" fontWeight="medium" style={{textAlign:'left'}}>
          {element.winning_price}
        </MDTypography>
      )
      temp.betstatus = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.status === 0 ?
            <> <DoDisturbIcon fontSize="small"
              color="secondary" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Pending</> :
            <>
          {element.status === 1 ?
            <> <DoDisturbIcon fontSize="small"
              color="error" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Lose</> :
            <>
              {element.status === 2 ?
                <> <CheckCircleIcon fontSize="small"
                  color="success" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Win</> :
                <> <CancelIcon fontSize="small"
                  color="error" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Cancel</>}
            </>}</>}
        </MDTypography>
      )
      tempArr.push(temp)

    });
    setCollection({
      columns: [
        { Header: "SR.No", accessor: "srno", align: "center" },
        { Header: "Email", accessor: "email", align: "center" },
        { Header: "User Name", accessor: "username", align: "center" },
        { Header: "Tournament Name", accessor: "tournamentname", align: "center" },
        { Header: "Match Name", accessor: "matchname", align: "center" },
        { Header: "Match Time", accessor: "time", align: "center" },
        { Header: "Bet Amount", accessor: "betamount", align: "center" },
        { Header: "Bet Details", accessor: "betinfo", align: "center" },
        { Header: "Winning Price", accessor: "winprice", align: "center" },
        { Header: "Betting Status", accessor: "betstatus", align: "center" }
        
      ],
      rows: tempArr
    })
  }
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "1") {
      getdata("football");
    } else if (newValue === "2") {
       getdata1("cricket")
    } 
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TabContext value={value}>
        <Grid container px={3}>
          <Grid item xs={12} md={7} >
            <Box>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Foot Ball" value="1" />
                <Tab label="Cricket" value="2" />
            
              </TabList>
            </Box>
          </Grid>
        </Grid>
        <TabPanel value="1">
          <MDBox pt={6} pb={3}>
            <Grid container >
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                     Betting History
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    {loading ?
                      <>
                        {collection && collection.rows &&
                          <DataTable
                            table={collection}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            noEndBorder
                            loading={loading} />
                        }
                      </> : <>
                        {collection && collection.rows && collection.rows.length > 0 ? (
                          <DataTable
                            table={collection}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            noEndBorder
                          />) :
                          (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                              No Record Found
                            </div>
                          )
                        }
                      </>}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </TabPanel>
        <TabPanel value="2">
          <MDBox pt={6} pb={3}>
            <Grid container>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Betting History
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>

                    {loading ?
                      <>
                        {collection && collection.rows &&
                          <DataTable
                            table={collection}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            noEndBorder
                            loading={loading} />
                        }
                      </> : <>
                        {collection && collection.rows && collection.rows.length ? (
                          <DataTable
                            table={collection}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            noEndBorder
                          />) :
                          (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                              No Record Found
                            </div>
                          )
                        }
                      </>
                    }
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </TabPanel>
      </TabContext>
   
    </DashboardLayout>
  );
}

export default Tables;
