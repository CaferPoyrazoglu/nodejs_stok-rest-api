const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const myRoute = require("./routes/Route");
app.use("/", myRoute);

app.use(function (req, res, next) {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }
});

mongoose.connect(
  process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
},
  () => {
    console.log("DB BAGLANDI.");
  }
);

app.listen(port, () => {
  console.log("PORT AKTİF - http://localhost:8000/");
});