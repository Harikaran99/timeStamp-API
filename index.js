// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date

  //handle api/:date path functions 
function identifyDate(date){
  const lookForAlpha = /[^\d-]/gm
  const lookForGroups = date.match(/\d+/g)
  const alphaResult = lookForAlpha.test(date)
  console.log(alphaResult)

  if(alphaResult || lookForGroups.length > 3) return "Sus Thing!" 
  else if(lookForGroups.length == 1 ) return "unix Date" 
  else if(!alphaResult && lookForGroups.length > 1) return "Normal Date"
  
}

console.log(identifyDate(date))

const dateSetter = {
  "Normal Date": () => {
  
    const datestring = `${date}T00:00:00Z`
    date = new Date(datestring)
    console.log(date)
    return {
      unix: date*1,
      utc: date.toUTCString()
      }
    },
  "Sus Thing!": () => ({
    "error": "Invalid Date"
    }),
  "unix Date": () => {
    date = date.match(/\d+/g).map(x => Number(x))
  return {
    unix: date[0],
    utc: new Date(date[0]).toUTCString()
    }
  } 
}
  res.json(dateSetter[identifyDate(date)]())
})

app.get("/api", (req, res) => {
  res.json({
    unix: new Date() * 1,
    utc: new Date().toUTCString()
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
