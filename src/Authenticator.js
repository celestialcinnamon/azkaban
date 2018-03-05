'use strict'

const Constants = require(`${__dirname}/Constants`);

class Authenticator{
  constructor(){
    console.log(Constants.BASE_URL);
  }
  
  verifyAgent(userString){
    return fetch(Constants.SERVER_URL + '/API/authenticate_user_agent')
      .then(data => data.text())
      .then(data =>data);
      
  }
}

module.exports = Authenticator;
