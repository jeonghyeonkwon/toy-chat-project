const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const webSocket = require('./socket');
const dotenv = require('dotenv');


dotenv.config();


const app = express();


app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));


app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+'/index.html')
    
})

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
})

webSocket(server);