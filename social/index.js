const express = require('express')
const format = require('date-format')
const app = express()
const port = 8080
app.get("/",(req,res) =>{
res.status(200).send("Hello BE,Long time no see?")
})

app.get("/api/v1/:token",(req,res) =>{
    console.log("param",req.params.token)
    res.status(200).json({param:req.params.token})
})
app.get("/api/v1/instagram",(req,res) =>{
    let info ={
        name:"abc",
        email:"abc@gamil.com",
        followers:100,
        following:0,
        date:format.asString("dd[MM] hh:mm:ss",new Date())
    }
    res.status(200).json(info)
})
app.get("/api/v1/facebook",(req,res) =>{
    let info ={
        name:"abc",
        email:"abc@gamil.com",
        followers:100,
        following:0
    }
    res.status(200).json(info)
})
app.listen(port, () => {
    console.log("app listening at port", port)
})