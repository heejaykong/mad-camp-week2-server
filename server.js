// 현재
// const PORT=3000
// const MONGO_URI="mongodb://192.249.18.208:27017"

// ENV
require('dotenv').config();
require('./models/contact');

// DEPENDENCIES
const express = require('express');
const app = express();
const http    = require('http');
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

// Static File Service
// app.use(express.static('public'));

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log('Successfully connected to mongodb');
    // const db = client.db('madcampweek2');
    // app.use('/todos', require('./routes/todos'));
    // const usersCollection = db.collection('users');
    // app.post('/users', (req, res) => {
    //     usersCollection.insertOne(req.body)
    //     .then(result => {
    //         console.log(result)
    //     }).catch(error => console.error(error))
    // })
}).catch(e => console.error(e));


//첫 번째 미들웨어
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어 호출 됨\n');
    var approve ={'approve_id':'FAIL','approve_pw':'FAIL'};
    var paramId = req.body.userid;
    var paramPassword = req.body.password;
    console.log('id : '+paramId+'  pw : '+paramPassword);
    //아이디 일치여부 flag json 데이터입니다.
    if(paramId == 'test01' && paramPassword == '123') approve.id = 'success';
    res.send(approve.id);
});

// var server = http.createServer(app).listen(app.get('port'),function(){
//    console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
// }); //아래와 같은 뜻
app.listen(port, () => {
  console.log(`웹서버를 실행함 : ${port}`);
});
