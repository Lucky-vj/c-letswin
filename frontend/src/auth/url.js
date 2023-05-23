const BaseUrl = "https://letswinsports.io/service/api/v2";
// const BaseUrl = "http://localhost:5000/api/v2"

// const adminBaseUrl = "/api/v1/admin";
// const paymentBaseUrl = "/api/v1/payment";

export const endpoints = {
    //dashboad
    listCountry: `${BaseUrl}/users/website/cricket-list-countries `,
    listLeague : `${BaseUrl}/users/website/cricket-list-tournament`,
    listMatches : `${BaseUrl}/users/website/cricket-list-matches`,
    todayLiveMatches :`${BaseUrl}/users/website/today-cricket-live-matches`,
    cricketSocketMatches :`${BaseUrl}/users/website/cricket-live-score`,
    cricketTableData:`${BaseUrl}/users/website/cricket-live-matches-players`,
    // cricketTableData:`${BaseUrl}/users/website/cricket-live-matches-players`,
    highLightsData:`${BaseUrl}/users/website/cricket-finished-matches`,
    //uploadimage
    listFBCountry: `${BaseUrl}/users/website/football-list-countries`,
    listFBLeague : `${BaseUrl}/users/website/football-list-tournament-with-matches`,
    todayFBLiveMatches :`${BaseUrl}/users/website/football-current-matches`,
    listFBMatches : `${BaseUrl}/users/website/football-list-matches`,
    footBallSocketMatches :`${BaseUrl}/users/website/football-realtime-data-matches`,
    footBallTopMatches :`${BaseUrl}/users/website/football-top-matches-betting`,
    footBallBetMatches :`${BaseUrl}/users/website/football-first-matches-betting`,
    recommendedData:`${BaseUrl}/users/website/get-news-content`,
    cricketTopUsers:`${BaseUrl}/users/website/cricket-top-emerging-players`,
    footballTopUsers:`${BaseUrl}/users/website/football-top-emerging-players`,
    footballLineup:`${BaseUrl}/users/website/football-lineup`,
};
