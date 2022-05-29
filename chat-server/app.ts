import * as express from 'express';
import * as morgan from 'morgan';
import * as session  from 'express-session'
import {webSocket} from './socket';
import * as dotenv from 'dotenv'
const {sequelize} = require('./models');

dotenv.config();


const app = express();

sequelize
    .sync({force: false})
    .then(() => {
        console.log('연결 성공');
    })
    .catch(() => {
        console.log('에러');
    });


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