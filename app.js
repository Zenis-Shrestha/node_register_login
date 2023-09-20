const express = require ('express');
const bcrypt = require('bcrypt');
const { users } = require('./Model/index');
const e = require('express');
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
 res.redirect("/login")
})


//user login part
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async(req,res)=>{
 const email = req.body.email
 const password = req.body.password

 //check user entered email with email in database

    const userExists = await users.findAll({
        where:{
            email:email
        }
    })
    // console.log(userExists)


 if(userExists.length> 0){
    //compare user entered password with passwword in database
     const isMatch = bcrypt.compareSync(password,userExists[0].password)
     if(isMatch){
        res.send("Logged In Successfully")
     }else{
        res.send("Invalid Email or Password")
     }
 }
 else{
    res.send('Invalid Email and Password')
 }
})




app.listen(3000,function(){
    console.log('server is running on port: ',3000)
});  