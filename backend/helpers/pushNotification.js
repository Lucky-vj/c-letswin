var https = require('https');

async function sendNotification(deviceIds=[], message,data=null) {
  if (!deviceIds.length) {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }
  let restKey = "ODNhY2JjNDMtOTk5Ny00YmY5LWFmMWUtM2ExZjlmMDg4YTMw";
  let oneSignalAppId = "761b271c-3c19-4211-bcb2-8cb62f24eb56";

  var headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${restKey}`,
  };

  var pushMessage = {
    app_id: oneSignalAppId,
    contents: { en: message },
    data:data,
    // included_segments: ['Active Users'],
    include_player_ids: deviceIds,
    // included_segments: ["Subscribed Users"]
    // include_player_ids: item.deviceid,
    // include_external_user_ids:deviceIds
  };
  // console.log('pushMessage', pushMessage);

  var options = {
    host: 'onesignal.com',
    port: 443,
    path: '/api/v1/notifications',
    method: 'POST',
    headers: headers,
  };
 

  return new Promise((resolve, reject) => {
    var req = https.request(options, function (res) {
      res.on('data', function (data) {
        console.log('Response:');
        console.log(JSON.parse(data));
        resolve(JSON.parse(data));
      });
    });

    req.on('error', function (e) {
      console.log('ERROR:');
      console.log(e);
      reject(e);
    });

    req.write(JSON.stringify(pushMessage));
    req.end();
  });
}
module.exports = { sendNotification };