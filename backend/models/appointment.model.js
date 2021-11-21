const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  patient: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", apointmentSchema);

module.exports = Appointment;
