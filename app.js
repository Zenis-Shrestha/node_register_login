const express = require ('express');
const bcrypt = require('bcrypt');
const { users } = require('./Model/index');
const app  = express()
app.set("view engine","ejs")

//database connectionn
require("./Model/index")
//get data from form (parse incoming fomr data)
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/register",(req,res)=>{
    res.render("register")
})
//post api for handling user registeration
app.post("/register",async (req,res)=>{
   const email = req.body.email
   const password=  req.body.password
   const username = req.body.username

   //validation on server side
   if(!email || !username || !password){
    res.return.send("Plese fill all the fields")
   }
//    console.log(email,password,username);
    await users.create({
        email:email,
        username:username,
        password :bcrypt.hashSync(password,10),
    })
    res.send("User Registeration Successful");
})
app.listen(3000,function(){
    console.log('server is running on port: ',3000)
});  