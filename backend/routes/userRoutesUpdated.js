const express = require('express');

const router = express.Router();

const matchController = require('../controllers/matchController')
const betInfoController = require('../controllers/betInfoController')
const userController = require('../controllers/appuserController')


router.get('/cricket-list-tournament',matchController.listCricketTournamentVersion2)
router.post('/cricket-list-matches',matchController.listCricketMatchesVersion2)
router.post('/cricket-list-matches-players',matchController.listCricketTeamPlayersVersion2)
router.get('/get_today_cricket_match',matchController.getTodayCricketMatch)
router.post('/get_calender_cricket_match',matchController.getCalenderCricketMatch)
router.post('/cricket-real-time-data',matchController.cricketRealTimeDataSocket)
router.post('/cricket_create_bet',betInfoController.createCricketBetting)
// router.post('/cricket-realtime-data',matchController.footballRealTimeData)
router.post('/cricket-user-betting-history',matchController.cricketUserBettingHistory)
router.post('/cricket-match-betting-history',matchController.cricketMatchBettingHistory)

//for website cricket
router.get('/website/cricket-list-countries',matchController.cricketListCountries);
router.get('/website/cricket-list-tournament',matchController.listCricketTournamentVersion2);
router.get('/website/cricket-live-matches',matchController.getTodayCricketMatch)
router.get('/website/get_today_cricket_match',matchController.getTodayCricketMatch)
router.post('/website/cricket-list-matches',matchController.listCricketMatchesVersion2)
router.post('/website/cricket-finished-matches-players',matchController.cricketFinishedMatchesPlayers)
router.post('/website/cricket-live-matches-players',matchController.cricketLiveMatchesPlayers)
router.get('/website/today-cricket-live-matches',matchController.getTodayLiveCricketMatches)
router.post('/website/cricket-live-score',matchController.cricketRealTimeDataSocket)
router.get('/website/cricket-finished-matches',matchController.cricketFinishedMatches)
router.get('/website/cricket-match-type',matchController.cricketFinishedMatches)
 
//for football website
router.get('/website/football-list-countries',matchController.footballListCountries);
router.get('/website/football-list-tournament',matchController.listFootballTournamentVersion2);
router.get('/website/football-list-tournament-with-matches',matchController.getTodayFootballMatchDetails);
router.post('/website/football-list-matches',matchController.getTodayFootballMatches);
router.get('/website/football-current-matches',matchController.getTodayCurrentFootballMatch);
router.post('/website/football-realtime-data-matches',matchController.footballRealTimeDataSocket);
router.get('/website/football-top-matches-betting',matchController.getTopFootballMatchesByBetting)
router.get('/website/football-first-matches-betting',matchController.getFirstFootballMatchesByBetting)
router.post('/website/football-lineup',matchController.footballMatchLineupWebsite)

router.get("/website/cricket-top-emerging-players",userController.getCricketTopEmergingPlayers)
router.get("/website/football-top-emerging-players",userController.getFootballTopEmergingPlayers)

router.get('/website/get-news-content',userController.getNewsContent)

// router.post('/website/')

module.exports = router;