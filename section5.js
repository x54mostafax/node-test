require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require('path')
const mongoose = require("mongoose");
const RouterApi = require("./router/routeApi");
const RouterUser = require("./router/routeUser");
const app = express();
const port = 4000;
const url = process.env.MONGOOSE_URL;
mongoose.connect(url).then(res => {
  console.log("Good Databases");
  app.listen(process.env.PORT ?? 4000, (req, res) => {
    console.log("the server is ON.");
  });
}).catch((err) => {
  console.log("Bad data...");
});

app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, "uploads")))
app.use("/api", RouterApi);
app.use("/user", RouterUser);
app.use((error, req, res, next) => {
  res.status(400).json({ status: "ERROR,", msg: error.message })
})

app.all('*', async (req, res, next) => {
  res.status(500).json({ status: "ERROR.", data: { msg: 'The Page Is Not Found.' } })
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/boost.html");
});
