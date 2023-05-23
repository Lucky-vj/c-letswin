import { useState, useEffect } from "react";
import React from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import { makeStyles } from '@mui/styles'
import { useNavigate } from "react-router-dom";

// Images
import moment from "moment";
import MDTypography from "components/MDTypography";
import SearchIcon from '@mui/icons-material/Search';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { endpoints } from "../../auth/url";
import usercalls from "../../auth/endpoints";
import UserList from "./components/UserList";
import UserView from "./components/UserView";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles({
  inputfields: {
    height: "40px",
    color: "#000",
    padding: " 5px 10px",
    borderRadius: "6px",
    border: "solid 1px #cbcbcb",
    width: "220px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '&:focus-visible': {
      outline: 'none',
    },
  },
});



function Users() {
  const navigate = useNavigate();
  const path = usercalls();
  const [viewdetails, setViewdetails] = useState(false)
  const [bethistory, setBetHistory] = useState(false)
  const [userWallets, setUserWallets] = useState(false)
  const [collection, setCollection] = useState({})
  const [collection1, setCollection1] = useState({})
  const [collection2, setCollection2] = useState({})
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState({})
  const [search, setSearch] = useState('')
  const [walletInfo, setWalletInfo] = useState({})


  const onSearchChange = async (event) => {
    setSearch(event.target.value)
  }
  const classes = useStyles();

  const userWallet = (element) => {
    getUser1(element._id);
    setUserWallets(!userWallets)
  }

  const userWalletsss = () => {
    setUserWallets(!userWallets)
  }
  const ViewUserdetails = () => {
    setViewdetails(!viewdetails);
  }
  const editcoinprice = (element) => {
    getUser(element._id);
    setViewdetails(!viewdetails);
  }
  const bettingHistory = async (element) => {
    getbetdata(element._id);
    setBetHistory(!bethistory)
  }
  const bettingHistoryBack = async () => {

    setBetHistory(!bethistory)
  }

  useEffect(() => {
    getdata();
  }, [])

  useEffect(() => {
    if (search == '') {
      buildData(user)
    } else {
      const query = search.toLowerCase()
      const items = []
      user.filter(function (item) {
        if (item.email) {
          if (item.email.indexOf(query) > -1) {
            items.push(item)
          }
        }
      })
      buildData(items)
    }
  }, [search])

  const getbetdata = async (id) => {
    setLoading(true);
    const url = `${endpoints.bethistory}?user_id=${id}`;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result) {
          buildData2(result.data);
          setLoading(false);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  const getdata = async () => {
    setLoading(true);
    const url = endpoints.getusers;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          buildData(result.data);
          setLoading(false);
          setUser(result.data)
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
      var temp = {}
      temp.srno = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index + 1}
        </MDTypography>
      )
      temp.date = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {moment(new Date(parseInt((element._id).substring(0, 8), 16) * 1000)).format('lll')}
        </MDTypography>
      )
      temp.id = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.email}
        </MDTypography>
      )
      temp.kyc = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.f2A_enable === true ? "Verified" : 'Not Yet'}
        </MDTypography>
      )
      temp.email = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.email_verify === true ? "Verified" : 'Not Yet'}
        </MDTypography>
      )
      temp.action = (
        <Grid container spacing={1} mr={3} px={3} justifyContent="end">
          <Grid item xs={12} md={4} >
            <MDButton color="info" size="small" onClick={() => editcoinprice(element)}>
              View
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} >
            <MDButton color="info" size="small" onClick={() => userWallet(element)}>
              Transactions
            </MDButton>
          </Grid>
          <Grid item xs={12} md={4} >
            <MDButton color="info" size="small" style={{ marginLeft: '30px' }} onClick={() => bettingHistory(element)}>
             Bet History
            </MDButton>
          </Grid>
        </Grid>
      )

      tempArr.push(temp)

    });
    setCollection({
      columns: [
        { Header: "SR.No", accessor: "srno", align: "center" },
        { Header: "Date and Time", accessor: "date", align: "center" },
        { Header: "User Name", accessor: "id", align: "center" },
        { Header: "Email Verify", accessor: "email", align: "center" },
        { Header: "Two FA", accessor: "kyc", align: "center" },
        { Header: "Action", accessor: "action", width: "10%", align: "center" },
      ],
      rows: tempArr
    })
  }
  const buildData1 = (users, index) => {
    const tempArr = [];
    users.forEach((element, index) => {
      var temp = {}
      temp.srno = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index + 1}
        </MDTypography>
      )
      temp.date = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {moment(new Date(parseInt((element._id).substring(0, 8), 16) * 1000)).format('lll')}
        </MDTypography>
      )
      temp.name = (
        <MDTypography variant="caption" color="text" fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
          {element && element.user_id && element.user_id.name ? element.user_id.name : "---"}
        </MDTypography>
      )
      temp.sender = (
        <>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {element && element.actionid && element.actionid.name.toUpperCase()}
          </MDTypography><br />
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {element && element.actionid && element.actionid.roleType.toLowerCase()}
          </MDTypography>
        </>
      )
      temp.credit = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.credit}
        </MDTypography>
      )
      temp.debit = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.debit}
        </MDTypography>
      )
      temp.balance = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.availablebalance ? element.availablebalance : "---"}
        </MDTypography>
      )
      temp.oldbalance = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.oldbalance ? element.oldbalance : "---"}
        </MDTypography>
      )
      temp.type = (
        <>
          {element.type === 'SELL' || element.type === 'BUY' ?
            <>
              {element.type === 'SELL' ?
                < MDTypography sx={{ background: ' linear-gradient(149.99deg, rgb(255 21 21) -0.05%, rgb(227 13 13) -0.05%, rgb(191 17 17) 26.59%, rgb(235 28 28) 59.44%, rgb(201 0 0) 77.17%, rgb(239 16 16) 100.06%)', color: '#fff', padding: ' 5px 10px', borderRadius: ' 6px' }}
                  variant="caption" fontWeight="medium" >
                  {element.type}
                </MDTypography > :
                < MDTypography sx={{ background: 'linear-gradient(149.99deg, #4faf52 -0.05%, #007804 -0.05%, #06990b 26.59%, #4faf52 59.44%, #0fb515 77.17%, #4faf52 100.06%)', color: '#fff', padding: ' 5px 10px', borderRadius: ' 6px' }}
                  variant="caption" fontWeight="medium" >
                  {element.type}
                </MDTypography >}
            </>
            :
            <>
              {element.type === 'DEBIT' ?
                < MDTypography sx={{ background: 'linear-gradient(149.99deg, #760028 -0.05%, #6c0025 -0.05%, #e91e63 26.59%, #db195b 59.44%, #b5164c 77.17%, #78012a 100.06%)', color: '#fff', padding: ' 5px 10px', borderRadius: ' 6px' }}
                  variant="caption" fontWeight="medium" >
                  {element.type}
                </MDTypography > :
                < MDTypography sx={{ background: 'linear-gradient(149.99deg, #a96001 -0.05%, #c36e04 -0.05%, #df7d01 26.59%, #fb8c00 59.44%, #db7b02 77.17%, #ab6000 100.06%)', color: '#fff', padding: ' 5px 10px', borderRadius: ' 6px' }}
                  variant="caption" fontWeight="medium" >
                  {element.type}
                </MDTypography>}
            </>}

        </>
      )

      tempArr.push(temp)

    });
    setCollection2({
      columns: [
        { Header: "SR.No", accessor: "srno", align: "center" },
        { Header: "Date and Time", accessor: "date", align: "center" },
        { Header: "Name", accessor: "name", align: "center" },
        { Header: "Sender", accessor: "sender", align: "center" },
        { Header: "Credit", accessor: "credit", align: "center" },
        { Header: "Debit", accessor: "debit", align: "center" },
        { Header: "Available Balance", accessor: "balance", align: "center" },
        { Header: "Old Balance ", accessor: "oldbalance", align: "center" },
        { Header: "Type", accessor: "type", width: "10%", align: "center" },
      ],
      rows: tempArr
    })
  }
  const buildData2 = (users, index) => {
    const tempArr = [];
    users.forEach((element, index) => {
      var temp = {}
      temp.srno = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index + 1}
        </MDTypography>
      )
      temp.action = (
        <MDTypography variant="caption" color="text" fontWeight="medium" >
          {element.ball_action_text}
        </MDTypography>
      )
      temp.betamount = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.bet_amount}
        </MDTypography>
      )
      temp.matchname = (
        <>
          {element.match_name === 'cricket' ?
            <MDTypography style={{ background: 'linear-gradient(149.99deg, rgb(6 6 229) -0.05%, rgb(0 37 110) -0.05%, rgb(5 54 159) 26.59%, rgb(0 70 255 / 92%) 59.44%, rgb(0 28 255) 77.17%, rgb(2, 27, 110) 100.06%)', color: '#fff', padding: ' 5px 10px', borderRadius: ' 6px' }}
              variant="caption" color="text" fontWeight="medium">{element.match_name}
            </MDTypography>
            :
            <MDTypography style={{ background: ' linear-gradient(149.99deg, rgb(255 21 21) -0.05%, rgb(227 13 13) -0.05%, rgb(191 17 17) 26.59%, rgb(235 28 28) 59.44%, rgb(201 0 0) 77.17%, rgb(239 16 16) 100.06%)', color: '#fff', padding: ' 5px 10px', borderRadius: ' 6px' }}
              variant="caption" color="text" fontWeight="medium">{element.match_name}
            </MDTypography>}

          <MDTypography variant="caption" color="text" fontWeight="medium">
            <div style={{ marginTop: '10px', }}>
              {element.result.name}
            </div>
          </MDTypography>
          <MDTypography variant="caption" color="success" fontWeight="medium">
            {element.result.status}
          </MDTypography>

        </>

      )
      temp.ball = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.no_of_ball}
        </MDTypography>
      )
      temp.over = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.no_of_over}
        </MDTypography>
      )
      temp.run = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.no_of_run}
        </MDTypography>
      )
      temp.win = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.winning_price}
        </MDTypography>
      )
      temp.status = (
              <MDTypography variant="caption" color="text" fontWeight="medium">
          {element?.status === 1 ?
            <> <DoDisturbIcon fontSize="small"
              color="error" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Loss</> :
            <>
              {element?.status === 2 ?
                <> <CheckCircleIcon fontSize="small"
                  color="error" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Win</> :
                <> <ErrorIcon fontSize="small"
                  color="error" fontWeight="bold" sx={{ position: "relative", top: '5px', left: '-4px' }} />Pending</>}
            </>}
        </MDTypography>
      )
      tempArr.push(temp)

    });
    
    setCollection1({
      columns: [
        { Header: "SR.No", accessor: "srno", align: "center" },
        { Header: "Bet Amount", accessor: "betamount", align: "center" },
        { Header: "Event", accessor: "matchname", align: "center" },
        { Header: "Ball", accessor: "ball", align: "center" },
        { Header: "Over", accessor: "over", align: "center" },
        { Header: "Run", accessor: "run", align: "center" },
        { Header: "Winning Price", accessor: "win", align: "center" },
        { Header: "Status", accessor: "status", align: "center" },
      ],
      rows: tempArr
    })
  }
  const getUser = async (id) => {
    const url = `${endpoints.getusers}?_id=${id}`;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          setUserdata(result.data);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  const getUser1 = async (id) => {
    setLoading(true);
    const url = `${endpoints.overalltransaction}?user_id=${id}`;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          buildData1(result.data);
          setLoading(false);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {viewdetails ?
        <>
          <UserView
            Viewdetails={ViewUserdetails}
            userdata={userdata}
            getUser={getUser}
          />
        </>
        :
        <>
          {userWallets ?
            <>
              <UserList
                collection={collection2}
                loading={loading}
                userwallets={userWallet}
                userWalletsss={userWalletsss}
                username="User Transaction Info"
                button="Back" />
            </>
            :
            <>
              {bethistory ?
                < UserList
                  collection={collection1}
                  loading={loading}
                  bettingHistoryBack={bettingHistoryBack}
                  username="User Betting History"
                  button="Back" />
                : <>
                  <Grid container spacing={1} mr={3} justifyContent="end">
                    <Grid item xs={12} md={4} textAlign="right">
                      <div className="mb-3" style={{ position: 'relative' }}>
                        <div className="searchbar-icon1"          >
                          <input
                            type="text"
                            className={classes.inputfields}
                            onChange={onSearchChange}
                            placeholder="Search by User Name"
                          />
                          <span className="search-icon pe-2 text-dark">
                            <SearchIcon sx={{ color: '#88a4b2', marginTop: '10px', position: "absolute", right: "3%" }} />
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <UserList
                    loading={loading}
                    collection={collection}
                    username="Users Info" />
                </>
              }
            </>}
        </>
      }

    </DashboardLayout >
  );
}

export default Users;
