var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Offer = mongoose.model("Offer");

app.use(bodyParser.json());

router.post('/', (req, res) => {
  var newOffer = new Offer({
    name: req.body.name,
    photoURL: req.body.photoURL,
    merchantID: req.body.merchantID,
    discount: req.body.discount,
    cost: req.body.cost,
    shortDescription: req.body.shortDescription,
    locationXPos: req.body.locationXPos,
    locationYPos: req.body.locationYPos,
    timeStart: new Date(),
    timeEnd: new Date(),
    loyaltyLevel: req.body.loyaltyLevel
  });

  newOffer.save( (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('success');
    }
  })
})

router.get('/all', (req, res) => {
  Offer.find({}, (err, offers) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(offers);
    }
  })
});

router.put('/:id', (req, res) => {
  var id = req.params['id'];
  Offer.findOne({ _id: id }, (err, offer) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      offer.name = req.body.name || offer.name;
      offer.photoURL = req.body.photoURL || offer.photoURL;
      offer.merchantID = req.body.merchantID || offer.merchantID;
      offer.discount = req.body.discount || offer.discount;
      offer.cost = req.body.cost || offer.cost;
      offer.shortDescription = req.body.shortDescription || offer.shortDescription;
      offer.locationXPos = req.body.locationXPos || offer.locationXPos;
      offer.locationYPos = req.body.locationYPos || offer.locationYPos;
      offer.timeStart = req.body.timeStart || offer.timeStart;
      offer.timeEnd = req.body.timeEnd || offer.timeEnd;
      offer.loyaltyLevel = req.body.loyaltyLevel || offer.loyaltyLevel;
      offer.save((err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  var id = req.params['id'];
  Offer.findOne({_id: id}).deleteOne().then(() => {
    res.send("success");
  })
});

module.exports = router;
