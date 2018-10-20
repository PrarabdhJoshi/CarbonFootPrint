'use strict';
var call_api = require('./data-injection').call_api

exports.http = (request, response) => {
  call_api('http://api.footprintnetwork.org/v1/types')
  .then(typeData=>{
    response.status(200).send(typeData);
    // console.log(response)
  })
  .catch(err=>{
    response.status(400).send(JSON.stringify(err));
    console.log(err);
  })
};

exports.event = (event, callback) => {
  console.log("this?")
  callback();
};
