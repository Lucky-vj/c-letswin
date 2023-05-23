const BaseUrl = "https://letswinsports.io/service/api/v1";
const adminBaseUrl = "https://letswinsports.io/service/api/v1/admin";
const adminBaseUrlv2 = "https://letswinsports.io/service/api/v2/admin";
const userBaseUrl = "https://letswinsports.io/service/api/v1/users";
const paymentBaseUrl = "https://letswinsports.io/service/api/v1/payment";

// const BaseUrl = "/api/v1";
// const adminBaseUrl = "/api/v1/admin";
// const paymentBaseUrl = "/api/v1/payment";

export const endpoints = {
    //dashboad
    dashboard: `${adminBaseUrl}/admin-details`,
    //uploadimage
    upload: `${BaseUrl}/upload`,
    update:`${adminBaseUrl}/update`,
    aboutus:`${adminBaseUrl}/update_document`,
    getDoc:`${adminBaseUrl}/get_document`,
    sendNotification :`${adminBaseUrl}/create-notification`,
    //User flow
    adminlogin: `${adminBaseUrl}/login`,
    twofacreate: `${adminBaseUrl}/2fa-create`,
    twofaverify: `${adminBaseUrl}/2fa-verify`,
    twofaenable: `${adminBaseUrl}/2fa-enable`,
    addtoken: `${adminBaseUrl}/addtoken`,
    deletetoken: `${adminBaseUrl}/debit-token`,
    resetpassword: `${adminBaseUrl}/reset`,
    listtournament: `${adminBaseUrl}/tournament`,
    deletetournamet: `${adminBaseUrl}/tournament`,
    bethistory: `${adminBaseUrl}/list-bet`,
    live: `${adminBaseUrl}/get_live_game`,
     
    //Sub Admin
    subadmincreate: `${adminBaseUrl}/create`,
    subadminlist: `${adminBaseUrl}/listadmins`,
    changepassword: `${adminBaseUrl}/change-password`,

    //Users
    getusers: `${adminBaseUrl}/getusers`,
    deposithistory: `${adminBaseUrl}/deposit-history`,

    //Asset
    createasset: `${BaseUrl}/asset`,

    //payment history
    paymenthistory: `${paymentBaseUrl}/listtransactions`,
    paymenthistorytype: `${paymentBaseUrl}/listtransactionstype`,
    withdrawlist: `${paymentBaseUrl}/withdraw-requests`,
    withdrawhistory: `${paymentBaseUrl}/withdraw-history`,
    withdrawinitiate: `${paymentBaseUrl}/withdraw_from_admin`,
    withdrawedit: `${paymentBaseUrl}/withdraw-edit`,

    //Transaction
    overalltransaction: `${adminBaseUrl}/overall`,

    //adminwallet
    adminwallet: `${adminBaseUrl}/adminwallet`,
    footBallBettingHistory:`${adminBaseUrl}/football-user-betting-history-admin`,
    //Cricket Matches
    addgame: `${adminBaseUrl}/game`,
    cricketMatchInfo: `${adminBaseUrl}/cri-matches`,
    cricketTournamentInfo: `${adminBaseUrl}/tournament-info`,
    cricketMatchdetailsInfo: `${adminBaseUrl}/match`,
    getmatch: `${adminBaseUrl}/2day-matches`,
    playerinfo: `${BaseUrl}/users/player-info`,
    cricketBettingHistory:`${adminBaseUrlv2}/cricket-user-betting-history-admin`,
    //football matches
    listfootballtournament :`${adminBaseUrl}/football-list-tournament`,
    listfootballmatch :`${adminBaseUrl}/football-list-matches`,
    liveTracker :`${BaseUrl}/users/football-widget?match_key=23xmvkhp6wkyqg8`,
    setBetAmount :`${adminBaseUrl}/football-betting-admin`,
    editBetAmount:`${adminBaseUrl}/football-betting-admin-edit`,
    editCricketBetAmount:`${adminBaseUrlv2}/cricket-betting-admin-edit`,
    footBallBtAmtMatch:`${adminBaseUrl}/football-betting-admin-list`,
    footBallLiveScore :`${adminBaseUrl}/football-realtime-data`,
    footballPlayersList:`${adminBaseUrl}/football-lineup`,
     footBallTodayMatch :`${adminBaseUrl}/get_today_football_match_admin`,
     cricketTodayMatch :`${adminBaseUrlv2}/get_today_cricket_match_admin`,
    //v2 cricket matches
    listCricketTournament :`${adminBaseUrlv2}/cricket-list-tournament`,
    listcricketmatch :`${adminBaseUrlv2}/cricket-list-matches`,
    setCricketBetAmount :`${adminBaseUrlv2}/cricket-betting-admin`,
    cricketBtAmtMatch:`${adminBaseUrlv2}/cricket-betting-admin-list`,
    cricketLiveScore:`${adminBaseUrlv2}/cricket-real-time-data`,
    cricketPlayersList:`${adminBaseUrlv2}/cricket-list-matches-players`,
    newsUpload:`${adminBaseUrl}/update-news-content`,
    newsContent:`${adminBaseUrl}/get-news-content`,
    deleteNewsContent:`${adminBaseUrl}/delete-news-content`,
    editNewsContent:`${adminBaseUrl}/edit-news-content`
};
