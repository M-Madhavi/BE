require('dotenv').config()
require('./config/database').connect();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cors = require('cors')
var cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')
// if path 
// require('dotenv').config().path('../folderin which env file exist)
const express = require('express')
const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser())

const User = require('./models/user')
app.get('/', (req, res) => {
    res.send("<h1>Authentication</h1>")
})
//RegisterUser  --- steps to be followed
//get All the information
//check mandatory fields
//already registered?
//take care of password
//generate token or send success msg

app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        if (!(email && password && firstname && lastname)) {
            res.status(400).send("All fields are required")
        }
        const existingUser = await User.findOne({ email })
        console.log("existing",existingUser);
        if (existingUser) {
            res.status(401).send("User already exists")
        }
        const myencryptpassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: myencryptpassword
        })
        //token
        const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "2h"
        });
        user.token = token;
        //password should not be shown in respose
        user.password = undefined
        //send token or send just success yes and redirect-choice
        res.status(201).json(user);
    } catch (err) {
        console.log("error", err);
        res.status(500).send("Server error");

    }
})

app.post('/login',async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(400).send({ message: "please fill the required fields" })
        }
        const user = await User.findOne({ email })
        // if(!user){
        //     res.status(400).send({ message: "please register to login" })
        //     return;
        // }
        if (user && bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.SECRET_KEY,
                { expiresIn: '2h' }
            )
            user.token = token
            user.password = undefined
            console.log("user", user);
            //if you want to use cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,//read only by BE server
            }
            return res.status(200).cookie('token',token,options).json({
                success:true,
                token,
                user
            })
         
           // return res.status(200).json(user) //without cookie

        }
        return  res.status(400).send("email or password is incorrect")
    } catch (error) {
    console.log(error);
    }
})
//protecting route

//use the middleware
//check for token presence
//verify token
//extract info from payload
//next()

//token can be
//send to cookie,httpOnly(only accessed in BE)
//in headers
//body

app.get('/dashboard',auth, async(req,res) =>{
 return res.send("Welcome to dashboard")
})

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('token');
    return res.send('Cookie cleared successfully');
});

module.exports = app