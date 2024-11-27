const express = require("express")
const port = 3000
const bodyparser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
app.use(bodyparser.json())

mongoose.connect("mongodb://localhost:27017/",{
    
}).then(()=>{
    console.log("database connect properly")
})
.catch((err)=>{
    console.log("database disconnected")
})


const human = new mongoose.Schema({
    name:String,
    pass: String,
    
})
const Human = mongoose.model("HumanModel",human)

app.post("/human",async(req,res)=>{
    const {name , pass} = req.body
    try{
        const newuserdata = new Human({name,pass});
        await newuserdata.save();
        res.json("Save Successfull")

    }
    catch(err){
        res.json("Error caught")
    }
})

app.get("/human", async(req,res)=>{
    try{
        const human = await Human.find();
        res.json(human)
    }
    catch(err){
        res.json("Data Not found")
    }
})
app.get("/humanfind/:name", async(req,res)=>{
    const {name} = req.params;
    try{
        const userfind = await Human.find({name})
        res.json(userfind)
    }
    catch(err){
        res.json("user isnt in our database")
    }
})

app.listen(port,()=>{
    console.log("System is starting")
})