const router = require("express").Router();
let Doctor = require("../models/doctors.model");
const io = require("socket.io-client");
const socket = io("http://localhost:5000");

router.route("/").get((req, res) => {
  Doctor.find()
    .then((doctors) => {
      socket.emit("hello", "world");
      // console.log(io);
      return res.json(doctors);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const speciality = req.body.speciality;
  const newDoctor = new Doctor({
    name,
    email,
    phone,
    speciality,
  });
  newDoctor
    .save()
    .then(() => res.json("Doctor added!"))
    .catch((err) => res.status(400).json("Error: " + err));
  var io = req.app.get("socketio");
  io.emit("receive-doctor", newDoctor);
});

router.route("/:id").get((req, res) => {
  Doctor.findById(req.params.id).then((doctor) => res.json(doctor));
});
router.route("/update/:id").post((req, res) => {
  Doctor.findById(req.params.id)
    .then((doctor) => {
      doctor.name = req.body.name;
      doctor.email = req.body.email;
      doctor.phone = req.body.phone;
      doctor.speciality = req.body.speciality;
      doctor
        .save()
        .then(() => res.json("Doctor updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/find").post((req, res) => {
  Doctor.find({ name: req.body.name })
    .then((doctor) => {
      res.send(doctor);
    })
    .catch((err) => {
      res.status(400).json("al7a8noooy: " + err);
    });
});

module.exports = router;
