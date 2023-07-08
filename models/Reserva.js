const mongoose = require('mongoose');

const ReservaSchema = mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  command: {
    type: Number,
    required: false
  },
  amountsOfPeople: {
    type: Number,
    default: 0,
    required: false
  },
  squarePreference: {
    type: String,
    default: null,
    required: false
  },
  appointment: {
    type: String,
    default: null,
    required: false
  },
  reservaDate: {
    type: Date,
    default: Date.now,
    required: false
  }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

module.exports = Reserva;