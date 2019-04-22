var mongoose = require("mongoose");
var OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: false
  },
  merchantID: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  locationXPos: {
    type: String,
    required: false
  },
  locationYPos: {
    type: String,
    required: false
  },
  timeStart: {
    type: Date,
    required: true
  },
  timeEnd: {
    type: Date,
    required: true
  },
  loyaltyLevel: {
    type: Number,
    required: false,
    default: 0
  }
})

var Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;
