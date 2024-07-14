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
app.use(express.urlencoded({extended: false}))

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
  //handle api/:date path functions to make work
function identifyDate(date){
  let regString = `${new Date(date).toUTCString()} ${new Date(date).getMonth() + 1}`.replace(/,|\d\d:\d\d:\d\d /g, "")
  regString = regString.split(" ").map(x => Number(x) ? x.split("").join('|') : x ).join('|')
  const regExp = new RegExp(`${regString}|-`, 'g')

  const invoke = () => Number.isInteger(Number(date)) ? Number(date) : date.replace(regExp, "")  

  if(invoke().length > 0) return "Sus Thing!" 
  else if(invoke()) return "unix Date" 
  else if(invoke().length < 1) return "Normal Date"
  
}

const dateSetter = {
  "Normal Date": () => {
  
    const datestring = `${date}`
    date = new Date(datestring)
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
