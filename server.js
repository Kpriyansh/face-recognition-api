
const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const cors = require('cors');
// const knex = require('knex');
const mongoose = require('mongoose')

const { response } = require('express');
const register = require('./Controllers/register')
const signin = require('./Controllers/signin')
const image = require('./Controllers/image');

dotenv.config({path: './config.env'});

const PORT = process.env.PORT || 3002;
const DB = process.env.DATABASE;
// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: 'kpriyansh34',
//         database: 'smartbrain'
//     }
// });


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongodb');
})
.catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>res.send('Started'));
app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt)})

app.put('/image', (req, res) => {image.handeImage(req,res)});

app.post('/signin', (req, res) => {signin.handleSignin(req,res,bcrypt)});



app.listen(PORT, () => console.log(`Listening on port : http://localhost:${PORT}`));