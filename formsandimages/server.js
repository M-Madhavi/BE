const express = require('express')
const app = express();
const port = 4001 || process.env.port
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const fileUplaod = require('express-fileupload')
app.use(fileUplaod({
    useTempFiles:true,
    tempFileDir:'./temp'
}));

app.set('view engine',"ejs");
//views action in form to navigate to this route after successfull form submission
app.get('/myget',(req,res) =>{
    console.log(req.body);
    res.send(req.body);
    // res.send(req.query)
});

app.get('/mygetform',(req,res) =>{
    res.render("getform");
});

app.post('/mypost',(req,res) =>{
    console.log(req.files);
    console.log(req.body);

    res.send(req.body);
})

app.get('/mypostform',(req,res) =>{
    res.render("postform");
});

app.listen(port,() =>
    console.log(`server is listening at ${port}`)
);