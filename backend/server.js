const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socket = require("socket.io");

require("dotenv").config();
// username: hamada
// password: NNmc9KYIe62BTTkt

const app = express();
const server = http.createServer(http);
const port = process.env.PORT || 5000;
const io = socket(server, {
  cors: {
    cors: {
      origin: ["http://localhost:5000", "https://admin.socket.io/"],
    },
  },
  upgrade: false,
});

io.on("connection", (socket) => {
  console.log(socket.id);
});
// a

io.listen(8080);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  },
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");
const patientRouter = require("./routes/patients");

app.use("/doctor", doctorsRouter);
app.use("/appointment", appointmentsRouter);
app.use("/patient", patientRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get("/", (req, res) => {
  res.send("<h1>HEY</h1>");
});

app.post("/", (req, res) => {
  res.send(req.body);
});
