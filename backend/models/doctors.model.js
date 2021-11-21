const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Doctors = mongoose.model("Doctors", doctorsSchema);

module.exports = Doctors;
