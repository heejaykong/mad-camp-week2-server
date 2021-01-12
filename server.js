// ENV
require('dotenv').config();
require('./models/contact');

// DEPENDENCIES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

//Body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());

const contactsRouter = require('./routes/contacts');
const imagesRouter = require('./routes/images');
app.use('/contacts', contactsRouter);
app.use('/images', imagesRouter);

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log('Successfully connected to mongodb');
}).catch(e => console.error(e));

//첫 번째 미들웨어
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어 호출 됨\n');
});

app.listen(port, () => {
  console.log(`웹서버를 실행함 : ${port}`);
});
