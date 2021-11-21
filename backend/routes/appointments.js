const router = require("express").Router();
let Appointment = require("../models/appointment.model");

router.route("/").get((req, res) => {
  Appointment.find()
    .then((appointment) => res.json(appointment))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").get((req, res) => {
  res.send("nice try kiddo");
});

router.route("/add").post((req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  const patient = req.body.patient;
  const doctor = req.body.doctor;
  const newAppointment = new Appointment({
    date,
    time,
    patient,
    doctor,
  });
  newAppointment
    .save()
    .then(() => res.json("Appointment added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
