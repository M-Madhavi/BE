require('dotenv').config()
const express = require('express')
const app = express();
const port = 4001 || process.env.port
const cloudinary = require('cloudinary').v2
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fileUplaod = require('express-fileupload');
app.use(fileUplaod({
    useTempFiles: true,
    tempFileDir: './temp'
}));
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

app.set('view engine', "ejs");
//views action in form to navigate to this route after successfull form submission
app.get('/myget', (req, res) => {
    console.log(req.body);
    res.send(req.body);
    // res.send(req.query)
});

app.get('/mygetform', (req, res) => {
    res.render("getform");
});

app.post('/mypost', async(req, res) => {
    console.log(req.files);
    console.log(req.body);
    let file = req.files.samplefile
    let result,imageArr=[];
     /*USE CASE FOR MULTIPLE IMAGE UPLOAD*/
     if (req.files) {
        for (let index = 0; index < req.files.samplefile.length; index++) {
       let result = await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath,{
            folder:"users"
          })
          imageArr.push({
            public_id:result.public_id,
            secure_url:result.secure_url
          })
        }
        
     }


    /*USE CASE FOR SINGLE IMAGE UPLOAD*/
    // result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder: 'users' //cloudinary folder which i created in coudinary
    // });
    // console.log("result", result);
    details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result,
        imageArr

    };
    console.log("details", details);

    res.send(details);
})

app.get('/mypostform', (req, res) => {
    res.render("postform");
});

app.listen(port, () =>
    console.log(`server is listening at ${port}`)
);