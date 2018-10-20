var request = require('request');
var headers = {
    'Accept': 'application/json'
};
require('dotenv').config();

var options = {
    url: '',
    headers: headers,
    auth: {
        'user': process.env.USER,
        'pass': process.env.APIKEY
    }
};

module.exports = {
    call_api :((endpoint)=>{
        return new Promise((resolve,reject)=>{
            options.url=endpoint;
            request(options, (error, response, body)=>{
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else{
                    reject(error);
                }
            })
        })
    })

}


