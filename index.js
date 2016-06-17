'use strict';

// Our Includes
const app   = require('express')(),
      http  = require('http').Server(app),
      io    = require('socket.io')(http),
      port  = process.env.PORT || 3000,
      _     = require('lodash');


const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    ('OPTIONS' == req.method) ? res.send(200) : next();
};

// Random Tweet Generator
const names     = ['tech404', 'atl-tech', 'bill_jeffers', 'lovehotweather', 'atleats', 'southernbell123', 'loveblackcoffee', 'atl4life', 'gatech2015', 'southernborn555'];
const tags      = ['tech', 'ponce', 'pizza', 'theironyard'];
const genders   = ['men', 'women'];
const messages  = ['Congrats to all the graduates!', 'Lots of awesome projects today @theironyard Atlanta demo day!', 'Good luck to all the iron yard demo day presentors', 'About to watch some awesome presentations tonight @theironyard Atlanta', 'Looking to hire some developers, come check out TIY Atlanta\'s demo day!'];

function generateTweet () {
  let rand1 = _.random(9);
  let rand2 = _.random(5, 50);
  let rand3 = _.random(1);
  let rand4 = _.random(4);

  let name = names[rand1];
  let tag  = tags[rand1];
  let gender = genders[rand3];
  let photoId = rand2;
  let message = messages[rand4];

  tag  = tag ? '#' + tag : '';

  return {
    text: message + ' - ' +  tag,
    user: {
      name: name,
      profile_image_url: 'https://randomuser.me/api/portraits/' + gender + '/' + photoId + '.jpg'
    }
  }

}


// Set up Cors
app.use(allowCrossDomain);
io.set('origins', 'http://localhost:*');


// Run on connection
io.on('connection', function(socket){

  console.log('connected');

  setInterval( function () {
  	io.emit('newTweet', generateTweet());
  }, 5000);
});

// Run Server
http.listen(port, function(){
  console.log('listening on *:' + port);
});



