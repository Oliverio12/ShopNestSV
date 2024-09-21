require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), ()=>{
    console.log(`puerto en uso ${app.get('port')}`)
})


app.use('/shopnestsv/v1/', require('./routes/index'))
