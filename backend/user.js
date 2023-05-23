// let users = [];

// exports.addUser = ({ id, name, room }) => {
  
//   if (!name || !room) return { error: "name and room required." };
//   const user = { id, name, room };

//   users.push(user);

//   return { user };
// };
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const mqtt = require('mqtt')
const host = 'mq.thesports.com'
const portt = '443'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const cricketBetModel = require('./models/bettingModel')
const cricketAdminBetModel =require('./models/cricketBettingAdmin')
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
)
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err))
try {
  const connectUrl = `wss://${host}:${portt}/mqtt`
  const client = mqtt.connect(connectUrl, {
    clientId:clientId,
    clean: true,
    username: 'alpharive',
    password: '9ecc1d920c56bebadc08a6301108e67a',
    rejectUnauthorized: false,
    retain:false,
    protocol: "wss",
    connectTimeout: 4000,
    reconnectPeriod: 1000
  })
 
  let topic='thesports/cricket/match/v1'
  client.on("connect", () => {
    console.log("Connected");
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic} '`);
    });
  });
  client.on("message", async(topic, payload) => {
  try{
    JSON.parse(payload.toString()).forEach(async(e)=>{
      if(e?.timeline!==undefined){      
        console.log(e?.id &&e?.id ,e?.timeline[0].overs,e?.timeline[0].team_id);
      }
    try {
      const  cricAdminBetData = await cricketAdminBetModel.findOne({match_id:e?.id}).lean()
      if(cricAdminBetData){
      const cricBets =await cricketBetModel.find({match_id:e?.id,status:{$eq:0}});
      if(e?.timeline!==undefined){
      if(cricBets !==undefined){
       cricBets.forEach(async(element,f) => {
        var update ={}
        var query={}
       if(element?.bet_type ==="run"){
          if(element.betting_team_key===e?.timeline[0].team_id){
            const result =await e?.timeline[0].overs.filter(item=>item[0]===parseInt(element?.no_of_over))
            if(result.length ===6){
              const item =await result.filter(item=>item[1]===parseInt(element?.no_of_ball)&&item[0]===parseInt(element?.no_of_over))
            if(item[0][2]===parseInt(element.no_of_run)){
              update.status =2;
              update.status_text ="win"
              query._id =element?._id
             }else{
              update.status =1;
              update.status_text ="lose"
              query._id =element?._id
             }
            }else{
              const runData =await result.filter(item=>item[4]!=='NB'&&item[4]!=='WD')
              const wicketData =await e?.timeline[0].wickets.filter(item=>item[0]===parseInt(element?.no_of_over))
              if(wicketData.length === 0){
                  const itemm =await runData.filter((item,index)=>{
                  if(item[0]===parseInt(element?.no_of_over) &&index+1 ===parseInt(element.no_of_ball) ){
                    return item
                  }
                  })
                  if(itemm[0] !== undefined){
                  if(  itemm[0][2]===parseInt(element.no_of_run)){
                    update.status =2;
                    update.status_text ="win"
                    query._id =element?._id
                   }else{
                    update.status =1;
                    update.status_text ="lose"
                    query._id =element?._id
                   }
                  }
              }
            }
           
         }
       }
      else if(element.bet_type ==="extra"){
        if(element.betting_team_key ===e?.timeline[0].team_id){
          const result =await e?.timeline[0].overs.filter(item=>item[0]===parseInt(element?.no_of_over))
          if(result.length ===6){
          //  result.forEach(async (item)=>{
            const item =await result.filter(item=>item[1]===parseInt(element?.no_of_ball)&&item[0]===parseInt(element?.no_of_over))
          if(item[0][4]===parseInt(element.extra_description) 
            &&item[0][3]===parseInt(element.no_of_run)){
            update.status =2;
            update.status_text ="win"
            query._id =element?._id
           }else{
            update.status =1;
            update.status_text ="lose"
            query._id =element?._id
           }
          // })
        }else{
         if(element.extra_description ==='B'|| element.extra_description ==='LB'){
          const runData = await result.filter(item=>item[4]!=='NB'&&item[4]!=='WD')
          const item =await runData.filter((item,index)=>index+1===parseInt(element?.no_of_ball)&&item[0]===parseInt(element?.no_of_over))
           if( item[0][4]===element.extra_description 
            &&item[0][3]===parseInt(element.no_of_run)){
              update.status =2;
              update.status_text ="win"
              query._id =element?._id
           }else{
            update.status =1;
            update.status_text ="lose"
            query._id =element?._id
           }
          // })
         }else{
          // result.forEach(async(item,i)=>{
            const item =await result.filter(item=>item[0] ===parseInt(element.no_of_over) && item[1] ===parseInt(element.no_of_ball))
            if( item[0][4]===element.extra_description 
             && item[0][3]===parseInt(element.no_of_run)){
               update.status =2;
               update.status_text ="win"
               query._id =element?._id
            }else{
             update.status =1;
             update.status_text ="lose"
             query._id =element?._id
            }
          //  })
         }
        }
        }
       }
      else if(element.bet_type ==="wicket"){
        if(element.betting_team_key===e?.timeline[0].team_id){
          const result = await e?.timeline[0].overs.filter(item=>item[0]===parseInt(element?.no_of_over))
          const wicketData =await e?.timeline[0].wickets.filter(item=>item[0]===parseInt(element?.no_of_over))
          if(wicketData.length !==0){
          if(result.length ===6){
            const item = await wicketData.filter(item=>item[0] ===parseInt(element.no_of_over) && item[1] ===parseInt(element.no_of_ball))
            if(item[0][1] ===parseInt(element.no_of_ball)){
            update.status =2;
            update.status_text ="win"
            query._id =element?._id
           }else{
            console.log(2)
            update.status =1;
            update.status_text ="lose"
            query._id =element?._id
           }
          }else{
          const runData = result.filter(item=>item[4]!=='NB'&&item[4]!=='WD')
          const wicketData =e?.timeline[0].wickets.filter(item=>item[0]===parseInt(element?.no_of_over))
          if(wicketData.length !==0){
            const item =await runData.filter((item,index)=>{
              if(item[0]===parseInt(element?.no_of_over) &&index+1 ===parseInt(element.no_of_ball) ){
                return item
              }
              })
            
              const ele = await wicketData.filter(e=>item[0][1]===e[1])
              console.log(item,ele,"ppp");
            if( item[0][3]===0 &&item[0][1]===(ele?.length!==0 &&ele[0][1])){
              update.status =2;
              update.status_text ="win"
              query._id =element?._id
            }else{
              update.status =1;
              update.status_text ="lose"
              query._id =element?._id
            }
          }else{
            update.status =1;
            update.status_text ="lose"
            query._id =element?._id
          }
        }
          }else{
           update.status =1;
            update.status_text ="lose"
            query._id =element?._id
        }
        }
       }
       const updateData = await cricketBetModel.updateMany({_id:query._id},{$set:update},{ updatedct: true});
       });
       }
      }
      
      }
    } catch (error) {
      console.log(error);
    }
    })
  }catch(e){
   console.log(e,"lp");
 } });
  
  
  client.on('error',(e)=>{
  console.log(e,"error");
  }) 
} catch (error) {
  console.log(error);
}


