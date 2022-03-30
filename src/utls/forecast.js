const request = require('request')
const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=6e9bb35b16645d8d8e0624dbdcbaa55f&query='+longitude+','+latitude
// request({ url: url, json: true }, (error, response) => {
//  console.log(response.body.daily.data[0].summary + ' It is currently ' +
// response.body.currently.temperature + ' degrees out. There is a ' +
// response.body.currently.precipProbability + '% chance of rain.')
// })



request({ url: url, json: true }, (error, response) => {
    if (error) {
    callback('Unable to connect to forcast services!', undefined)
    } 
//     else if (response.body.location.name.length === 0) {
//     callback('Unable to find forecast. Try another search.',
//    undefined)
//     } 
    else {
    callback(undefined, {
        temperature: response.body.current.temperature     
        //temperature: '20'  
    })
    }
    })
   }

   module.exports = forecast