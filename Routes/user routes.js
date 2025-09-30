
const express = require("express")
const { authenticatejwt } = require("../passport/passport middleware")


const { createuser, updateuser, deluser, getuser, userlogin, assignroles, getuserall, assignorder } = require("../controller/users controller")
const { roleauthorization } = require("../roles.authorization/roleauthorization")

const userrouter = express.Router()


userrouter.post("/signup",async (req,res)=>{
    const data = await req.body 
    const result = await createuser(data)
    result ? res.status(201).json({data : result  , message : "user created sucessfully"}) : res.status(400).json({message : "failed to create user"})
})




userrouter.put("/:userid",authenticatejwt,roleauthorization(["Admin"]),async (req,res)=>{
    const data = await updateuser(Number(req.params.userid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



userrouter.delete("/:userid",authenticatejwt,roleauthorization(["Admin"]),async(req,res)=>{
    const data = await deluser(Number(req.params.userid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



userrouter.get("/:userid",async(req,res)=>{
    const data = await getuser(Number(req.params.userid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})







userrouter.post("/login",async (req,res)=>{
    const data = req.body
    const usertoken = await userlogin(data)
    usertoken ? res.status(200).json({token : usertoken}) : res.status(400).json({message : "login failed"})
})




userrouter.post("/assignroles",async (req,res)=>{
    const data = await req.body 
    const result = await assignroles(data)
    result ? res.status(200).json({result}) : res.status(400).json({message : "error"})
})



userrouter.get("/all",async(req,res)=>{
    const data = await getuserall()
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



userrouter.post("/assignorders",async (req,res)=>{
    const data = await req.body 
    const result = await assignorder(data)
    result ? res.status(200).json({result}) : res.status(400).json({message : "error"})
})








module.exports = {
    userrouter
}