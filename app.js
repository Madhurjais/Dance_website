const Express = require("express");
const fs = require("fs");
const path = require('path');
const app = Express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdancer', {useNewUrlParser: true});
let port = 8000 ;

var contactSchema = new mongoose.Schema({
    name: String,
    age : String,
    number :String
  });
var Contact = mongoose.model('kitten', contactSchema);

app.use("/static",Express.static("static"))
app.use(Express.urlencoded())
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"))
app.get("/",(req,res)=>{
    const params = {"title" : "pubg is the best game",'content' :"content is this"}
    res.render("home.pug",params)
});
app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug")
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(200).send('item was not saved to the databse')
})

})
app.listen(port ,()=>{
    console.log(`LISTEN TO PORT no ${port}`)
})