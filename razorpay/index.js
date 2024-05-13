require('dotenv').config()
const Razorpay = require('razorpay')
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })
app.get('/', (req, res) => {
    res.send("Hello")
});

app.post('/order', async(req, res) => {
    const amt = req.body.amount;
    var instance = new Razorpay({ key_id:process.env.key, key_secret:process.env.secret })
    console.log(instance,"-----");
    // instance.payments.fetch(paymentId);
    var options = {
        amount:amt*100, //amt in smallest currency unit
        currency:'INR',
        receipt:"order_rcptid_11",
    }
    // instance.orders.create(options,function(err,order){
    //     console.log("order",order);
    // })

   const myOrder = await instance.orders.create(options)
   res.status(200).json({
    success:true,
    amt,
    order:myOrder
   })
})


app.listen(4000, () => console.log("server is up and running"));