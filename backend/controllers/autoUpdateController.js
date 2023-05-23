const Cryptr = require('cryptr')
const cricketAuthModel = require('../models/cricketAuthTokenModel')
const cryptr = new Cryptr('betting-rs-token')
const tournamentModel = require('../models/tournamentModel')
const matchModel = require('../models/matchModel')
var project_key = 'RS_P_1570725632827068418'
var api_key = 'RS5:4ed8d02ec70b07cf2010d428f897b28a'
const axios = require('axios')
const request = require('request')
const moment = require('moment')
const cricketLiveScoreModel = require('../models/cricketLiveScoreModel')
const footballTournamentModel = require('../models/footballTournamentModel')
const bettingModel = require('../models/bettingModel')
const walletModel = require('../models/walletModel')
const matchTransactionModel = require('../models/matchModel')

const footballUser = process.env.FOOTBALL_USER
const footballSecret = process.env.FOOTBALL_SECRET
module.exports.createCricketAuth = async (req, res) => {
  try {
    var options = {
      method: 'POST',
      url: `https://api.sports.roanuz.com/v5/core/${project_key}/auth/`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: `${api_key}`,
      }),
    }
    request(options, async function (error, response) {
      if (error) throw new Error(error)
      const encryptedData = cryptr.encrypt(JSON.parse(response.body).data.token)
      const getToken = await cricketAuthModel.find()
      if (getToken[0] && getToken[0]?.cricket_auth_token) {
        const setCricketAuth = await cricketAuthModel.findByIdAndUpdate(
          { _id: getToken[0]._id },
          { cricket_auth_token: encryptedData },
          { upsert: true },
        )
      }
    })
  } catch (error) {
    console.log(error?.message)
  }
}

module.exports.updateMatch = async () => {
  try {
    const getToken = await cricketAuthModel.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    console.log(decryptedData)
    const listedData = await tournamentModel.find().lean()
    listedData.forEach(async (element) => {
      element.match_info.matches.forEach(async (item) => {
        console.log(item.key)
        var option = {
          method: 'get',
          url: `https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/match/${item.key}/`,
          headers: {
            'rs-token': decryptedData,
          },
        }
        try {
          const match_res = await axios(option)
          let insert = {
            name: match_res.data.data.name,
            venue: match_res.data.data.venue,
            sub_title: match_res.data.data.sub_title,
            format: match_res.data.data.format,
            title: match_res.data.data.title,
            winner: match_res.data.data.winner,
            squad_a_captain: match_res.data.data.squad.a.captain,
            squad_b_captain: match_res.data.data.squad.b.captain,
            squad_a_keeper: match_res.data.data.squad.a.keeper,
            squad_b_keeper: match_res.data.data.squad.a.keeper,
            players: match_res.data.data.players,
            status: match_res.data.data.status,
            start_at: match_res.data.data.start_at,
            squad: match_res.data.data.squad,
            teams: match_res.data.data.teams,
            tournament_id: element.tournament_id,
          }
          let updateQuery = {
            $set: insert,
          }
          const insertData = await matchModel.findOneAndUpdate(
            { match_key: item.key },
            updateQuery,
            { new: true, upsert: true },
          )
          console.log(insertData)
        } catch (error) {
          console.log(error.message)
        }
      })
    })
  } catch (error) {
    console.log(error?.message)
  }
}
module.exports.updateTournament = async () => {
  try {
    const getToken = await cricketAuthModel.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    const listedData = await tournamentModel.find().lean()
    listedData.forEach(async (element) => {
      var config = {
        method: 'get',
        url: `https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/tournament/${element.tournament_id}/featured-matches/`,
        headers: {
          'rs-token': decryptedData,
        },
      }
      const response = await axios(config)

      // element.match_info.matches.forEach(async (item) => {
      //   response.data.data.matches.forEach(async (ke) => {
      //     if (item.key !== ke.key) {
      // console.log( item.key !== ke.key)
      let updateQuery = {
        $set: { match_info: response.data.data },
      }
      console.log(updateQuery)
      const updateData = await tournamentModel.findOneAndUpdate(
        { tournament_id: element.tournament_id },
        updateQuery,
        { upsert: true, new: true },
      )
      console.log(updateData, 'lll')
      //       } else {
      //         return null;
      //       }
      //     });
      //   });
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateScore = async () => {
  try {
    const getToken = await cricketAuthModel.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    const listedData = await matchModel.find({ status: 'completed' }).lean()
    listedData.forEach(async (element) => {
      var config = {
        method: 'get',
        url: `https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/match/${element.match_key}/`,
        headers: {
          'rs-token': decryptedData,
        },
      }
      const response = await axios(config)
      let insert = {
        winner: response.data.data.winner,
        toss: response.data.data.toss,
        players: response.data.data.players,
        play: response.data.data.play,
        squad: response.data.data.squad,
      }
      const insertData = await matchModel
        .findOneAndUpdate(
          { match_key: element.match_key },
          { $set: insert },
          { new: true, upsert: true },
        )
        .lean()
      console.log(insertData)
    })
  } catch (error) {
    console.log(error?.message)
  }
}

module.exports.subscribeMatch = async () => {
  try {
    const getToken = await cricketAuthModel.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    const listedData = await matchModel
      .find({
        status: { $ne: 'completed' },
        start_at: {
          $gte: moment().startOf('day').format('X'),
          $lt: moment(moment().startOf('day').toDate())
            .endOf('day')
            .format('X'),
        },
      })
      .select('-players -play -squad')
      .lean()
    listedData.forEach(async (element) => {
      console.log(element.match_key)
      var data = JSON.stringify({
        method: 'web_hook',
      })

      var config = {
        method: 'post',
        url: `https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/match/${element?.match_key}/subscribe/`,
        headers: {
          'rs-token': decryptedData,
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error.message)
        })

      // const response = await axios(config);
      // console.log(response);
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports.unsubscribeMatch = async () => {
  try {
    const getToken = await cricketAuthModel.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    const listedData = await cricketLiveScoreModel
      .find({ 'match_info.status': 'completed' })
      .lean()
    listedData.forEach(async (element) => {
      var data = JSON.stringify({
        method: 'web_hook',
      })

      var config = {
        method: 'post',
        url: `https://api.sports.roanuz.com/v5/cricket/RS_P_1570725632827068418/match/${element?.match_key}/unsubscribe/`,
        headers: {
          'rs-token': decryptedData,
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error.message)
        })

      // const response = await axios(config);
      // console.log(response);
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateFootballTournament = async () => {
  try {
    const { data } = await axios.get(
      `https://api.thesports.com/v1/football/match/diary?user=${footballUser}&secret=${footballSecret}`,
    )

    var arr = data?.results_extra?.competition

    const updateTournament = await footballTournamentModel.create(arr)
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateFinishedMatchBetting = async (matchKey) => {
  try {
    const match = await cricketLiveScoreModel
      .findOne({
        match_id: matchKey,
      })
      .lean()
    const totalBetAmountInMatch = match.totalBetAmount

    const cancelledBettings = await bettingModel.find({ match_id: matchKey,status:3,money_updated:false }).lean();
    const winBettings = await bettingModel.find({ match_id: matchKey,status:2,money_updated:false }).lean();
    const loseBettings = await bettingModel.find({ match_id: matchKey,status:1,money_updated:false }).lean();
    var loseBettingCount=loseBettings.length;
    var winBettingsCount=winBettings.length;
    // loseBettingCount===0?loseBettingCount=1:loseBettingCount;
    // winBettingsCount===0?winBettingsCount=1:winBettingsCount;



    if(loseBettingCount && winBettingsCount){

      const winningPrice = ((winBettings[0]?.bet_amount  || loseBettings[0]?.bet_amount || cancelledBettings[0]?.bet_amount)*(loseBettingCount))/winBettingsCount;
      console.log(winningPrice,'first');

      //update matchtransaction(winning price) and wallet balance

console.log(winBettings[0])
      const winBettingModel =  winBettings?.forEach(async(item,i)=>{

        const updateUserWallet = await walletModel.findOneAndUpdate({user_id:item.user_id},{$inc:{balance:winningPrice+item.bet_amount}},{new:true});

        const createTransactionObj = {
        user_id: item?.user_id,
        type: 'CREDIT',
        match_id: item.match_id,
        match_name: 'cricket',
        no_of_token: parseFloat(
          winningPrice + item.bet_amount,
        ),
        availablebalance: parseFloat(
          updateUserWallet.balance 
        ),
        oldbalance: parseFloat(  updateUserWallet.balance )-parseFloat(item.bet_amount),
        no_of_ball: item.no_of_ball,
        no_of_over: item.no_of_over,
        betting_team: item.betting_team,
      }

      // const createMatchTransaction = await 

      }) 


      // const createTransactionObj = {
      //   user_id: item?.user_id,
      //   type: 'CREDIT',
      //   match_id: matchId,
      //   match_name: 'cricket',
      //   no_of_token: parseFloat(
      //     winningPrice + item.bet_amount,
      //   ),
      //   availablebalance: parseFloat(
      //     getWallet.balance +
      //       parseFloat(winningPrice + item.bet_amount),
      //   ),
      //   oldbalance: parseFloat(getWallet.balance),
      //   no_of_ball: liveBall,
      //   no_of_over: liveOver,
      //   betting_team: liveTeam,
      // }

    }
    else if(winBettingsCount){
      const winningPrice = ((winBettings[0]?.bet_amount  || loseBettings[0]?.bet_amount || cancelledBettings[0]?.bet_amount));
      console.log(winningPrice,'second');



      //update matchtransaction credit(no winning price) and wallet balance;

    }else {
      const winningPrice = 0
      console.log(winningPrice,'third');

      //no winning price 
      
    }


 


  } catch (error) {
    console.log(error)
  }
}
