var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var port = 8181;
var app = express();
var router = express.Router();
var path = __dirname + "/views/";

require('./offer');
var offers = require('./offers.js');

mongoose.Promise = global.Promise;

mongoose.connect("", {
  useNewUrlParser: true
}, (error) => {
  console.log(error);
})

app.use(bodyParser.json());
app.use(express.static(path));
app.use("/",router);

router.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
  next()
})

app.use('/offers', offers);

router.get("/", (req,res) => {
  res.sendFile(path + "index.html");
})

app.listen(port, () => {
  console.log("Live at Port " + port);
})

router.use( (req,res,next) => {
  console.log("/" + req.method);
  next();
})

app.use("*", (req,res) => {
  res.sendFile(path + "404.html");
})
