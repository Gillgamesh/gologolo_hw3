var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  fontSize: { type: Number, min: 2, max: 144 },
  borderRadius: { type: Number, min: 0, max: 144 },
  borderThickness: { type: Number, min: 0, max: 144 },
  padding: { type: Number, min: 0, max: 144 },
  margin: { type: Number, min: 0, max: 144 },
  color: String,
  borderColor: String,
  backgroundColor: String,
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);