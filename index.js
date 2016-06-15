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
const names     = ['sam', 'greg', 'bill', 'stacy', 'juli', 'jef', 'gary', 'betty', 'betsy', 'blake'];
const tags      = ['tech', 'ponce', 'pizza'];
const genders   = ['men', 'women'];

function generateTweet () {
  let rand1 = _.random(0, 12);
  let rand2 = _.random(5, 50);
  let rand3 = _.random(0, 1);

  let name = names[rand1];
  let tag  = tags[rand1];
  let gender = genders[rand3];
  let photoId = rand2;

  name = name ? name : 'sally';
  tag  = tag ? '#' + tag : '';

  return {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. De quibus cupio scire quid sentias. Negare non possum. ' + tag,
    user: {
      screen_name: name,
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
    let tweet = generateTweet();
  	io.emit('newTweet', tweet);
  }, 1000);
});

// Run Server
http.listen(port, function(){
  console.log('listening on *:' + port);
});



