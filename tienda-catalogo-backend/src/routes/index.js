const express = require("express");
const app = express();
const cors = require('cors');

app
  .use(cors()) 
  .use("/electronica", require("./electronica/index"))
  .use("/deporte", require("./deporte/index"))
  
module.exports = app;