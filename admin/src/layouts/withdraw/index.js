import * as React from 'react';
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

// Images
import MDTypography from "components/MDTypography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { endpoints } from "../../auth/url";
import WithdrawList from "./components/WithdrawList";
import usercalls from "../../auth/endpoints";
import { ToastContainer, toast } from 'react-toastify'
import moment from "moment";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Socket } from '../../socket/useSocket';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};
const buttonStyle = {
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "between",
};
function Users() {
  const path = usercalls();
  const navigate = useNavigate();
  const [viewdetails, setViewdetails] = useState(false)
  const [collection, setCollection] = useState({})
  const [user, setUser] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(true)
  const [elementt, setElementt] = useState();
  const [indexvalue, setIndexvalue] = useState();

  const ViewUserdetails = () => {
    setViewdetails(!viewdetails);
  }
  useEffect(() => {
    getdata();
  }, [])

  const getdata = async () => {
    setLoading(true);
    var url = endpoints.withdrawlist;
    try {
      const data = await path.getCall({ url });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.data) {
          buildData(Array.isArray(result.data) ? result?.data : new Array(result?.data))
          setLoading(false);
          setUser(result.data.data)
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const soc = Socket();

  soc?.on('withdraw', (result) => {
    // console.log(result);
    // buildData1(result);
  })

  const initiaterequst = async () => {
    var url = endpoints.withdrawedit;
    var payload = {
      "_id": elementt._id,
      "status": "5"
    }
    try {
      const data = await path.putCall({ url, payload });
      const result = await data.json();
      if (result.status === true) {
        if (result && result.msg) {
          toast.success("Initiated Successfully", {
            duration: 3000,
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          handleClose();
        }
        else {
          toast.error(result.msg, {
            duration: 3000,
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          handleClose();
        }
      }
    }
    catch (error) {
      console.error(error);
    }

  }

  const deleteReq = async (element, index) => {
    // handleOpen();
    setElementt(element);
    setIndexvalue(index);
    var url = endpoints.withdrawedit;
    var payload = {
      "_id": element._id,
      "status": "6",
      "status_text":"Admin cancel your withdraw request"
    }
    try {
      const data = await path.putCall({ url, payload });
      const result = await data.json();
      if (result.status === true) {
        toast.success(result.msg, {
          duration: 3000,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        getdata("requst");
      }
      else {
        toast.error(result.msg, {
          duration: 3000,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const addInitiate = async (element, index) => {
    setElementt(element);
    setIndexvalue(index);
    handleOpen();
    const url = endpoints.withdrawinitiate;
    var payload = {
      "no_of_token": element.no_of_token,
      "tokenAmount": element.live_price,
      "currency": element.coin,
      "withdrawAddress": element.send_address,
      "add_tx_fee": 2,
      "transaction_type": element.transaction_type,
      "withdraw_id": element._id

    }
    try {
      const data = await path.postCall({ url, payload });
      const result = await data.json();
      if (result.status === true) {
        //
      }
      else {
        toast.error(result.msg, {
          duration: 3000,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    }
    catch (error) {
      console.error(error);
    }
    getdata("requst");
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
      temp.coin = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.coin}
        </MDTypography>
      )
      temp.token = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.no_of_token * element.live_price}
        </MDTypography>
      )
      temp.address = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element.send_address}
        </MDTypography>
      )
      temp.name = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {element && element.user_id && element.user_id.name ? element.user_id.name.toUpperCase() : "----"}
        </MDTypography>
      )
      temp.action = (
        <>
          <MDButton color="success" size="small" onClick={() => addInitiate(element, index)}>
            Initiate
          </MDButton>
          <MDButton color="error" size="small" onClick={() => deleteReq(element, index)} sx={{ marginLeft: "10px" }}>
            Cancel
          </MDButton>
        </>

      )
      tempArr.push(temp)

    });
    setCollection({
      columns: [
        { Header: "SR.No", accessor: "srno", align: "center" },
        { Header: "Date and Time", accessor: "date", align: "center" },
        { Header: "Name", accessor: "name", width: "10%", align: "center" },
        { Header: "Recepient", accessor: "address", align: "center" },
        { Header: "Asset", accessor: "coin", align: "center" },
        { Header: "Token", accessor: "token", align: "center" },
        { Header: "Action", accessor: "action", width: "10%", align: "center" },
      ],
      rows: tempArr
    })
  }

  return (
    <DashboardLayout>
      {open && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <MDTypography id="transition-modal-title" variant="h5" component="h5">
                Are you want to initiate requst?
              </MDTypography>
              <Box sx={buttonStyle}>
                <MDButton
                  onClick={initiaterequst}
                  color="info"
                  size="small"
                  style={{ margin: "0 10px" }}
                >
                  OK
                </MDButton>
                <MDButton
                  onClick={handleClose}
                  color="info"
                  size="small"
                  style={{ margin: "0 10px" }}
                >
                  Cancel
                </MDButton>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DashboardNavbar />

      <WithdrawList
        collection={collection}
        loading={loading}
        Viewdetails={ViewUserdetails}
        tablename="Withdraw Request" />

    </DashboardLayout >
  );
}

export default Users;
