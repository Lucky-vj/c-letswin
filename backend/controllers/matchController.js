const Utils = require('../helpers/utils')
const APIRes = require('../helpers/result')
const { validationResult } = require('express-validator')
const touranamentModel = require('../models/tournamentModel')
var axios = require('axios')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('betting-rs-token')
const cricketAuthToken = require('../models/cricketAuthTokenModel')
const matchModel = require('../models/matchModel')
const matchTransaction = require('../models/matchTransactionHistory')
const AppUser = require('../models/appuserModel')
const moment = require('moment')
var zlib = require('zlib')
const ejs = require('ejs')
const adminFootballBetting = require('../models/footballBettingAdmin')
const adminCricketBetting = require('../models/cricketBettingAdmin')
const footballBettings = require('../models/footballBettingModel')
const cricketBettings = require('../models/bettingModel')
const footballBettingAdmin = require('../models/footballBettingAdmin')
const {
  ItemAssignmentContext, ItemAssignmentInstance,
} = require('twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment')
const { resourceLimits } = require('worker_threads')
const betting = require('../models/bettingModel')
const cricketBettingAdmin = require('../models/cricketBettingAdmin')

const footballUser = process.env.FOOTBALL_USER
const footballSecret = process.env.FOOTBALL_SECRET

exports.cricketMatchLists = async (req, res) => {
  try {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const getToken = await cricketAuthToken.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    var config = {
      method: 'get',
      url:
        'https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/featured-tournaments/',
      headers: {
        'rs-token': decryptedData,
      },
    }
    axios(config)
      .then(function (response) {
        return APIRes.getSuccessResult(response?.data?.data, res)
      })
      .catch(function (err) {
        return APIRes.getErrorResult(err, res)
      })
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.touranamentInfo = async (req, res) => {
  try {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    var userInput = Utils.getReqValues(req)
    if (!userInput.tournament_key) {
      return APIRes.getErrorResult('required tournament_key', res)
    }
    var config = {
      method: 'get',
      url: `https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/tournament/${userInput.tournament_key}/`,
      headers: {
        'rs-token': 'v5sRS_P_1570725632827068418s1573646830531646580',
      },
    }

    axios(config)
      .then(function (response) {
        return APIRes.getSuccessResult(response?.data?.data, res)
      })
      .catch(function (err) {
        return APIRes.getErrorResult(err, res)
      })
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.listUpcomingSeries = async (req, res) => {
  try {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    var config = {
      method: 'get',
      url: `https://api.cricapi.com/v1/series?apikey=${process.env.CRICKET_APIKEY}`,
      headers: {},
    }
    axios(config)
      .then(function (response) {
        // const sendData = response?.data?.data?.sort((a,b)=>a.dateTimeGMT-b.dateTimeGMT);
        // sendData.reverse()
        delete response.data.apikey
        return APIRes.getSuccessResult(response?.data?.data.reverse(), res)
      })
      .catch(function (err) {
        return APIRes.getErrorResult(err, res)
      })
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.matchInformation = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    if (!userInput.match_id) {
      return APIRes.getErrorResult('required match id', res)
    }
    const find = await touranamentModel.findOne({
      match_id: userInput.match_id,
    })
    if (!find) {
      return APIRes.getErrorResult('Invalid match id', res)
    }
    var config = {
      method: 'get',
      url: ` https://api.cricapi.com/v1/match_info?apikey=${process.env.CRICKET_APIKEY}&id=${userInput.match_id}`,
      headers: {},
    }
    axios(config)
      .then(function (response) {
        // const sendData = response?.data?.data?.sort((a,b)=>a.dateTimeGMT-b.dateTimeGMT);
        // sendData.reverse()
        delete response.data.apikey
        return APIRes.getSuccessResult(response?.data?.data, res)
      })
      .catch(function (err) {
        return APIRes.getErrorResult(err, res)
      })
  } catch (error) {
    console.log(error)
    return APIRes.getErrorResult(error, res)
  }
}

exports.matchSquad = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    if (!userInput.match_id) {
      return APIRes.getErrorResult('required match id', res)
    }
    const find = await touranamentModel.findOne({
      match_id: userInput.match_id,
    })
    if (!find) {
      return APIRes.getErrorResult('Invalid match id', res)
    }
    var config = {
      method: 'get',
      url: ` https://api.cricapi.com/v1/match_squad?apikey=${process.env.CRICKET_APIKEY}&id=${userInput.match_id}`,
      headers: {},
    }
    axios(config)
      .then(function (response) {
        delete response.data.apikey
        return APIRes.getSuccessResult(response?.data?.data, res)
      })
      .catch(function (err) {
        return APIRes.getErrorResult(err, res)
      })
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.todayMatchList = async (req, res) => {
  try {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const find = await matchModel.aggregate([
      {
        $match: {
          $and: [
            {
              start_at: {
                $gte: moment().startOf('day').format('X'),
                $lte: moment(moment().startOf('day').toDate())
                  .endOf('day')
                  .format('X'),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'tournaments',
          localField: 'tournament_id',
          foreignField: 'tournament_id',
          as: 'tournamentInfo',
        },
      },
      {
        $unwind: {
          path: '$tournamentInfo',
        },
      },
      {
        $project: {
          'tournamentInfo.tournament_info.name': 1,
          'tournamentInfo.tournament_info.start_date': 1,
          'tournamentInfo.tournament_info.competition': 1,
          'tournamentInfo.tournament_image': 1,
          'tournamentInfo.cup_image': 1,
          'tournamentInfo.tournament_id': 1,
          match_key: 1,
          format: 1,
          name: 1,
          status: 1,
          start_at: 1,
          teams: 1,
          title: 1,
          venue: 1,
          winner: 1,
        },
      },
    ])

    //  .find({status:{$ne:"completed"},start_at:{$gte: moment().startOf('day').format("X"),
    //  $lte: moment(moment().startOf('day').toDate()).endOf('day').format("X")}}).select('-players -play -squad').sort({createdAt:-1})
    return APIRes.getSuccessResult(find, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getMatchTransaction = async (req, res) => {
  try {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId } = req.user
    let userInput = Utils.getReqValues(req)
    const user = await AppUser.findById({ _id: userId })
    if (!user) {
      return APIRes.getErrorResult('user not found', res)
    } else {
      const getMatchTransactions = await matchTransaction
        .find({ user_id: user._id })
        .lean()

      const matchDetails = await matchModel.find()

      const matchData = getMatchTransactions.map((data, i) => {
        var matchTransactionModel = matchDetails.find(
          (item) => item.match_key === data.match_id,
        )
        console.log(matchDetails, 'asd')
        return {
          match_name: data?.name,
          match_title: matchTransactionModel?.title,
          betting_team: matchTransactionModel?.teams[data.betting_team],
          type: data?.type,
          match_type: data?.match_name,
          no_of_over: data?.no_of_over,
          no_of_ball: data?.no_of_ball,
          no_of_token: data?.no_of_token,
          oldbalance: data?.oldbalance,
          availablebalance: data?.availablebalance,
          time: moment(data.createdAt).format('X'),
        }
      })

      return APIRes.getSuccessResult(matchData, res)
    }
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

//list of football function

exports.listFootballTournament = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    // data?.results?.forEach((item, i) => {
    //   let setData = {}
    //   setData.data = item
    //   data?.results_extra?.competition?.forEach((ele) => {
    //     if (ele.id === item.competition_id) {
    //       setData.competition = ele
    //     }
    //   })
    //   data?.results_extra?.team?.forEach((ele) => {
    //     if (ele.id === item.home_team_id) {
    //       setData.team = ele
    //     }
    //   })
    //   data?.results_extra?.referee?.forEach((ele) => {
    //     if (ele.id === item.referee_id) {
    //       setData.referee = ele
    //     }
    //   })
    //   data?.results_extra?.venue?.forEach((ele) => {
    //     if (ele.id === item.venue_id) {
    //       setData.venue = ele
    //     }
    //   })
    //   data?.results_extra?.season?.forEach((ele) => {
    //     if (ele.id === item.season_id) {
    //       setData.season = ele
    //     }
    //   })
    //   data?.results_extra?.stage?.forEach((ele) => {
    //     if (ele.id === item.round.stage_id) {
    //       setData.stage = ele
    //     }
    //   })
    //   arr.push(setData)
    // })

    var arr = data?.results_extra?.competition

    arr.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.listFootballMatches = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    const venue = await axios.get(
      `https://api.thesports.com/v1/football/venue/list?user=${footballUser}&secret=${footballSecret}`,
    )
    var arr = []
    data?.results?.forEach((item, i) => {
      // venue.data.results?.forEach((e)=>{
      let sub = {}

      if (item.competition_id === userInput.match_key) {
        // if(e.id ===item.venue_id){
        //   sub.venueData =e
        // }
        sub.id = item.id
        if (item.status_id === 0) {
          sub.status = 'Abnormal(suggest hiding)'
        }
        if (item.status_id === 1) {
          sub.status = 'Not started'
        }
        if (item.status_id === 2) {
          sub.status = 'First half'
        }
        if (item.status_id === 3) {
          sub.status = 'Half-time'
        }
        if (item.status_id === 4) {
          sub.status = 'Second half'
        }
        if (item.status_id === 5) {
          sub.status = 'Overtime'
        }
        if (item.status_id === 6) {
          sub.status = 'Overtime(deprecated)'
        }
        if (item.status_id === 7) {
          sub.status = 'Penalty Shoot-out'
        }
        if (item.status_id === 8) {
          sub.status = 'End'
        }
        if (item.status_id === 9) {
          sub.status = 'Delay'
        }
        if (item.status_id === 10) {
          sub.status = 'Interrupt'
        }
        if (item.status_id === 11) {
          sub.status = 'Cut in half'
        }
        if (item.status_id === 12) {
          sub.status = 'Cancel'
        }
        if (item.status_id === 13) {
          sub.status = 'To be determined'
        }
        // console.log(item);
        sub.homeTeamID = item.home_team_id
        sub.awayTeamID = item.away_team_id
        sub.matchTime = item.match_time

        sub.venueID = item.venue_id

        // venue?.data?.results?.forEach((venueId,index)=>{

        //    if(venueId.id===item.venue_id){

        //      sub.venueID =venueId;
        //    }
        //  })

        data?.results_extra?.team?.forEach((data, i) => {
          if (item.home_team_id === data.id) {
            sub.homeTeamName = data.name
            sub.homeTeamLogo = data.logo
          }
          if (item.away_team_id === data.id) {
            sub.awayTeamName = data.name
            sub.awayTeamLogo = data.logo
          }
        })
        arr.push(sub)
      }
    })
    // })

    arr.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getParticularPlayer = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.playerID) {
      return APIRes.getErrorResult('Require player id', res)
    }
    let result

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/player/with_stat/list?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.playerID}`,
    )

    result = data.results[0]

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballBettingAdmin = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput?.betting_price) {
      return APIRes.getErrorResult('Please provide betting price ', res)
    }
    if (!userInput?.match_id) {
      return APIRes.getErrorResult('Please provide match id ', res)
    }

    if (!userInput?.bet_limit) {
      return APIRes.getErrorResult('Please provide bet limit ', res)
    }

    if (!userInput?.withdraw_type) {
      return APIRes.getErrorResult('Please provide withdraw type ', res)
    }

    if (!userInput?.winning_amount) {
      return APIRes.getErrorResult('Please provide winning amount ', res)
    }

    if (
      userInput?.withdraw_type === 'percentage' &&
      (!userInput?.fee_percentage || userInput?.fee_percentage <= 0)
    ) {
      return APIRes.getErrorResult(
        'Please provide fee percentage (or) fee percentage is less than or equals to zero',
        res,
      )
    }

    const alreadyBet = await adminFootballBetting
      .findOne({ match_id: userInput.match_id })
      .lean()

    if (alreadyBet) {
      return APIRes.getErrorResult('This match bet already created!', res)
    }

    let result = []

    result = await adminFootballBetting.create(userInput)
    result.msg = 'bet created successfully'
    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballBettingAdminList = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const getMatch = await adminFootballBetting
      .find()
      .lean()
      .sort({ createdAt: -1 })

    return APIRes.getSuccessResult(getMatch, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballBettingAdminEdit = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_id) {
      return APIRes.getErrorResult('Require match id', res)
    }

    let whereCodn = {}

    if (userInput.betting_price) {
      whereCodn.betting_price = userInput.betting_price
    }
    if (userInput.bet_limit) {
      whereCodn.bet_limit = userInput.bet_limit
    }
    if (userInput.winning_amount) {
      whereCodn.winning_amount = userInput.winning_amount
    }
    if (userInput.withdraw_type) {
      whereCodn.withdraw_type = userInput.withdraw_type
    }
    if (userInput.fee_percentage) {
      whereCodn.fee_percentage = userInput.fee_percentage
    }

    let result = []
    result = await adminFootballBetting.findOneAndUpdate(
      { match_id: userInput.match_id },
      { $set: whereCodn },
      { upsert: true, new: true },
    )
    result.msg = 'bet updated successfully!'
    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballBettingUser = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    console.log(userInput)

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballMatchInfo = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/lineup/detail?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.match_key}`,
    )
    var arr = []
    console.log(data)

    arr.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.createFootballTournament = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    var arr = []

    data?.results?.forEach((item, i) => {
      let setData = {}
      setData.data = item
      data?.results_extra?.competition?.forEach((ele) => {
        if (ele.id === item.competition_id) {
          setData.competition = ele
        }
      })
      data?.results_extra?.team?.forEach((ele) => {
        if (ele.id === item.home_team_id) {
          setData.team = ele
        }
      })
      data?.results_extra?.referee?.forEach((ele) => {
        if (ele.id === item.referee_id) {
          setData.referee = ele
        }
      })
      data?.results_extra?.venue?.forEach((ele) => {
        if (ele.id === item.venue_id) {
          setData.venue = ele
        }
      })
      data?.results_extra?.season?.forEach((ele) => {
        if (ele.id === item.season_id) {
          setData.season = ele
        }
      })
      data?.results_extra?.stage?.forEach((ele) => {
        if (ele.id === item.round.stage_id) {
          setData.stage = ele
        }
      })
      arr.push(setData)
    })

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballSchedule = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    var arr = []

    data?.results?.forEach((item, i) => {
      let setData = {}
      setData.data = item
      data?.results_extra?.competition?.forEach((ele) => {
        if (ele.id === item.competition_id) {
          setData.competition = ele
        }
      })
      data?.results_extra?.team?.forEach((ele) => {
        if (ele.id === item.home_team_id) {
          setData.team = ele
        }
      })
      data?.results_extra?.referee?.forEach((ele) => {
        if (ele.id === item.referee_id) {
          setData.referee = ele
        }
      })
      data?.results_extra?.venue?.forEach((ele) => {
        if (ele.id === item.venue_id) {
          setData.venue = ele
        }
      })
      data?.results_extra?.season?.forEach((ele) => {
        if (ele.id === item.season_id) {
          setData.season = ele
        }
      })
      data?.results_extra?.stage?.forEach((ele) => {
        if (ele.id === item.round.stage_id) {
          setData.stage = ele
        }
      })
      arr.push(setData)
    })

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballRealTimeData = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const result = {}
    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/detail_live?user=${footballUser}&secret=${footballSecret}`,
    )

    console.log(data, 'data')

    if (userInput.match_key) {
      data?.results?.forEach((item, i) => {
        console.log(item?.id === userInput.match_key)
        if (item?.id === userInput.match_key) {
          result.data = item
        }
      })
    } else {
      result.data = data
    }

    result.msg = 'Fetched Successfully'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballMatchTimelines = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/trend/detail?user=${footballUser}&secret=${footballSecret}&uuid=${userInput?.match_key}`,
    )

    return APIRes.getSuccessResult(data, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballMatchLineup = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/lineup/detail?user=${footballUser}&secret=${footballSecret}&uuid=${userInput?.match_key}`,
    )

    return APIRes.getSuccessResult(data, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballMatchPlayerStatics = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/player_stats/list?user=${footballUser}&secret=${footballSecret}`,
    )
    let result = []

    if (userInput.team_key) {
      data?.results[0]?.player_stats?.forEach((item, i) => {
        if (item.team_id === userInput.team_key) {
          result.push(item)
        }
      })
    } else if (userInput.player_key) {
      data?.results[0]?.player_stats?.forEach((item, i) => {
        if (item.player_id === userInput.player_key) {
          result.push(item)
        }
      })
    } else {
      result.push(data)
    }

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballTeamData = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    if (!userInput?.teamID) {
      return APIRes.getErrorResult('Require TeamID', res)
    }

    let result = []
    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/team/additional/list?user=${footballUser}&secret=${footballSecret}&uuid=${userInput?.teamID}`,
    )

    result = data.results[0]
    result.msg = 'data fetched successfully'
    //  console.log(data.results);

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballPlayerByCountry = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.countryID) {
      return APIRes.getErrorResult('Require countryID', res)
    }

    let result = []
    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/player/with_stat/list?user=${footballUser}&secret=${footballSecret}`,
    )

    let arr = []

    data.results.forEach((item, i) => {
      if (item.country_id === userInput.countryID) {
        arr.push(item)
      }
    })

    result = arr
    result.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.listCricketTournament = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    return APIRes.getSuccessResult(data, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballBetMatches = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    let result
    if (userInput.match_id) {
      result = await adminFootballBetting
        .findOne({
          match_id: userInput.match_id,
        })
        .lean()

      if (!result) {
        return APIRes.getErrorResult('No data found', res)
      }

      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    } else {
      result = await adminFootballBetting.find().lean()

      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    }
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballUserBettingHistory = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    console.log(userRole)

    let result

    // if (userRole === 'SUPERADMIN') {
    //   result = await footballBettings.find().lean()
    //   result.msg = 'data fetched successfully!'
    //   return APIRes.getSuccessResult(result, res)
    // }

    if (!userInput.match_id) {
      return APIRes.getSuccessResult('require match_id', res)
    }

    result = await footballBettings.aggregate([
      {
        $match: {
          $and: [
            {
              match_id: userInput.match_id,
            },
            {
              user_id: require('mongoose').Types.ObjectId(userId),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'footballbettingadmins',
          localField: 'match_id',
          foreignField: 'match_id',
          as: 'match_info',
        },
      },
      {
        $unwind: {
          path: '$match_info',
        },
      },
      {
        $project: {
          user_id: 1,
          match_id: 1,
          total_bet: 1,
          first_half_bet: 1,
          second_half_bet: 1,
          winning_team: 1,
          winning_team_name: 1,
          winning_price: 1,
          status: 1,
          double_chance: 1,
          double_chance_reason: 1,
          away_team_first_half_bet: 1,
          away_team_second_half_bet: 1,
          home_team_first_half_bet: 1,
          home_team_second_half_bet: 1,
          home_team_bet: 1,
          away_team_bet: 1,
          is_player_bet: 1,
          player_name: 1,
          no_of_goals: 1,
          bet_amount: 1,
          bet_count: 1,
          createdAt:1,
          betting_team: 1,
          'match_info.home_team_name': 1,
          'match_info.away_team_name': 1,
          'match_info.home_team_logo': 1,
          'match_info.away_team_logo': 1,
          'match_info.match_name': 1,
          'match_info.match_time': 1,
        },
      },
    ])
    if (result.length === 0) {
      return APIRes.getErrorResult('No data found', res)
    }

    // const dummy = await footballBettings.find({ user_id: userId }).lean()

    // console.log(dummy);

    result.msg = 'data fetched successfully!'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballUserBettingHistoryAdmin = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    console.log(userRole)

    let result

    // if (userRole === 'SUPERADMIN') {
    //   result = await footballBettings.find().lean()
    //   result.msg = 'data fetched successfully!'
    //   return APIRes.getSuccessResult(result, res)
    // }

    result = await footballBettings.aggregate([
      {
        $lookup: {
          from: 'footballbettingadmins',
          localField: 'match_id',
          foreignField: 'match_id',
          as: 'match_info',
        },
      },
      {
        $unwind: {
          path: '$match_info',
        },
      },
      {
        $lookup: {
          from: 'appusers',
          localField: 'user_id',
          foreignField: '_id',
          as: 'userDetail',
        },
      },
      {
        $unwind: {
          path: '$userDetail',
        },
      },
      {
        $project: {
          user_id: 1,
          match_id: 1,
          total_bet: 1,
          first_half_bet: 1,
          second_half_bet: 1,
          winning_team: 1,
          time_bet: 1,
          time: 1,
          winning_team_name: 1,
          winning_price: 1,
          status: 1,
          double_chance: 1,
          double_chance_reason: 1,
          away_team_first_half_bet: 1,
          away_team_second_half_bet: 1,
          home_team_first_half_bet: 1,
          home_team_second_half_bet: 1,
          home_team_bet: 1,
          away_team_bet: 1,
          is_player_bet: 1,
          player_name: 1,
          no_of_goals: 1,
          bet_amount: 1,
          bet_count: 1,
          createdAt: 1,
          'match_info.home_team_name': 1,
          'match_info.away_team_name': 1,
          'match_info.home_team_logo': 1,
          'match_info.away_team_logo': 1,
          'match_info.match_name': 1,
          'match_info.match_time': 1,
          'userDetail.name': 1,
          'userDetail.email': 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])
    if (result.length === 0) {
      return APIRes.getErrorResult('No data found', res)
    }

    // const dummy = await footballBettings.find({ user_id: userId }).lean()

    // console.log(dummy);

    result.msg = 'data fetched successfully!'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketUserBettingHistoryAdmin = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    console.log(userRole)

    let result

    // if (userRole === 'SUPERADMIN') {
    //   result = await footballBettings.find().lean()
    //   result.msg = 'data fetched successfully!'
    //   return APIRes.getSuccessResult(result, res)
    // }

    result = await cricketBettings.aggregate([
      {
        $lookup: {
          from: 'cricketbettingadmins',
          localField: 'match_id',
          foreignField: 'match_id',
          as: 'match_info',
        },
      },
      {
        $unwind: {
          path: '$match_info',
        },
      },
      {
        $lookup: {
          from: 'appusers',
          localField: 'user_id',
          foreignField: '_id',
          as: 'userDetail',
        },
      },
      {
        $unwind: {
          path: '$userDetail',
        },
      },
      {
        $project: {
          user_id: 1,
          match_id: 1,
          bet_amount: 1,
          match_name: 1,
          extra_description: 1,
          winning_price: 1,
          no_of_ball: 1,
          no_of_over: 1,
          no_of_run: 1,
          bet_type: 1,
          betting_team: 1,
          betting_team_key: 1,
          status: 1,
          createdAt: 1,
          'match_info.home_team_name': 1,
          'match_info.away_team_name': 1,
          'match_info.home_team_logo': 1,
          'match_info.away_team_logo': 1,
          'match_info.match_name': 1,
          'match_info.match_time': 1,
          'userDetail.name': 1,
          'userDetail.email': 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])
    if (result.length === 0) {
      return APIRes.getErrorResult('No data found', res)
    }

    // const dummy = await footballBettings.find({ user_id: userId }).lean()

    // console.log(dummy);

    result.msg = 'data fetched successfully!'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballMatchBettingHistory = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    // if (!userInput.match_id) {
    //   return APIRes.getErrorResult('Require match_id', res)
    // }

    let result

    // result = await footballBettings
    //   .find({ match_id: userInput.match_id })
    //   .lean()

    result = await footballBettings.aggregate([
      {
        $match: {
          user_id: require('mongoose').Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$match_id',
        },
      },
      {
        $lookup: {
          from: 'footballbettingadmins',
          localField: '_id',
          foreignField: 'match_id',
          as: 'result',
        },
      },
      {
        $unwind: {
          path: '$result',
        },
      },
    ])

    // result.msg = 'data fetched successfully!'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.footballRealTimeDataSocket = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    console.log(userInput.match_id)

    if (!userInput.match_id) {
      return APIRes.getErrorResult('Require match_id', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/detail_live?user=${footballUser}&secret=${footballSecret}`,
    )

    let result = []
    data?.results?.forEach((item, i) => {
      if (item.id === userInput.match_id) {
        result.push(item)
      }
    })
    console.log(result.length !== 0, 'asdasd')

    if (result.length !== 0) {
      result.msg = 'data fetched successfully'

      return APIRes.getSuccessResult(result, res)
    } else if (result.length === 0) {
      let secRes = []
      const { data } = await axios.get(
        `https://api.thesports.com/v1/football/match/live/history?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.match_id}`,
      )

      if (!data.results) {
        return APIRes.getErrorResult('No data found', res)
      }
      secRes.push(data.results)

      secRes.msg = 'data fetched successfully'

      return APIRes.getSuccessResult(secRes, res)
    } else {
      return APIRes.getErrorResult('No data found', res)
    }
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getMatchTransactionFootball = async (req, res) => {
  try {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId } = req.user
    let userInput = Utils.getReqValues(req)
    const user = await AppUser.findById({ _id: userId })
    if (!user) {
      return APIRes.getErrorResult('user not found', res)
    } else {
      const getMatchTransactions = await matchTransaction
        .find({ user_id: user._id })
        .lean()

      const matchDetails = await footballBettingAdmin.find()

      const matchData = getMatchTransactions.map((data, i) => {
        var matchTransactionModel = matchDetails.find(
          (item) => item.match_id === data.match_id,
        )
        console.log(matchTransactionModel, 'asd')
        return {
          match_name: matchTransactionModel?.match_name,
          home_team_name: matchTransactionModel?.home_team_name,
          home_team_logo: matchTransactionModel?.home_team_logo,
          away_team_name: matchTransactionModel?.away_team_name,
          away_team_logo: matchTransactionModel?.away_team_logo,
          type: data?.type,
          match_type: data?.match_name,
          oldbalance: data?.oldbalance,
          availablebalance: data?.availablebalance,
          time: moment(data.createdAt).format('X'),
        }
      })

      return APIRes.getSuccessResult(matchData, res)
    }
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getMatchFootballDetails = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    console.log(userRole)

    let result

    // if (userRole === 'SUPERADMIN') {
    //   result = await footballBettings.find().lean()
    //   result.msg = 'data fetched successfully!'
    //   return APIRes.getSuccessResult(result, res)
    // }

    if (!userInput.match_id) {
      return APIRes.getErrorResult('require match_id', res)
    }
    if (userInput?.team === 'true') {
      result = await footballBettings.aggregate([
        {
          $match: {
            $and: [
              {
                match_id: userInput.match_id,
              },
              {
                user_id: require('mongoose').Types.ObjectId(userId),
              },
              {
                $or: [
                  {
                    winning_team: true,
                  },
                ],
              },
            ],
          },
        },
      ])
      if (result.length === 0) {
        return APIRes.getErrorResult('No data found', res)
      }
      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    } else if (userInput?.goal === 'true') {
      result = await footballBettings.aggregate([
        {
          $match: {
            $and: [
              {
                match_id: userInput.match_id,
              },
              {
                user_id: require('mongoose').Types.ObjectId(userId),
              },
              {
                $or: [
                  {
                    total_bet: true,
                  },
                  {
                    first_half_bet: true,
                  },
                  {
                    second_half_bet: true,
                  },
                  {
                    away_team_first_half_bet: true,
                  },
                  {
                    home_team_first_half_bet: true,
                  },
                  {
                    away_team_second_half_bet: true,
                  },
                  {
                    home_team_second_half_bet: true,
                  },
                  {
                    home_team_bet: true,
                  },
                  {
                    away_team_bet: true,
                  },
                ],
              },
            ],
          },
        },
      ])
      if (result.length === 0) {
        return APIRes.getErrorResult('No data found', res)
      }
      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    } else if (userInput?.double_chance === 'true') {
      result = await footballBettings.aggregate([
        {
          $match: {
            $and: [
              {
                match_id: userInput.match_id,
              },
              {
                user_id: require('mongoose').Types.ObjectId(userId),
              },
              {
                $or: [
                  {
                    double_chance: true,
                  },
                ],
              },
            ],
          },
        },
      ])
      if (result.length === 0) {
        return APIRes.getErrorResult('No data found', res)
      }
      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    } else if (userInput?.is_player_bet === 'true') {
      result = await footballBettings.aggregate([
        {
          $match: {
            $and: [
              {
                match_id: userInput.match_id,
              },
              {
                user_id: require('mongoose').Types.ObjectId(userId),
              },
              {
                $or: [
                  {
                    is_player_bet: true,
                  },
                ],
              },
            ],
          },
        },
      ])
      if (result.length === 0) {
        return APIRes.getErrorResult('No data found', res)
      }
      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    } else if (userInput?.time_bet === 'true') {
      result = await footballBettings.aggregate([
        {
          $match: {
            $and: [
              {
                match_id: userInput.match_id,
              },
              {
                user_id: require('mongoose').Types.ObjectId(userId),
              },
              {
                $or: [
                  {
                    time_bet: true,
                  },
                ],
              },
            ],
          },
        },
      ])
      if (result.length === 0) {
        return APIRes.getErrorResult('No data found', res)
      }
      result.msg = 'data fetched successfully!'
      return APIRes.getSuccessResult(result, res)
    }
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getTodayFootballMatch = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user

    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []

    data?.results_extra?.competition?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.competition_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 2) {
              sub.status = 'First half'
            }
            if (item.status_id === 3) {
              sub.status = 'Half-time'
            }
            if (item.status_id === 4) {
              sub.status = 'Second half'
            }
            if (item.status_id === 5) {
              sub.status = 'Overtime'
            }
            if (item.status_id === 6) {
              sub.status = 'Overtime(deprecated)'
            }
            if (item.status_id === 7) {
              sub.status = 'Penalty Shoot-out'
            }
            if (item.status_id === 8) {
              sub.status = 'End'
            }
            if (item.status_id === 9) {
              sub.status = 'Delay'
            }
            if (item.status_id === 10) {
              sub.status = 'Interrupt'
            }
            if (item.status_id === 11) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 12) {
              sub.status = 'Cancel'
            }
            if (item.status_id === 13) {
              sub.status = 'To be determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            arr.push(sub)
          }
        }
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}



exports.getCalenderFootballMatch = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user

    var result = []

    if(!userInput.timestamp){
      return APIRes.getErrorResult("Require timestamp", res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?tsp=${userInput.timestamp}&user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []

    data?.results_extra?.competition?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        
          if (insideData.id === item.competition_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 2) {
              sub.status = 'First half'
            }
            if (item.status_id === 3) {
              sub.status = 'Half-time'
            }
            if (item.status_id === 4) {
              sub.status = 'Second half'
            }
            if (item.status_id === 5) {
              sub.status = 'Overtime'
            }
            if (item.status_id === 6) {
              sub.status = 'Overtime(deprecated)'
            }
            if (item.status_id === 7) {
              sub.status = 'Penalty Shoot-out'
            }
            if (item.status_id === 8) {
              sub.status = 'End'
            }
            if (item.status_id === 9) {
              sub.status = 'Delay'
            }
            if (item.status_id === 10) {
              sub.status = 'Interrupt'
            }
            if (item.status_id === 11) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 12) {
              sub.status = 'Cancel'
            }
            if (item.status_id === 13) {
              sub.status = 'To be determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            arr.push(sub)
          }
        
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}




exports.getTodayFootballMatchAdmin = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user

    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []

    data?.results_extra?.competition?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.competition_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 2) {
              sub.status = 'First half'
            }
            if (item.status_id === 3) {
              sub.status = 'Half-time'
            }
            if (item.status_id === 4) {
              sub.status = 'Second half'
            }
            if (item.status_id === 5) {
              sub.status = 'Overtime'
            }
            if (item.status_id === 6) {
              sub.status = 'Overtime(deprecated)'
            }
            if (item.status_id === 7) {
              sub.status = 'Penalty Shoot-out'
            }
            if (item.status_id === 8) {
              sub.status = 'End'
            }
            if (item.status_id === 9) {
              sub.status = 'Delay'
            }
            if (item.status_id === 10) {
              sub.status = 'Interrupt'
            }
            if (item.status_id === 11) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 12) {
              sub.status = 'Cancel'
            }
            if (item.status_id === 13) {
              sub.status = 'To be determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })
            if (
              sub.status === 'First half' ||
              sub.status === 'Second half' ||
              sub.status === 'Half-time'
            ) {
              arr.push(sub)
            }
          }
        }
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.getTodayCricketMatch = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user

    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    const getType = await axios.get(
      `https://api.thesports.com/v1/cricket/tournament/list?user=${footballUser}&secret=${footballSecret}`,
    )

const getBetAmount = await cricketBettingAdmin.find();

    
    const typeData = (getType?.data?.results)

    var mainArr = []
    data?.results_extra?.unique_tournament?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.unique_tournament_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 532) {
              sub.status = 'First Innings Home Team'
            }
            if (item.status_id === 533) {
              sub.status = 'First Innings Away Team'
            }
            if (item.status_id === 534) {
              sub.status = 'Second Innings Home Team'
            }
            if (item.status_id === 535) {
              sub.status = 'Second Innings Away Team'
            }
            if (item.status_id === 536) {
              sub.status = 'Awaiting Super Over '
            }
            if (item.status_id === 537) {
              sub.status = 'Super Over Home Team'
            }
            if (item.status_id === 538) {
              sub.status = 'Super Over Away Team'
            }
            if (item.status_id === 539) {
              sub.status = 'After Super Over'
            }
            if (item.status_id === 540) {
              sub.status = 'Innings Break'
            }
            if (item.status_id === 541) {
              sub.status = 'Super Over Break'
            }
            if (item.status_id === 542) {
              sub.status = 'Lunch Break'
            }
            if (item.status_id === 543) {
              sub.status = 'Tea Break'
            }
            if (item.status_id === 544) {
              sub.status = 'End(match of the day)'
            }
            if (item.status_id === 100) {
              sub.status = 'Ended'
            }
            if (item.status_id === 14) {
              sub.status = 'Postponed'
            }
            if (item.status_id === 15) {
              sub.status = 'Delayed'
            }
            if (item.status_id === 16) {
              sub.status = 'Cancelled'
            }
            if (item.status_id === 17) {
              sub.status = 'Interrupted'
            }
            if (item.status_id === 19) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 99) {
              sub.status = 'To be Determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time


const findMatch = getBetAmount.find((innerItem)=>item?.id===innerItem?.match_id)

            if(findMatch){
              sub.betAmount = findMatch.betting_price
            }else{
              sub.betAmount = ""
            }


            typeData?.forEach((data,i)=>{
              if(data.id===item?.tournament_id){
                if(data?.type===1){
                  sub.type = "TEST"
                }
                if(data?.type===2){
                  sub.type = "ODI"
                }
                if(data?.type===3){
                  sub.type = "T20I"
                }
                if(data?.type===4){
                  sub.type = "T20"
                }
                if(data?.type===5){
                  sub.type = "LIST"
                }
                if(data?.type===6){
                  sub.type = "FIRST CLASS"
                }
                
              }
            })

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            arr.push(sub)
          }
        }
      })

      const result =  arr.filter((item,i)=>{
        if(item.type!=="FIRST CLASS"){
         return item
        }
      })

      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: result,
        })
      }
    })

     const mainRes = mainArr.filter((item,i)=>{
      if(item.data.length!==0){
        return item
      }
    })
    mainRes.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainRes, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}




exports.getCalenderCricketMatch = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user

    var result = []

    if(!userInput?.timestamp){
      return APIRes.getErrorResult("Require Timestamp", res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?tsp=${userInput.timestamp}&user=${footballUser}&secret=${footballSecret}`,
    )
  

    const getType = await axios.get(
      `https://api.thesports.com/v1/cricket/tournament/list?user=${footballUser}&secret=${footballSecret}`,
    )

  const getBetAmount = await cricketBettingAdmin.find();
    
    const typeData = (getType?.data?.results)

    var mainArr = []
    data?.results_extra?.unique_tournament?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
     
          if (insideData.id === item.unique_tournament_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 532) {
              sub.status = 'First Innings Home Team'
            }
            if (item.status_id === 533) {
              sub.status = 'First Innings Away Team'
            }
            if (item.status_id === 534) {
              sub.status = 'Second Innings Home Team'
            }
            if (item.status_id === 535) {
              sub.status = 'Second Innings Away Team'
            }
            if (item.status_id === 536) {
              sub.status = 'Awaiting Super Over '
            }
            if (item.status_id === 537) {
              sub.status = 'Super Over Home Team'
            }
            if (item.status_id === 538) {
              sub.status = 'Super Over Away Team'
            }
            if (item.status_id === 539) {
              sub.status = 'After Super Over'
            }
            if (item.status_id === 540) {
              sub.status = 'Innings Break'
            }
            if (item.status_id === 541) {
              sub.status = 'Super Over Break'
            }
            if (item.status_id === 542) {
              sub.status = 'Lunch Break'
            }
            if (item.status_id === 543) {
              sub.status = 'Tea Break'
            }
            if (item.status_id === 544) {
              sub.status = 'End(match of the day)'
            }
            if (item.status_id === 100) {
              sub.status = 'Ended'
            }
            if (item.status_id === 14) {
              sub.status = 'Postponed'
            }
            if (item.status_id === 15) {
              sub.status = 'Delayed'
            }
            if (item.status_id === 16) {
              sub.status = 'Cancelled'
            }
            if (item.status_id === 17) {
              sub.status = 'Interrupted'
            }
            if (item.status_id === 19) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 99) {
              sub.status = 'To be Determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time


const findMatch = getBetAmount.find((innerItem)=>item?.id===innerItem?.match_id)

            if(findMatch){
              sub.betAmount = findMatch.betting_price
            }else{
              sub.betAmount = ""
            }

            typeData?.forEach((data,i)=>{
              if(data.id===item?.tournament_id){
if(data?.type===0){
        sub.type = "T10"
      }
                if(data?.type===1){
                  sub.type = "TEST"
                }
                if(data?.type===2){
                  sub.type = "ODI"
                }
                if(data?.type===3){
                  sub.type = "T20I"
                }
                if(data?.type===4){
                  sub.type = "T20"
                }
                if(data?.type===5){
                  sub.type = "LIST"
                }
                if(data?.type===6){
                  sub.type = "FIRST CLASS"
                }
                
              }
            })

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            arr.push(sub)
          }
        
      })

      const result =  arr.filter((item,i)=>{
        if(item.type!=="FIRST CLASS"){
         return item
        }
      })

      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: result,
        })
      }
    })

      const mainRes = mainArr.filter((item,i)=>{
      if(item.data.length!==0){
        return item
      }
    })
    mainRes.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainRes, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}









exports.getTodayCricketMatchAdmin = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user

    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []
    data?.results_extra?.unique_tournament?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.unique_tournament_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 532) {
              sub.status = 'First Innings Home Team'
            }
            if (item.status_id === 533) {
              sub.status = 'First Innings Away Team'
            }
            if (item.status_id === 534) {
              sub.status = 'Second Innings Home Team'
            }
            if (item.status_id === 535) {
              sub.status = 'Second Innings Away Team'
            }
            if (item.status_id === 536) {
              sub.status = 'Awaiting Super Over '
            }
            if (item.status_id === 537) {
              sub.status = 'Super Over Home Team'
            }
            if (item.status_id === 538) {
              sub.status = 'Super Over Away Team'
            }
            if (item.status_id === 539) {
              sub.status = 'After Super Over'
            }
            if (item.status_id === 540) {
              sub.status = 'Innings Break'
            }
            if (item.status_id === 541) {
              sub.status = 'Super Over Break'
            }
            if (item.status_id === 542) {
              sub.status = 'Lunch Break'
            }
            if (item.status_id === 543) {
              sub.status = 'Tea Break'
            }
            if (item.status_id === 544) {
              sub.status = 'End(match of the day)'
            }
            if (item.status_id === 100) {
              sub.status = 'Ended'
            }
            if (item.status_id === 14) {
              sub.status = 'Postponed'
            }
            if (item.status_id === 15) {
              sub.status = 'Delayed'
            }
            if (item.status_id === 16) {
              sub.status = 'Cancelled'
            }
            if (item.status_id === 17) {
              sub.status = 'Interrupted'
            }
            if (item.status_id === 19) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 99) {
              sub.status = 'To be Determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            if (
              sub.status === 'First Innings Home Team' ||
              sub.status === 'First Innings Away Team' ||
              sub.status === 'Second Innings Home Team' ||
              sub.status === 'Second Innings Away Team' ||
              sub.status === 'Super Over Home Team' ||
              sub.status === 'Super Over Away Team' ||
              sub.status === 'Innings Break' ||
              sub.status === 'Super Over Break' ||
              sub.status === 'Lunch Break' ||
              sub.status === 'Tea Break'
            ) {
              arr.push(sub)
            }
          }
        }
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

//version 2 API for cricket tournament for user and admin

exports.listCricketTournamentVersion2 = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    var arr = data?.results_extra?.unique_tournament

    arr.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.listCricketMatchesVersion2 = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    const getType = await axios.get(
      `https://api.thesports.com/v1/cricket/tournament/list?user=${footballUser}&secret=${footballSecret}`,
    )

const getBetAmount = await cricketBettingAdmin.find();

    const typeData = (getType?.data?.results)
    

    var arr = []
    data?.results?.forEach((item, i) => {
      // venue.data.results?.forEach((e)=>{
      let sub = {}

      if (item.unique_tournament_id === userInput.match_key) {
        // if(e.id ===item.venue_id){
        //   sub.venueData =e
        // }
        sub.id = item.id
        if (item.status_id === 0) {
          sub.status = 'Abnormal(suggest hiding)'
        }
        if (item.status_id === 1) {
          sub.status = 'Not started'
        }
        if (item.status_id === 532) {
          sub.status = 'FIRST_INNINGS_HOME_TEAM'
        }
        if (item.status_id === 533) {
          sub.status = 'FIRST_INNINGS_AWAY_TEAM'
        }
        if (item.status_id === 534) {
          sub.status = 'SECOND_INNINGS_HOME_TEAM'
        }
        if (item.status_id === 535) {
          sub.status = 'SECOND_INNINGS_AWAY_TEAM'
        }
        if (item.status_id === 536) {
          sub.status = 'AWAITING_SUPER_OVER'
        }
        if (item.status_id === 537) {
          sub.status = 'SUPER_OVER_HOME_TEAM'
        }
        if (item.status_id === 538) {
          sub.status = 'SUPER_OVER_AWAY_TEAM'
        }
        if (item.status_id === 539) {
          sub.status = 'AFTER_SUPER_OVER'
        }
        if (item.status_id === 540) {
          sub.status = 'INNINGS_BREAK'
        }
        if (item.status_id === 541) {
          sub.status = 'SUPER_OVER_BREAK'
        }
        if (item.status_id === 542) {
          sub.status = 'LUNCH_BREAK'
        }
        if (item.status_id === 543) {
          sub.status = 'TEA_BREAK'
        }
        if (item.status_id === 544) {
          sub.status = 'End (match of the day)'
        }
        if (item.status_id === 100) {
          sub.status = 'ENDED'
        }
        if (item.status_id === 14) {
          sub.status = 'POSTPONED'
        }
        if (item.status_id === 15) {
          sub.status = 'DELAYED'
        }
        if (item.status_id === 16) {
          sub.status = 'CANCELED'
        }
        if (item.status_id === 17) {
          sub.status = 'INTERRUPTED'
        }
        if (item.status_id === 19) {
          sub.status = 'Cut in half'
        }
        if (item.status_id === 99) {
          sub.status = 'To be determined'
        }

        // console.log(item);
        sub.homeTeamID = item.home_team_id
        sub.awayTeamID = item.away_team_id
        sub.matchTime = item.match_time

        sub.venueID = item.venue_id

getBetAmount.forEach((innerItem,j)=>{
          
          if(innerItem.match_id===item?.id){
            sub.betAmount=innerItem.betting_price
          }
        })

        // venue?.data?.results?.forEach((venueId,index)=>{

        //    if(venueId.id===item.venue_id){

        //      sub.venueID =venueId;
        //    }
        //  })


  typeData?.forEach((data,i)=>{
  
    if(data.id===item?.tournament_id){
if(data?.type===0){
        sub.type = "T10"
      }
      if(data?.type===1){
        sub.type = "TEST"
      }
      if(data?.type===2){
        sub.type = "ODI"
      }
      if(data?.type===3){
        sub.type = "T20I"
      }
      if(data?.type===4){
        sub.type = "T20"
      }
      if(data?.type===5){
        sub.type = "LIST"
      }
      if(data?.type===6){
        sub.type = "FIRST CLASS"
      }
      
    }
  })


        data?.results_extra?.team?.forEach((data, i) => {
          if (item.home_team_id === data.id) {
            sub.homeTeamName = data.name
            sub.homeTeamLogo = data.logo
          }
          if (item.away_team_id === data.id) {
            sub.awayTeamName = data.name
            sub.awayTeamLogo = data.logo
          }
        })
        arr.push(sub)
      }
    })
    // })
   const result =  arr.filter((item,i)=>{
      if(item.type!=="FIRST CLASS"){
       if(new Date(item.matchTime*1000).getDate("en-US", {timeZone: "Asia/Kolkata"})===new Date().getDate()){
          return item
        } 
      }
    })
 result.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.listCricketTeamPlayersVersion2 = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('match_key required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/lineup/detail?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.match_key}`,
    )

    if (data?.results?.lineup === undefined) {
      return APIRes.getErrorResult('No Data Found!', res)
    }

    const arr = data?.results?.lineup
    var temp = []

    const home_team_arr = arr?.home?.map(async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item?.id}`,
      )
      return data?.results[0]
    })

    const away_team_arr = arr?.away?.map(async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item?.id}`,
      )
      return data?.results[0]
    })
    

    temp.push({ home: await Promise.all(home_team_arr) })
    temp.push({ away: await Promise.all(away_team_arr) })
    temp.msg = 'Data fetched successfully!'

    return APIRes.getSuccessResult(temp, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketBettingAdmin = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput?.betting_price) {
      return APIRes.getErrorResult('Please provide betting price ', res)
    }
    if (!userInput?.match_id) {
      return APIRes.getErrorResult('Please provide match id ', res)
    }

    if (!userInput?.bet_limit) {
      return APIRes.getErrorResult('Please provide bet limit ', res)
    }

    if (!userInput?.withdraw_type) {
      return APIRes.getErrorResult('Please provide withdraw type ', res)
    }

    if (!userInput?.winning_amount) {
      return APIRes.getErrorResult('Please provide winning amount ', res)
    }

    if (
      userInput?.withdraw_type === 'percentage' &&
      (!userInput?.fee_percentage || userInput?.fee_percentage <= 0)
    ) {
      return APIRes.getErrorResult(
        'Please provide fee percentage (or) fee percentage is less than or equals to zero',
        res,
      )
    }

    const alreadyBet = await adminCricketBetting
      .findOne({ match_id: userInput.match_id })
      .lean()

    if (alreadyBet) {
      return APIRes.getErrorResult('This match bet already created!', res)
    }

    let result = []

    result = await adminCricketBetting.create(userInput)
    result.msg = 'bet created successfully'
    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketBettingAdminList = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const getMatch = await adminCricketBetting
      .find()
      .lean()
      .sort({ createdAt: -1 })

    return APIRes.getSuccessResult(getMatch, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketBettingAdminEdit = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_id) {
      return APIRes.getErrorResult('Require match id', res)
    }

    let whereCodn = {}

    if (userInput.betting_price) {
      whereCodn.betting_price = userInput.betting_price
    }
    if (userInput.bet_limit) {
      whereCodn.bet_limit = userInput.bet_limit
    }
    if (userInput.winning_amount) {
      whereCodn.winning_amount = userInput.winning_amount
    }
    if (userInput.withdraw_type) {
      whereCodn.withdraw_type = userInput.withdraw_type
    }
    if (userInput.fee_percentage) {
      whereCodn.fee_percentage = userInput.fee_percentage
    }

    let result = []
    result = await adminCricketBetting.findOneAndUpdate(
      { match_id: userInput.match_id },
      { $set: whereCodn },
      { upsert: true, new: true },
    )
    result.msg = 'bet updated successfully!'
    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketRealTimeDataSocket = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    console.log(userInput.match_id)

    if (!userInput.match_id) {
      return APIRes.getErrorResult('Require match_id', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/detail_live?user=${footballUser}&secret=${footballSecret}`,
    )

    let result = []
    data?.results?.forEach((item, i) => {
      if (item.id === userInput.match_id) {
        result.push(item)
      }
    })

    if (result.length !== 0) {
      result.msg = 'data fetched successfully'

      return APIRes.getSuccessResult(result, res)
    } else if (result.length === 0) {
      let secRes = []
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/match/live/history?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.match_id}`,
      )

      if (!data.results) {
        return APIRes.getErrorResult('No data found', res)
      }
      secRes.push(data.results)

      secRes.msg = 'data fetched successfully'

      return APIRes.getSuccessResult(secRes, res)
    } else {
      return APIRes.getErrorResult('No data found', res)
    }
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketListCountries = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/country/list?user=${footballUser}&secret=${footballSecret}`,
    )

    return APIRes.getSuccessResult(data.results, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketFinishedMatchesPlayers = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Require match_key', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/live/history?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.match_key}`,
    )

    const totalInnings = {}

    const firstInnings = {}
    const secondInnings = {}

    const firstInningsBatting = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${data.results.players[0].batting.team_id}`,
    )

    const firstInningsBowling = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${data.results.players[0].bowling.team_id}`,
    )

    const secondInningsBatting = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${data.results.players[1].batting.team_id}`,
    )

    const secondInningsBowling = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${data.results.players[1].bowling.team_id}`,
    )

    // console.log(data.results.players[0].batting.players);
    const firstInningsBattingPlayers = data.results.players[0].batting.players.map(
      async (item, i) => {
        const { data } = await axios.get(
          `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
        )
        return {
          details: data.results[0],
          score: item[1],
          battings: item[2],
          four: item[3],
          sixes: item[4],
          strike_rate: item[5],
        }
      },
    )

    const firstInningsBowlingPlayers = data.results.players[0].bowling.players.map(
      async (item, i) => {
        const { data } = await axios.get(
          `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
        )
        return {
          details: data.results[0],
          rounds_played: item[1],
          innocent_rounds: item[2],
          lose_score: item[3],
          elimination_number: item[4],
          lose_score_per_round: item[5],
        }
      },
    )

    const secondInningsBattingPlayers = data.results.players[1].batting.players.map(
      async (item, i) => {
        const { data } = await axios.get(
          `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
        )
        return {
          details: data.results[0],
          score: item[1],
          battings: item[2],
          four: item[3],
          sixes: item[4],
          strike_rate: item[5],
        }
      },
    )

    const secondInningsBowlingPlayers = data.results.players[1].bowling.players.map(
      async (item, i) => {
        const { data } = await axios.get(
          `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
        )
        return {
          details: data.results[0],
          rounds_played: item[1],
          innocent_rounds: item[2],
          lose_score: item[3],
          elimination_number: item[4],
          lose_score_per_round: item[5],
        }
      },
    )

    firstInnings.battingTeam = firstInningsBatting.data.results[0]
    firstInnings.bowlingTeam = firstInningsBowling.data.results[0]
    secondInnings.battingTeam = secondInningsBatting.data.results[0]
    secondInnings.bowlingTeam = secondInningsBowling.data.results[0]

    firstInnings.battingTeam.players = await Promise.all(
      firstInningsBattingPlayers,
    )
    firstInnings.bowlingTeam.players = await Promise.all(
      firstInningsBowlingPlayers,
    )
    secondInnings.battingTeam.players = await Promise.all(
      secondInningsBattingPlayers,
    )
    secondInnings.bowlingTeam.players = await Promise.all(
      secondInningsBowlingPlayers,
    )

    // const playerData = await axios.get(
    //   `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid={}`
    // )

    totalInnings.firstInnings = firstInnings
    totalInnings.secondInnings = secondInnings

    return APIRes.getSuccessResult(totalInnings, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketLiveMatchesPlayers = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Require match_key', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/detail_live?user=${footballUser}&secret=${footballSecret}&uuid=${userInput.match_key}`,
    )
    const result = data.results?.find(item=>item.id===userInput.match_key)

    if(result.players?.length===0){
      return APIRes.getErrorResult("No Data Found!", res)
    }


    let temp =[]

    //  result.timeline[0].overs.forEach((item,i)=>{
    
    //   if(item[1]===1){
    
    //     temp.push(item);
    //   }
    //   console.log(temp);
    // })


    const firstInningsBatting = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${result?.players[0]?.batting?.team_id}`,
    )

    const firstInningsBowling = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${result?.players[0]?.bowling?.team_id}`,
    )

    const secondInningsBatting = await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${result?.players[1]?.batting?.team_id}`,
    )

    const secondInningsBowling =  await axios.get(
      `https://api.thesports.com/v1/cricket/team/list?user=${footballUser}&secret=${footballSecret}&uuid=${result?.players[1]?.bowling?.team_id}`,
    )


    if(secondInningsBatting.data.code===100003){
  //for one/first innings

  var totalInnings = {}

    var firstInnings = {}
    var secondInnings = {}

  const firstInningsBattingPlayers = result?.players[0]?.batting?.players?.map(
    async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
      )
      return {
        details: data?.results[0],
        score: item[1],
        battings: item[2],
        four: item[3],
        sixes: item[4],
        strike_rate: item[5],
      }
    },
  )

  const firstInningsBowlingPlayers = result?.players[0]?.bowling?.players?.map(
    async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
      )
      return {
        details: data?.results[0],
        rounds_played: item[1],
        innocent_rounds: item[2],
        lose_score: item[3],
        elimination_number: item[4],
        lose_score_per_round: item[5],
      }
    },
  )


  firstInnings.battingTeam = firstInningsBatting?.data?.results[0]
  firstInnings.bowlingTeam = firstInningsBowling?.data?.results[0]
  firstInnings.details = result;
  secondInnings.battingTeam = "No Data Found!"
  secondInnings.bowlingTeam = "No Data Found!"
  secondInnings.details="No Data Found!"

  firstInnings.battingTeam.players = await Promise.all(
    firstInningsBattingPlayers,
  )
  firstInnings.bowlingTeam.players = await Promise.all(
    firstInningsBowlingPlayers,
  )



  totalInnings.firstInnings = firstInnings
  totalInnings.secondInnings = secondInnings

  return APIRes.getSuccessResult(totalInnings, res)

    }

    //for both/two innings
if(secondInningsBatting.data.code!==100003){

  var totalInnings = {}

    var firstInnings = {}
    var secondInnings = {}

  const firstInningsBattingPlayers = result?.players[0]?.batting?.players?.map(
    async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
      )
      return {
        details: data?.results[0],
        score: item[1],
        battings: item[2],
        four: item[3],
        sixes: item[4],
        strike_rate: item[5],
      }
    },
  )

  const firstInningsBowlingPlayers = result?.players[0]?.bowling?.players?.map(
    async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
      )
      return {
        details: data?.results[0],
        rounds_played: item[1],
        innocent_rounds: item[2],
        lose_score: item[3],
        elimination_number: item[4],
        lose_score_per_round: item[5],
      }
    },
  )

  const secondInningsBattingPlayers =  result?.players[1]?.batting?.players?.map(
    async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
      )
      return {
        details: data?.results[0],
        score: item[1],
        battings: item[2],
        four: item[3],
        sixes: item[4],
        strike_rate: item[5],
      }
    },
  )

  const secondInningsBowlingPlayers = result?.players[1]?.bowling?.players?.map(
    async (item, i) => {
      const { data } = await axios.get(
        `https://api.thesports.com/v1/cricket/player/list?user=${footballUser}&secret=${footballSecret}&uuid=${item[0]}`,
      )
      
      return {
        details: data?.results[0],
        rounds_played: item[1],
        innocent_rounds: item[2],
        lose_score: item[3],
        elimination_number: item[4],
        lose_score_per_round: item[5],
      }
    },
  )


  firstInnings.bowlingTeam = firstInningsBowling?.data?.results[0]
  firstInnings.battingTeam = firstInningsBatting?.data?.results[0]
  firstInnings.details = result;
  secondInnings.battingTeam = secondInningsBatting?.data?.results[0]
  secondInnings.bowlingTeam = secondInningsBowling?.data?.results[0]
  secondInnings.details = result;

  
  firstInnings.battingTeam.players = await Promise.all(
    firstInningsBattingPlayers,
  )
  firstInnings.bowlingTeam.players = await Promise.all(
    firstInningsBowlingPlayers,
  )
  secondInnings.battingTeam.players = await Promise.all(
    secondInningsBattingPlayers,
  )
  secondInnings.bowlingTeam.players = await Promise.all(
    secondInningsBowlingPlayers,
  )
  

  totalInnings.firstInnings = firstInnings
  totalInnings.secondInnings = secondInnings


  return APIRes.getSuccessResult(totalInnings, res)

}

  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getTodayLiveCricketMatches = async (req, res) => {
  try {
  
    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []
    data?.results_extra?.unique_tournament?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.unique_tournament_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 532) {
              sub.status = 'First Innings Home Team'
            }
            if (item.status_id === 533) {
              sub.status = 'First Innings Away Team'
            }
            if (item.status_id === 534) {
              sub.status = 'Second Innings Home Team'
            }
            if (item.status_id === 535) {
              sub.status = 'Second Innings Away Team'
            }
            if (item.status_id === 536) {
              sub.status = 'Awaiting Super Over '
            }
            if (item.status_id === 537) {
              sub.status = 'Super Over Home Team'
            }
            if (item.status_id === 538) {
              sub.status = 'Super Over Away Team'
            }
            if (item.status_id === 539) {
              sub.status = 'After Super Over'
            }
            if (item.status_id === 540) {
              sub.status = 'Innings Break'
            }
            if (item.status_id === 541) {
              sub.status = 'Super Over Break'
            }
            if (item.status_id === 542) {
              sub.status = 'Lunch Break'
            }
            if (item.status_id === 543) {
              sub.status = 'Tea Break'
            }
            if (item.status_id === 544) {
              sub.status = 'End(match of the day)'
            }
            if (item.status_id === 100) {
              sub.status = 'Ended'
            }
            if (item.status_id === 14) {
              sub.status = 'Postponed'
            }
            if (item.status_id === 15) {
              sub.status = 'Delayed'
            }
            if (item.status_id === 16) {
              sub.status = 'Cancelled'
            }
            if (item.status_id === 17) {
              sub.status = 'Interrupted'
            }
            if (item.status_id === 19) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 99) {
              sub.status = 'To be Determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            if (
              sub.status === 'First Innings Home Team' ||
              sub.status === 'First Innings Away Team' ||
              sub.status === 'Second Innings Home Team' ||
              sub.status === 'Second Innings Away Team' ||
              sub.status === 'Super Over Home Team' ||
              sub.status === 'Super Over Away Team' ||
              sub.status === 'Innings Break' ||
              sub.status === 'Super Over Break' ||
              sub.status === 'Lunch Break' ||
              sub.status === 'Tea Break'
            ) {
              arr.push(sub)
            }
          }
        }
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.getLiveCricketScore = async(req,res)=>{
  try {
    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/country/list?user=${footballUser}&secret=${footballSecret}`,
    )



    return APIRes.getSuccessResult(data.results, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}

exports.cricketFinishedMatches = async(req,res)=>{
  try {

    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/cricket/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
// console.log(data.results);
    var mainArr = []
    data?.results_extra?.unique_tournament?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.unique_tournament_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 532) {
              sub.status = 'First Innings Home Team'
            }
            if (item.status_id === 533) {
              sub.status = 'First Innings Away Team'
            }
            if (item.status_id === 534) {
              sub.status = 'Second Innings Home Team'
            }
            if (item.status_id === 535) {
              sub.status = 'Second Innings Away Team'
            }
            if (item.status_id === 536) {
              sub.status = 'Awaiting Super Over '
            }
            if (item.status_id === 537) {
              sub.status = 'Super Over Home Team'
            }
            if (item.status_id === 538) {
              sub.status = 'Super Over Away Team'
            }
            if (item.status_id === 539) {
              sub.status = 'After Super Over'
            }
            if (item.status_id === 540) {
              sub.status = 'Innings Break'
            }
            if (item.status_id === 541) {
              sub.status = 'Super Over Break'
            }
            if (item.status_id === 542) {
              sub.status = 'Lunch Break'
            }
            if (item.status_id === 543) {
              sub.status = 'Tea Break'
            }
            if (item.status_id === 544) {
              sub.status = 'End(match of the day)'
            }
            if (item.status_id === 100) {
              sub.status = 'Ended'
            }
            if (item.status_id === 14) {
              sub.status = 'Postponed'
            }
            if (item.status_id === 15) {
              sub.status = 'Delayed'
            }
            if (item.status_id === 16) {
              sub.status = 'Cancelled'
            }
            if (item.status_id === 17) {
              sub.status = 'Interrupted'
            }
            if (item.status_id === 19) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 99) {
              sub.status = 'To be Determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time
            sub.details = item
            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })
            if (
              sub.status === 'Ended' 
            ) {
              arr.push(sub)
            }

          }
        }
      })

      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
      
    })


    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
    
    return APIRes.getSuccessResult(data.results, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


//for website football


exports.footballListCountries = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/country/list?user=${footballUser}&secret=${footballSecret}`,
    )

    return APIRes.getSuccessResult(data.results, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.listFootballTournamentVersion2 = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    var arr = data?.results_extra.competition

    arr.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.getTodayFootballMatchDetails = async (req, res) => {
  try {
    

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []

    data?.results_extra?.competition?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.competition_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 2) {
              sub.status = 'First half'
            }
            if (item.status_id === 3) {
              sub.status = 'Half-time'
            }
            if (item.status_id === 4) {
              sub.status = 'Second half'
            }
            if (item.status_id === 5) {
              sub.status = 'Overtime'
            }
            if (item.status_id === 6) {
              sub.status = 'Overtime(deprecated)'
            }
            if (item.status_id === 7) {
              sub.status = 'Penalty Shoot-out'
            }
            if (item.status_id === 8) {
              sub.status = 'End'
            }
            if (item.status_id === 9) {
              sub.status = 'Delay'
            }
            if (item.status_id === 10) {
              sub.status = 'Interrupt'
            }
            if (item.status_id === 11) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 12) {
              sub.status = 'Cancel'
            }
            if (item.status_id === 13) {
              sub.status = 'To be determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })

            arr.push(sub)
          }
        }
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.getTodayFootballMatches = async(req,res)=>{
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    const venue = await axios.get(
      `https://api.thesports.com/v1/football/venue/list?user=${footballUser}&secret=${footballSecret}`,
    )
    var arr = []
    data?.results?.forEach((item, i) => {
      // venue.data.results?.forEach((e)=>{
      let sub = {}

      if (item.competition_id === userInput.match_key) {
        // if(e.id ===item.venue_id){
        //   sub.venueData =e
        // }
        sub.id = item.id
        if (item.status_id === 0) {
          sub.status = 'Abnormal(suggest hiding)'
        }
        if (item.status_id === 1) {
          sub.status = 'Not started'
        }
        if (item.status_id === 2) {
          sub.status = 'First half'
        }
        if (item.status_id === 3) {
          sub.status = 'Half-time'
        }
        if (item.status_id === 4) {
          sub.status = 'Second half'
        }
        if (item.status_id === 5) {
          sub.status = 'Overtime'
        }
        if (item.status_id === 6) {
          sub.status = 'Overtime(deprecated)'
        }
        if (item.status_id === 7) {
          sub.status = 'Penalty Shoot-out'
        }
        if (item.status_id === 8) {
          sub.status = 'End'
        }
        if (item.status_id === 9) {
          sub.status = 'Delay'
        }
        if (item.status_id === 10) {
          sub.status = 'Interrupt'
        }
        if (item.status_id === 11) {
          sub.status = 'Cut in half'
        }
        if (item.status_id === 12) {
          sub.status = 'Cancel'
        }
        if (item.status_id === 13) {
          sub.status = 'To be determined'
        }
        // console.log(item);
        sub.homeTeamID = item.home_team_id
        sub.awayTeamID = item.away_team_id
        sub.matchTime = item.match_time

        sub.venueID = item.venue_id

        // venue?.data?.results?.forEach((venueId,index)=>{

        //    if(venueId.id===item.venue_id){

        //      sub.venueID =venueId;
        //    }
        //  })

        data?.results_extra?.team?.forEach((data, i) => {
          if (item.home_team_id === data.id) {
            sub.homeTeamName = data.name
            sub.homeTeamLogo = data.logo
          }
          if (item.away_team_id === data.id) {
            sub.awayTeamName = data.name
            sub.awayTeamLogo = data.logo
          }
        })
        arr.push(sub)
      }
    })
    // })

    arr.msg = 'data fetched successfully'

    return APIRes.getSuccessResult(arr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.getTodayCurrentFootballMatch = async (req, res) => {
  try {
   

    var result = []

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )
    var mainArr = []

    data?.results_extra?.competition?.forEach((insideData, i) => {
      let arr = []
      data?.results?.forEach((item, j) => {
        if (
          moment(item.match_time * 1000).format('YYYY/MM/DD') ===
          moment().format('YYYY/MM/DD')
        ) {
          if (insideData.id === item.competition_id) {
            let sub = {}
            sub.id = item.id
            if (item.status_id === 0) {
              sub.status = 'Abnormal(suggest hiding)'
            }
            if (item.status_id === 1) {
              sub.status = 'Not started'
            }
            if (item.status_id === 2) {
              sub.status = 'First half'
            }
            if (item.status_id === 3) {
              sub.status = 'Half-time'
            }
            if (item.status_id === 4) {
              sub.status = 'Second half'
            }
            if (item.status_id === 5) {
              sub.status = 'Overtime'
            }
            if (item.status_id === 6) {
              sub.status = 'Overtime(deprecated)'
            }
            if (item.status_id === 7) {
              sub.status = 'Penalty Shoot-out'
            }
            if (item.status_id === 8) {
              sub.status = 'End'
            }
            if (item.status_id === 9) {
              sub.status = 'Delay'
            }
            if (item.status_id === 10) {
              sub.status = 'Interrupt'
            }
            if (item.status_id === 11) {
              sub.status = 'Cut in half'
            }
            if (item.status_id === 12) {
              sub.status = 'Cancel'
            }
            if (item.status_id === 13) {
              sub.status = 'To be determined'
            }
            sub.homeTeamID = item.home_team_id
            sub.awayTeamID = item.away_team_id
            sub.matchTime = item.match_time

            data?.results_extra?.team?.forEach((data, i) => {
              if (item.home_team_id === data.id) {
                sub.homeTeamName = data.name
                sub.homeTeamLogo = data.logo
              }
              if (item.away_team_id === data.id) {
                sub.awayTeamName = data.name
                sub.awayTeamLogo = data.logo
              }
            })
            if (
              sub.status === 'First half' ||
              sub.status === 'Second half' ||
              sub.status === 'Half-time'
            ) {
              arr.push(sub)
            }
          }
        }
      })
      if (arr.length !== 0) {
        mainArr.push({
          tournament_name: insideData?.name,
          tournament_logo: insideData?.logo,
          tournamentId: insideData?.id,
          data: arr,
        })
      }
    })

    mainArr.msg = 'data fetched successfully!'
    return APIRes.getSuccessResult(mainArr, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}





exports.getTopFootballMatchesByBetting = async(req,res)=>{
  try {
 
    const getUserBetting = await footballBettings.aggregate([
      {
        '$group': {
          '_id': '$match_id', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'footballbettingadmins', 
          'localField': '_id', 
          'foreignField': 'match_id', 
          'as': 'match'
        }
      }, {
        '$unwind': {
          'path': '$match'
        }
      }
    ])



    let result =[];
    result = getUserBetting.filter((item,i)=>{
      console.log(moment().startOf('day').format('D/MM/YYYY') , new Date(item.match.createdAt).toLocaleDateString());
      if(moment().startOf('day').format('D/MM/YYYY') === new Date(item.match.createdAt).toLocaleDateString()){
        return item
      }
    })

    result.msg="Data Fetched Successfully!"

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.getFirstFootballMatchesByBetting = async(req,res)=>{
  try {
 
    const getUserBetting = await footballBettings.aggregate([
      {
        '$group': {
          '_id': '$match_id', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'footballbettingadmins', 
          'localField': '_id', 
          'foreignField': 'match_id', 
          'as': 'match'
        }
      }, {
        '$unwind': {
          'path': '$match'
        }
      }
    ])

    var result =[];
    const aa = getUserBetting.filter((item,i)=>{
      if(moment().startOf('day').format('D/MM/YYYY') === new Date(item.match.createdAt).toLocaleDateString()){
        return item
      }
    })


result.push(aa.reduce(function(prev, current) {
    if (+current.count > +prev.count) {
        return current;
    } else {
        return prev;
    }
  }))
  

    result.msg="Data Fetched Successfully!"

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}




exports.cricketUserBettingHistory = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    console.log(userRole)

    let result

    // if (userRole === 'SUPERADMIN') {
    //   result = await footballBettings.find().lean()
    //   result.msg = 'data fetched successfully!'
    //   return APIRes.getSuccessResult(result, res)
    // }

      if (!userInput.match_id) {
      return APIRes.getErrorResult('Require match_id', res)
    }

    result = await betting.aggregate([
      {
        $match: {
          $and: [
            {
              match_id: userInput.match_id,
            },
            {
              user_id: require('mongoose').Types.ObjectId(userId),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'cricketbettingadmins',
          localField: 'match_id',
          foreignField: 'match_id',
          as: 'match_info',
        },
      },
      {
        $unwind: {
          path: '$match_info',
        },
      },
      {
        $project: {
          user_id: 1,
          match_id: 1,
          no_of_ball: 1,
          no_of_over: 1,
          no_of_run: 1,
          bet_type: 1,
          betting_team: 1,
          betting_team_key: 1,
          status: 1,
          money_updated: 1,
          createdAt:1,
          status_text: 1,
          bet_amount: 1,
          winning_price: 1,
          'match_info.home_team_name': 1,
          'match_info.away_team_name': 1,
          'match_info.home_team_logo': 1,
          'match_info.away_team_logo': 1,
          'match_info.match_name': 1,
          'match_info.match_time': 1,
        },
      },
    ])
    if (result.length === 0) {
      return APIRes.getErrorResult('No data found', res)
    }

    // const dummy = await footballBettings.find({ user_id: userId }).lean()

    // console.log(dummy);

    result.msg = 'data fetched successfully!'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}


exports.cricketMatchBettingHistory = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }
    const { userId, userRole } = req.user
    // if (!userInput.match_id) {
    //   return APIRes.getErrorResult('Require match_id', res)
    // }

    let result

    // result = await footballBettings
    //   .find({ match_id: userInput.match_id })
    //   .lean()

    result = await betting.aggregate([
      {
        $match: {
          user_id: require('mongoose').Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$match_id',
        },
      },
      {
        $lookup: {
          from: 'cricketbettingadmins',
          localField: '_id',
          foreignField: 'match_id',
          as: 'result',
        },
      },
      {
        $unwind: {
          path: '$result',
        },
      },
    ])

    // result.msg = 'data fetched successfully!'

    return APIRes.getSuccessResult(result, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}




exports.footballMatchLineupWebsite = async (req, res) => {
  try {
    var userInput = Utils.getReqValues(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw errors.array()
    }

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/lineup/detail?user=${footballUser}&secret=${footballSecret}&uuid=${userInput?.match_key}`,
    )

    return APIRes.getSuccessResult(data, res)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
}