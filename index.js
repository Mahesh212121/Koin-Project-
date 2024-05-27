const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
const express = require("express");
const app = express();

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

app.listen(8000, function(){
  console.log('app is running');
});
