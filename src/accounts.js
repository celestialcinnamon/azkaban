'use strict';
const fetch = require('node-fetch');



module.exports = class {
  constructor() {
  
  }
  
  isUserbaseEmpty(fnIfNotEmpty = () => {}, fnIfEmpty = () => {}){
    
    fetch(BASE_URL + '/API/is_userbase_empty/', {
      method: 'GET'    
    })
      .then(data => data.text())
      .then(data => {
        if(data){
          fnIfNotEmpty();
        } else {
          fnIfEmpty();
        }
      })
      .catch(error => console.error(error));
  }
}
