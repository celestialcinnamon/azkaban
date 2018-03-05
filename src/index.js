'use strict';


const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => context.querySelectorAll(selector);
const isReachable = require('is-reachable');
const accounts = require(`${__dirname}/src/accounts`);

isReachable('http://localhost/').then(reachable => reachable? serverOnline() : serverOffline());

const textboxes = $$('input');
textboxes.forEach(textbox => textbox.addEventListener('blur', __handleFocusLost));

const signUpForm = $('.js-sign-up-form');
signUpForm.addEventListener('submit', function(evt){
  requestSignUp(signUpForm[0].value, signUpForm[1].value, signUpForm[2].value);
  
  evt.preventDefault();
});

const logInForm = $('.js-log-in');
logInForm.addEventListener('submit', function(e){
  requestLogIn(this['username'].value, this['password'].value);
  e.preventDefault();
});


function __handleFocusLost(evt){
  if(this.type === 'text' || this.type === 'email'){
    checkValidity({ value: this.value, type: 'unique' });
  }
}

function requestSignUp(username, email, password){
  const payload = {
    username: username,
    email:    email,
    password: password
  };
  
  const data = new FormData();
  data.append('json', JSON.stringify( payload ));
  
  fetch(BASE_URL + '/API/attempt_user_sign_up', {
    method: "POST",
    body: data
  })
    .then(function(res){
      return res.json();
    })
    .then(function(resJSON) { 
      let json = resJSON;
      
      if(json.code === 1062){
        makeToast($('.js-toast'), json.message, '', 1000);
      }
      
    })
    .catch(function(data) { 
      console.error( data );
    });
}

function requestLogIn(username, password){
  alert(username, password);
}

function makeToast(toast, message, type, duration){
  
  toast.classList.add('shown');  
  $('.toast--content', toast).innerHTML = message;
  setTimeout(() =>   toast.classList.remove('shown'), 2500);
}


/*
 * value: the string to check validity
 * type: either 'unique' (other values are yet to be supported)
 */

function checkValidity({ value, type }){
  const data = new FormData();
  data.append('json', JSON.stringify({
    value: value,
    type: type
  }));

  fetch(BASE_URL + '/API/validity_checker', {
    method: "POST",
    body: data
  })
    .then(data=>{
      console.log(data.text());
    })
    .catch(data=>{
      console.error(data.text());
    });
}

function serverOnline(){
  console.log('Server is online.');
  hideLoader();
}

function serverOffline(){
  console.log('Server is offline.');
  makeToast($('.js-toast'), 'The server is unreachable. Changes you make will be stored on this computer.', '', 1000);
  hideLoader();
}

function showLoader(loader = $('.loader')){
  loader.classList.remove('hidden');
}

function hideLoader(loader = $('.loader')){
  loader.classList.add('hidden');
}
function toggleLoader(loader = $('.loader')){
  loader.classList.toggle('hidden');
}


