const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const APIRes = require('./helpers/result')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const compression = require('compression')
const cors = require('cors')
const unless = require('express-unless')
const path = require('path')
const { upload, s3 } = require('./helpers/AWSFileUpload')
const { v4: uuidv4 } = require('uuid')
const userRoutes = require('./routes/usersRoutes')
const userRoutesUpdated = require('./routes/userRoutesUpdated')
const adminRoutesUpdated = require('./routes/adminRoutesUpdated')
const adminRoutes = require('./routes/adminRouters')
const assetRoutes = require('./routes/assetRouters')
const paymentRoutes = require('./routes/paymentRoutes')
const gameRoutes = require('./routes/betInfoRouters')
const globalErrorHandler = require('./controllers/errorController')
const authMiddleware = require('./middleware/auth')
const matchTransactionModel = require('./models/matchTransactionHistory')
const cron = require('node-cron')
const multer = require('multer')
const moment = require('moment-timezone')
const { sendNotification } = require('./helpers/pushNotification')
const { emitMessage } = require('./helpers/emitMessage')
const {
  updateMatch,
  updateTournament,
  createCricketAuth,
  updateScore,
  updateFinishTournament,
  unsubscribeMatch,
  subscribeMatch,
  updateFinishedMatchBetting,
} = require('./controllers/autoUpdateController')
var zlib = require('zlib')
const cricketLiveScoreModel = require('./models/cricketLiveScoreModel')
const bodyParser = require('body-parser')
const bettingDetails = require('./models/bettingModel')
const matchDetails = require('./models/matchModel')
const walletModel = require('./models/walletModel')
const tournamentModel = require('./models/tournamentModel')
const matchModel = require('./models/matchModel')
const cricketAuthToken = require('./models/cricketAuthTokenModel')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('betting-rs-token')
var project_key = 'RS_P_1570725632827068418'
var api_key = 'RS5:4ed8d02ec70b07cf2010d428f897b28a'
const deviceModel = require('./models/deviceModel')
const axios = require('axios')
const fs = require('fs')
var events = require('events')
const Utils = require('./helpers/utils')
// var api_key = process.env.BETTING_APP_CRICKET_APIKEY;
var request = require('request')
// Start express app
const app = express()

cron.schedule('0 */4 * * *', () => {
  createCricketAuth(),
    updateMatch(),
    updateTournament(),
    updateScore(),
    subscribeMatch(),
    unsubscribeMatch(),
    updateFinishTournament()
})
// const fun =async()=>{
//   const walletUser = await walletModel.findOne({user_id:'630705ca8fdaa7d35d00bfe4'}).populate('user_id').lean()
//   console.log(walletUser.user_id);
// }
// fun()


app.get('/data',async(re,res)=>{
  res.send('asdasdsad')
})

app.enable('trust proxy')

// GLOBAL MIDDLEWARES
app.use(cors())
// Serving static files
app.use('/img', express.static(path.join(__dirname, 'public')))
// Middleware for authenticating token submitted with requests
authMiddleware.authenticateToken.unless = unless
app.use(
  authMiddleware.authenticateToken.unless({
    path: [
      { url: '/api/v1/users/createuser', methods: ['POST'] },
      { url: '/api/v1/users/signup', methods: ['POST'] },
      { url: '/api/v1/users/signin', methods: ['POST'] },
      { url: '/api/v1/users/accesstoken', methods: ['POST'] },
      { url: '/api/v1/users/forgot', methods: ['POST'] },
      { url: '/api/v1/users/forgot-verify', methods: ['POST'] },
      { url: '/api/v1/admin/login', methods: ['POST'] },
      { url: '/api/v1/admin/getaccesstoken', methods: ['POST'] },
      { url: '/api/v1/payment/ipn/response', methods: ['POST'] },
      { url: '/api/v1/payment/ipn/success', methods: ['GET'] },
      { url: '/api/v1/payment/ipn/failure', methods: ['GET'] },
      { url: '/api/v1/users/2fa-enable', methods: ['POST'] },
      { url: '/api/v1/users/2faEmail-enable', methods: ['POST'] },
      { url: '/api/v1/users/2faSms-enable', methods: ['POST'] },
      { url: '/api/v1/admin/live-score', methods: ['POST'] },
      { url: '/api/v1/users/get_document', method: ['POST'] },
      { url: '/api/v1/users/football-widget', method: ['GET'] },
      { url: '/api/v1/users/cricket-widget', method: ['GET'] },
      { url: '/api/v1/users/check-bet', method: ['GET'] },
      { url: '/api/v2/users/website/cricket-list-countries',method:['GET']},
      { url: '/api/v2/users/website/cricket-list-tournament',method:['GET']},
      { url: '/api/v2/users/website/get_today_cricket_match',method:['GET']},
      { url: '/api/v2/users/website/cricket-list-matches',method:['POST']},
      { url: '/api/v2/users/website/cricket-finished-matches-players',method:['POST']},
      { url: '/api/v2/users/website/cricket-live-matches-players',method:['POST']},
      { url: '/api/v2/users/website/today-cricket-live-matches',method:['GET']},
      { url: '/api/v2/users/website/cricket-live-score',method:['POST']},
      { url: '/api/v2/users/website/cricket-finished-matches',method:['GET']},
      { url: '/api/v2/users/website/football-list-countries',method:['GET']},
      { url: '/api/v2/users/website/football-list-tournament',method:['GET']},
      { url: '/api/v2/users/website/football-list-tournament-with-matches',method:['GET']},
      { url: '/api/v2/users/website/football-list-matches',method:['POST']},
      { url: '/api/v2/users/website/football-current-matches',method:['GET']},
      { url: '/api/v2/users/website/football-top-matches-betting',method:['GET']},
      { url: '/api/v2/users/website/football-first-matches-betting',method:['GET']},
      { url: '/api/v2/users/website/football-realtime-data-matches',method:['POST']},
      { url: '/api/v2/users/website/cricket-top-emerging-players',method:['GET']},
      { url: '/api/v2/users/website/football-top-emerging-players',method:['GET']},
      { url: '/api/v2/users/website/get-news-content',method:['GET']},
      { url: '/api/v2/users/website/football-lineup',method:['POST']}
    ],
  }),
)


app.get('/api/v1/users/football-widget', (req, res) => {
  try {
    let userInput = Utils.getReqValues(req)

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    res.send(`

    
<iframe  allowtransparency="true" src='https://widgets.thesports01.com/en/3d/football?profile=4zh4nnunhdoejg77&uuid=${userInput.match_key}'  frameBorder="0" style="overflow:hidden;"  width="100%" height="100%"  ></iframe>


`)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
})

app.get('/api/v1/users/cricket-widget', (req, res) => {
  try {
    let userInput = Utils.getReqValues(req)

    if (!userInput.match_key) {
      return APIRes.getErrorResult('Match Key Required', res)
    }

    res.send(`

    
<iframe  allowtransparency="true" src='https://widgets.thesports01.com/en/cricket?profile=47q33c4ggu1u8qx&uuid=${userInput.match_key}'  frameBorder="0" style="overflow:hidden;"  width="100%" height="100%"  ></iframe>


`)
  } catch (error) {
    return APIRes.getErrorResult(error, res)
  }
})

// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
//app.use("/api", limiter);

app.use('/api', express.static(path.join(__dirname, 'color')))

app.use(bodyParser.json())
app.use(express.json({ type: 'application/json', limit: '20mb' }))
app.use(
  express.urlencoded({ extended: true, limit: '20mb', parameterLimit: '5000' }),
)

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// use compresssion
app.use(compression())

// set the view engine to ejs
app.set('view engine', 'ejs')
app.use(express.static('views'))

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req);
  next()
})

// ROUTES
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/asset', assetRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/game', gameRoutes)
app.use('/api/v1/test', (req, res, next) => {
  res.status(200).json({ status: 'Success' })
})

//version 2 API for cricket 
app.use('/api/v2/users',userRoutesUpdated)
app.use('/api/v2/admin', adminRoutesUpdated)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public')
  },
  filename: function (req, file, cb) {
    cb(null, "letswinsports" + '-' + Date.now() + file.originalname)
  }
})
const fileFilter = (req,file,cb) => {
  if(file.mimetype === "image/jpg"  || 
     file.mimetype ==="image/jpeg"  || 
     file.mimetype ===  "image/png"){
   
  cb(null, true);
 }else{
   return cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
var uploadImage = multer({ storage: storage,
  limits: { fileSize: 100000000000 } })

app.post('/api/v1/upload',uploadImage.single('image'), (req, res) => {
  try{
    if (!req.file) {
      
      return APIRes.getMessageResult("Please upload correct image", 'success', res)
  
    } else {
      return APIRes.getMessageResult("https://letswinsports.io/service/img/"+req.file.filename, 'success', res)
    }
  }
  catch(error){
    
    return APIRes.getErrorResult(error, res)
  }
 

  return
  let myFile = req.file.originalname.split('.')

  const fileType = myFile[myFile.length - 1]

  const { type } = req.body
  const folderName = type || 'profile'
  // console.log(fileType);

  const params = {
    Bucket: process.env.AWS_BUCKETNAME + `/${folderName}`,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
    ContentType: fileType,
  }

  // console.log(params);

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error)
    }

    res.status(200).send({ data: data, status: true, msg: 'success' })
  })
})


// app.post('/api/v1/upload', upload, (req, res) => {
//   let myFile = req.file.originalname.split('.')

//   const fileType = myFile[myFile.length - 1]

//   const { type } = req.body
//   const folderName = type || 'profile'
//   // console.log(fileType);

//   const params = {
//     Bucket: process.env.AWS_BUCKETNAME + `/${folderName}`,
//     Key: `${uuidv4()}.${fileType}`,
//     Body: req.file.buffer,
//     ContentType: fileType,
//   }

//   // console.log(params);

//   s3.upload(params, (error, data) => {
//     if (error) {
//       res.status(500).send(error)
//     }

//     res.status(200).send({ data: data, status: true, msg: 'success' })
//   })
// })

async function rawBody(req, res, next) {
  try {
    req.rawBody = ''
    req.chunks = []
    req.on('data', function (chunk) {
      req.chunks.push(Buffer.from(chunk))
    })
    req.on('end', function () {
      next()
    })
  } catch (error) {
    console.log(error.message, 'first error')
  }
}

app.use(bodyParser.json())
app.use(rawBody)

// app.post('/api/v1/admin/live-score', async function (req, res) {
//   try {
//     var buffer = Buffer.concat(req.chunks)
//     zlib.unzip(
//       buffer,
//       // { finishFlush: zlib.constants.Z_SYNC_FLUSH },
//       async (err, buffer) => {
//         if (!err) {
//           data = JSON.parse(buffer.toString())
//           //console.log("Data", data.data.key, typeof data);
//           const matchInfo = data.data
//           // console.log(data?.data?.play?.live,"matchdata")

//           let updateQuery = {
//             $set: { match_info: matchInfo },
//           }
//           const createDa = await cricketLiveScoreModel.findOneAndUpdate(
//             { match_id: data.data.key },
//             updateQuery,
//             { upsert: true, new: true },
//           )
//           const sendDatas = {}
//           sendDatas.toss =
//             createDa?.match_info?.toss && createDa?.match_info?.toss
//           sendDatas.title =
//             createDa?.match_info?.title && createDa?.match_info?.title
//           sendDatas.teams =
//             createDa?.match_info?.teams && createDa?.match_info?.teams
//           sendDatas.venue =
//             createDa?.match_info?.venue && createDa?.match_info?.venue
//           sendDatas.winner =
//             createDa?.match_info?.winner && createDa?.match_info?.winner
//           ;(sendDatas.format = createDa?.match_info?.play?.overs_per_innings),
//             (sendDatas.status =
//               createDa?.match_info?.status && createDa?.match_info?.status)
//           sendDatas.match_key = createDa?.match_id
//           if (createDa?.match_info?.play) {
//             ;(sendDatas.innings =
//               createDa?.match_info?.play?.innings &&
//               createDa?.match_info?.play?.innings),
//               (sendDatas.target =
//                 createDa?.match_info?.play?.target &&
//                 createDa?.match_info?.play?.target),
//               (sendDatas.firstBatting =
//                 createDa?.match_info?.play?.first_batting &&
//                 createDa?.match_info?.play?.first_batting)
//             ;(sendDatas.a =
//               createDa?.match_info?.play?.innings?.a_1?.score &&
//               createDa?.match_info?.play?.innings?.a_1?.score),
//               (sendDatas.b =
//                 createDa?.match_info?.play?.innings?.b_1?.score &&
//                 createDa?.match_info?.play?.innings?.b_1?.score),
//               (sendDatas.requiredScore =
//                 createDa?.match_info?.play?.live?.required_score &&
//                 createDa?.match_info?.play?.live?.required_score),
//               (sendDatas.liveScore =
//                 createDa?.match_info?.play?.live?.score &&
//                 createDa?.match_info?.play?.live?.score),
//               (sendDatas.battingTeam =
//                 createDa?.match_info?.play?.live?.batting_team &&
//                 createDa?.match_info?.play?.live?.batting_team),
//               (sendDatas.bowlingTeam =
//                 createDa?.match_info?.play?.live?.bowling_team &&
//                 createDa?.match_info?.play?.live?.bowling_team)
//             ;(sendDatas.strikerName =
//               createDa?.match_info?.players &&
//               createDa?.match_info?.players[
//                 `${createDa?.match_info?.play?.live?.striker_key}`
//               ]),
//               (nonStrikerName =
//                 createDa?.match_info?.players &&
//                 createDa?.match_info?.players[
//                   `${createDa?.match_info?.play.live?.non_striker_key}`
//                 ]),
//               (sendDatas.bowlerDetails =
//                 createDa?.match_info.players &&
//                 createDa?.match_info?.players[
//                   `${createDa?.match_info?.play?.live?.bowler_key}`
//                 ])
//             sendDatas.result =
//               createDa?.match_info?.play?.result &&
//               createDa?.match_info?.play?.result
//           }
//           sendDatas.players =
//             createDa?.match_info?.players && createDa?.match_info?.players

//           const getToken = await cricketAuthToken.find()
//           const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)

//           var options = {
//             method: 'GET',
//             url: `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${userInput.match_id}/over-summary/`,
//             headers: {
//               'rs-token': decryptedData,
//             },
//           }

//           axios(options)
//             .then(async (dataset) => {
//               let arr = []

//               const result = dataset?.data?.data?.summaries?.map(
//                 async (item, i) => {
//                   var options = {
//                     method: 'GET',
//                     url: `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${userInput.match_id}/ball-by-ball/${item.index.innings}_${item.index.over_number}/`,
//                     headers: {
//                       'rs-token': decryptedData,
//                     },
//                   }

//                   axios(options).then(async function (data) {
//                     return data?.data?.data
//                   })
//                 },
//               )
//               sendDatas.liveFeed = await Promise.all(result)

//               emitMessage('cricketLiveScoreData', sendDatas)
//             })
//             .catch((err) => {
//               console.log(err.message)
//             })

//           checkingResult(
//             data?.data?.key,
//             data?.data?.play?.live?.score?.overs &&
//               data?.data?.play?.live?.score?.overs[0] + 1,
//             data?.data?.play?.live?.score?.overs &&
//               data?.data?.play?.live?.score?.overs[1],
//             data?.data?.play?.live && data?.data?.play?.live?.batting_team,
//           )
//           if (sendDatas?.status === 'completed') {
//             updateMatch()

//             await bettingDetails
//               .find({
//                 match_id: data?.data?.key,
//                 status: 0,
//               })
//               .update({ $set: { status: 3 } })

//             // updateFinishedMatchBetting(data?.data?.key)
//           }
//           res.send(JSON.stringify({ status: true }))
//         } else {
//           res.send(JSON.stringify({ status: false }))
//         }
//       },
//     )
//   } catch (error) {
//     console.log(error.message)
//   }
// })



// updateFinishedMatchBetting("nzind_2022_t20_02")

const checkingResult = async (matchId, liveOver, liveBall, liveTeam) => {
  try {
    if (liveBall === 0) {
      liveOver = liveOver - 1
      liveBall = 6
    }
    console.log(matchId, liveOver, liveTeam, liveBall)

    const getUserBetting = await bettingDetails.find({
      match_id: matchId,
      status: 0,
      no_of_ball: liveBall,
      no_of_over: liveOver,
      betting_team_key: liveTeam,
    })
    const getToken = await cricketAuthToken.find()
    const decryptedData = cryptr.decrypt(getToken[0].cricket_auth_token)
    console.log(decryptedData)

    console.log(getUserBetting)
    getUserBetting.forEach(async (item, i) => {
      var fees
      if (liveTeam === item?.betting_team_key) {
        if (
          parseInt(item?.no_of_over) === liveOver &&
          parseInt(item?.no_of_ball) === liveBall
        ) {
          var options = {
            method: 'GET',
            url: `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${matchId}/ball-by-ball/`,
            headers: {
              'rs-token': decryptedData,
            },
          }

          axios(options)
            .then(async (data) => {
              console.log(
                'ballcount',
                parseInt(
                  data?.data?.data?.over?.balls[
                    data?.data?.data?.over?.balls?.length - 1
                  ]?.overs[1],
                ),
              )
              if (
                parseInt(
                  data?.data?.data?.over?.balls[
                    data?.data?.data?.over?.balls?.length - 1
                  ]?.overs[1],
                ) === parseInt(item?.no_of_ball)
              ) {
                if (
                  data?.data?.data?.over?.balls[
                    data?.data?.data?.over?.balls?.length - 1
                  ]?.ball_type === 'normal'
                ) {
                  if (
                    data?.data?.data?.over?.balls[
                      data?.data?.data?.over?.balls?.length - 1
                    ]?.team_score?.is_wicket === true &&
                    item.isWicket === true
                  ) {
                    if (
                      data?.data?.data?.over?.balls[item?.no_of_ball]?.wicket
                        ?.wicket_type === item?.wicket_type
                    ) {
                      const match = await matchModel.findOne({
                        match_key: matchId,
                      })
                      const tournament = await tournamentModel.findOne({
                        tournament_id: match.tournament_id,
                      })

                      const findMatch = await matchModel.findOne({
                        match_key: matchId,
                      })
                      let deviceIds = []
                      let alreadyDeviceSaved = await deviceModel.findOne({
                        user_id: item.user_id,
                      })
                      message = `you won the ${
                        findMatch.title
                      } match on ${moment(findMatch.start_at * 1000)
                        .tz('Asia/Kolkata')
                        .format('llll')}. The winning price is ${fees}`
                      if (alreadyDeviceSaved && alreadyDeviceSaved.push_token) {
                        deviceIds.push(alreadyDeviceSaved.push_token)
                        if (
                          alreadyDeviceSaved &&
                          alreadyDeviceSaved.pushenabled &&
                          deviceIds.length > 0
                        ) {
                          msgData = {}
                          await sendNotification(deviceIds, message, msgData)
                        }
                      }

                      var winningPrice

                      if (tournament.withdraw_type === 'percentage') {
                        winningPrice =
                          parseFloat(tournament.fee_percentage / 100) *
                          item.bet_amount
                        await walletModel.findOneAndUpdate(
                          { user_id: item?.user_id },
                          {
                            $inc: {
                              balance: parseFloat(
                                winningPrice + item.bet_amount,
                              ),
                            },
                          },
                          { new: true },
                        )

                        const getWallet = await walletModel.findOne({
                          user_id: item?.user_id,
                        })

                        console.log(
                          parseFloat(getWallet.balance),
                          getWallet.balance,
                          winningPrice,
                        )

                        const createTransactionObj = {
                          user_id: item?.user_id,
                          type: 'CREDIT',
                          match_id: matchId,
                          match_name: 'cricket',
                          no_of_token: parseFloat(
                            winningPrice + item.bet_amount,
                          ),
                          availablebalance: parseFloat(
                            getWallet.balance +
                              parseFloat(winningPrice + item.bet_amount),
                          ),
                          oldbalance: parseFloat(getWallet.balance),
                          no_of_ball: liveBall,
                          no_of_over: liveOver,
                          betting_team: liveTeam,
                        }
                        const createMatchTransactionHistory = await matchTransactionModel.create(
                          createTransactionObj,
                        )
                      } else if (tournament.withdraw_type === 'fixed') {
                        winningPrice = parseFloat(item.bet_amount)
                        await walletModel.findOneAndUpdate(
                          { user_id: item?.user_id },
                          {
                            $inc: {
                              balance: parseFloat(
                                winningPrice + item.bet_amount,
                              ),
                            },
                          },
                          { new: true },
                        )

                        const getWallet = await walletModel.findOne({
                          user_id: item?.user_id,
                        })

                        console.log(
                          parseFloat(getWallet.balance),
                          getWallet.balance,
                          winningPrice,
                        )

                        const createTransactionObj = {
                          user_id: item?.user_id,
                          type: 'CREDIT',
                          match_id: matchId,
                          match_name: 'cricket',
                          no_of_token: parseFloat(
                            winningPrice + item.bet_amount,
                          ),
                          availablebalance: parseFloat(
                            getWallet.balance +
                              parseFloat(winningPrice + item.bet_amount),
                          ),
                          oldbalance: parseFloat(getWallet.balance),
                          no_of_ball: liveBall,
                          no_of_over: liveOver,
                          betting_team: liveTeam,
                        }
                        const createMatchTransactionHistory = await matchTransactionModel.create(
                          createTransactionObj,
                        )
                      }

                      await bettingDetails.findOneAndUpdate(
                        {
                          user_id: item?.user_id,
                          status: 0,
                          match_id: matchId,
                          no_of_ball: liveBall,
                          no_of_over: liveOver,
                          betting_team_key: liveTeam,
                        },
                        { $set: { status: 2, winning_price: winningPrice } },
                        { new: true },
                      )
                    } else {
                      const findMatch = await matchModel.findOne({
                        match_key: matchId,
                      })
                      let deviceIds = []
                      let alreadyDeviceSaved = await deviceModel.findOne({
                        user_id: item.user_id,
                      })
                      message = `you lose the ${
                        findMatch.title
                      } match on ${moment(findMatch.start_at * 1000)
                        .tz('Asia/Kolkata')
                        .format('llll')}.`
                      if (alreadyDeviceSaved && alreadyDeviceSaved.push_token) {
                        deviceIds.push(alreadyDeviceSaved.push_token)
                        if (
                          alreadyDeviceSaved &&
                          alreadyDeviceSaved.pushenabled &&
                          deviceIds.length > 0
                        ) {
                          msgData = {}
                          await sendNotification(deviceIds, message, msgData)
                        }
                      }
                      await bettingDetails.findOneAndUpdate(
                        {
                          user_id: item?.user_id,
                          status: 0,
                          no_of_ball: liveBall,
                          no_of_over: liveOver,
                          betting_team_key: liveTeam,
                        },
                        { $set: { status: 1 } },
                        { new: true },
                      )
                    }
                  }

                  console.log(
                    data?.data?.data?.over?.balls[
                      data?.data?.data?.over?.balls?.length - 1
                    ]?.team_score?.runs === parseInt(item?.no_of_run),
                    parseInt(
                      data?.data?.data?.over?.balls[
                        data?.data?.data?.over?.balls?.length - 1
                      ]?.team_score?.runs,
                    ),
                    parseInt(item?.no_of_run),
                    ' 0 run',
                  )
                  if (
                    parseInt(
                      data?.data?.data?.over?.balls[
                        data?.data?.data?.over?.balls?.length - 1
                      ]?.team_score?.runs,
                    ) === parseInt(item?.no_of_run)
                  ) {
                    const findMatch = await matchModel
                      .findOne({
                        match_key: matchId,
                      })
                      .lean()
                    const tournament = await tournamentModel
                      .findOne({
                        tournament_id: findMatch.tournament_id,
                      })
                      .lean()

                    let deviceIds = []
                    let alreadyDeviceSaved = await deviceModel
                      .findOne({
                        user_id: item.user_id,
                      })
                      .lean()
                    message = `you won the ${findMatch.title} match on ${moment(
                      findMatch.start_at * 1000,
                    )
                      .tz('Asia/Kolkata')
                      .format('llll')}. The winning price is ${fees}`
                    if (alreadyDeviceSaved && alreadyDeviceSaved.push_token) {
                      deviceIds.push(alreadyDeviceSaved.push_token)
                      if (
                        alreadyDeviceSaved &&
                        alreadyDeviceSaved.pushenabled &&
                        deviceIds.length > 0
                      ) {
                        msgData = {}
                        await sendNotification(deviceIds, message, msgData)
                      }
                    }
                    var winningPrice

                    await bettingDetails.findOneAndUpdate(
                      {
                        user_id: item?.user_id,
                        status: 0,
                        no_of_ball: liveBall,
                        no_of_over: liveOver,
                        betting_team_key: liveTeam,
                      },
                      { $set: { status: 2 } },
                      { new: true },
                    )
                  } else {
                    const findMatch = await matchModel.findOne({
                      match_key: matchId,
                    })
                    let deviceIds = []
                    let alreadyDeviceSaved = await deviceModel.findOne({
                      user_id: item.user_id,
                    })
                    message = `you lose the ${findMatch.title}match on${moment(
                      findMatch.start_at * 1000,
                    )
                      .tz('Asia/Kolkata')
                      .format('LT')}`
                    if (alreadyDeviceSaved && alreadyDeviceSaved.push_token) {
                      deviceIds.push(alreadyDeviceSaved.push_token)
                      if (
                        alreadyDeviceSaved &&
                        alreadyDeviceSaved.pushenabled &&
                        deviceIds.length > 0
                      ) {
                        msgData = {}
                        await sendNotification(deviceIds, message, msgData)
                      }
                    }
                    await bettingDetails.findOneAndUpdate(
                      {
                        user_id: item?.user_id,
                        status: 0,
                        no_of_ball: liveBall,
                        no_of_over: liveOver,
                        betting_team_key: liveTeam,
                      },
                      { $set: { status: 1 } },
                      { new: true },
                    )
                  }
                } else {
                  console.log('extra ball')
                  if (
                    data?.data?.data?.over?.balls[
                      data?.data?.data?.over?.balls?.length - 1
                    ]?.ball_type === item?.extra_type
                  ) {
                    const match = await matchModel.findOne({
                      match_key: matchId,
                    })
                    const tournament = await tournamentModel.findOne({
                      tournament_id: match.tournament_id,
                    })

                    const findMatch = await matchModel.findOne({
                      match_key: matchId,
                    })
                    let deviceIds = []
                    let alreadyDeviceSaved = await deviceModel.findOne({
                      user_id: item.user_id,
                    })
                    message = `you won the ${findMatch.title} match on ${moment(
                      findMatch.start_at * 1000,
                    )
                      .tz('Asia/Kolkata')
                      .format('llll')} .The winning price is ${fees}`
                    if (alreadyDeviceSaved && alreadyDeviceSaved.push_token) {
                      deviceIds.push(alreadyDeviceSaved.push_token)
                      if (
                        alreadyDeviceSaved &&
                        alreadyDeviceSaved.pushenabled &&
                        deviceIds.length > 0
                      ) {
                        msgData = {}
                        await sendNotification(deviceIds, message, msgData)
                      }
                    }

                    var winningPrice

                    await bettingDetails.findOneAndUpdate(
                      {
                        user_id: item?.user_id,
                        status: 0,
                        no_of_ball: liveBall,
                        no_of_over: liveOver,
                        betting_team_key: liveTeam,
                      },
                      { $set: { status: 2 } },
                      { new: true },
                    )
                  } else {
                    const findMatch = await matchModel.findOne({
                      match_key: matchId,
                    })
                    let deviceIds = []
                    let alreadyDeviceSaved = await deviceModel.findOne({
                      user_id: item.user_id,
                    })
                    message = `you lose the ${
                      findMatch.title
                    } match on ${moment(findMatch.start_at * 1000)
                      .tz('Asia/Kolkata')
                      .format('llll')}`
                    if (alreadyDeviceSaved && alreadyDeviceSaved.push_token) {
                      deviceIds.push(alreadyDeviceSaved.push_token)
                      if (
                        alreadyDeviceSaved &&
                        alreadyDeviceSaved.pushenabled &&
                        deviceIds.length > 0
                      ) {
                        msgData = {}
                        await sendNotification(deviceIds, message, msgData)
                      }
                    }
                    await bettingDetails.findOneAndUpdate(
                      {
                        user_id: item?.user_id,
                        status: 0,
                        no_of_ball: liveBall,
                        no_of_over: liveOver,
                        betting_team_key: liveTeam,
                      },
                      { $set: { status: 1 } },
                      { new: true },
                    )
                  }
                }
              }

              // }
              // }
            })
            .catch((err) => {
              console.log(err.message, 'errormessage')
            })
        }
      }
    })
  } catch (error) {
    console.log(error.message, 'errormeassadsadasdasd')
  }
}

app.get('/api/v1/users/check-bet', async (req, res) => {
  try {
    checkingResult('icc_wc_t20_2022_g38', 20, 6, 'b')
  } catch (error) {
    res.send(error)
  }
})

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.use(globalErrorHandler)

module.exports = app
