const router = require("express").Router();
let Patient = require("../models/patients.model");

router.route("/").get((req, res) => {
  Patient.find()
    .then((patient) => res.send(patient))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
