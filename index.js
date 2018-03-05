const electron = require( 'electron' );
const { app, BrowserWindow } = electron;
const accounts = require( `${__dirname}/src/accounts` );
const fetch = require( 'node-fetch' );
const Constants = require(`${__dirname}/src/Constants`);


const accObj = new accounts();

app.on( 'ready', () => {

  let urlStr = `file://${__dirname}/views/index.html`;

  function userbaseEmpty() {
    urlStr = `file://${__dirname}/views/login.html`;
  }

  function userbaseNotEmpty() {
    urlStr = `file://${__dirname}/views/signup.html`;
  }

//  accObj.isUserbaseEmpty( userbaseNotEmpty, userbaseEmpty );

  let win = new BrowserWindow( {
    title: "Azkaban",
    icon: `${__dirname}/assets/logo.png`,
    show: false
  } );

  win.loadURL( urlStr ); //this should be uncommented when in production
  win.once('ready-to-show', () => win.show());

  //win.loadURL( `file://${__dirname}/views/startup.html` );

} );
