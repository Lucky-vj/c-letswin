
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
import KYC from "layouts/kyc";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
import Bidding from "layouts/bidding";
import Users from "layouts/users";
import SignIn from "layouts/authentication/sign-in";
import SubAdmin from "layouts/subadmin";
import Asset from "layouts/asset";
import Wealth from "layouts/wealth";
import Withdraw from "layouts/withdraw";
import Settings from "layouts/settings";
import Paymenthistory from "layouts/paymenthistory";
import Twofa from "layouts/authentication/twofactor";
import Reset from "layouts/authentication/reset";
import Games from "layouts/games";
import Transaction from "layouts/transaction";
import GamesList from "layouts/gameslist";
import FootBall from "layouts/football"
import Cricket from "layouts/cricket"
import CMS from 'layouts/cms'
// import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "KYC",
    key: "KYC",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/KYC",
    component: <KYC />,
  },
  {
    type: "collapse",
    name: "Betting History",
    key: "betting",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/betting",
    component: <Bidding />,
  },
  {
    type: "collapse",
    name: "Sub Admin",
    key: "sub-admin",
    icon: <Icon fontSize="small">group_icon</Icon>,
    route: "/sub-admin",
    component: <SubAdmin />,
  },
  {
    type: "collapse",
    name: "Asset",
    key: "asset",
    icon: <Icon fontSize="small">account_balance_wallet</Icon>,
    route: "/asset",
    component: <Asset />,
  },
  {
    type: "collapse",
    name: "Wealth",
    key: "wealth",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/wealth",
    component: <Wealth />,
  },
  {
    type: "collapse",
    name: "Withdraw",
    key: "withdraw",
    icon: <Icon fontSize="small">account_balance</Icon>,
    route: "/withdraw",
    component: <Withdraw />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Settings />,
  },
  {
    type: "collapse",
    name: "Payment History",
    key: "payment-history",
    icon: <Icon fontSize="small">receipt_icon</Icon>,
    route: "/payment-history",
    component: <Paymenthistory />,
  },
  // {
  //   type: "collapse",
  //   name: "Tournament",
  //   key: "games",
  //   icon: <Icon fontSize="small">insert_invitation_icon</Icon>,
  //   route: "/tournament",
  //   component: <Games />,
  // },
  {
    type: "collapse",
    name: "FootBall Match",
    key: "football",
    icon: <Icon fontSize="small">insert_invitation_icon</Icon>,
    route: "/football",
    component: <FootBall />,
  },
  {
    type: "collapse",
    name: "Cricket Match",
    key: "cricket",
    icon: <Icon fontSize="small">insert_invitation_icon</Icon>,
    route: "/cricket",
    component: <Cricket />,
  },
  {
    type: "collapse",
    name: "CMS",
    key: "cms",
    icon: <Icon fontSize="small">insert_invitation_icon</Icon>,
    route: "/cms",
    component: <CMS/>,
  },
  {
    type: "collapse",
    name: "Games",
    key: "gameslist",
    icon: <Icon fontSize="small">sports_esports_icon</Icon>,
    route: "/gameslist",
    component: <GamesList />,
  },
  {
    type: "collapse",
    name: "Transaction",
    key: "transaction",
    icon: <Icon fontSize="small">repeat</Icon>,
    route: "/transaction",
    component: <Transaction />,
  },
  {
    route: "/twofa",
    key: "login",
    component: <Twofa />,
  },
  {
    route: "/reset",
    key: "reset",
    component: <Reset />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },

  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    icon: <Icon fontSize="small">login</Icon>,
    route: "/login",
    key: "login",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },

];

export default routes;
