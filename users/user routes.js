
const express = require("express")
const { createuser, userlogin, updateuser, deluser, getuser, assignroles, getuserall } = require("./users controller")
const { authenticatejwt } = require("../passport/passport middleware")
const { roleauthorization } = require("../roles/roleauthorization")
const { permisionauthorization } = require("../passport/permision/permisionauthorization")

const userrouter = express.Router()


userrouter.post("/",authenticatejwt,roleauthorization(["Admin"]),async (req,res)=>{
    const data = await req.body 
    const result = await createuser(data)
    result ? res.status(200).json({userdata : result}) : res.status(400).json({message : "error"})
})




userrouter.put("/:userid",authenticatejwt,roleauthorization(["Admin"]),async (req,res)=>{
    const data = await updateuser(Number(req.params.userid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



userrouter.delete("/:userid",authenticatejwt,roleauthorization(["Admin"]),async(req,res)=>{
    const data = await deluser(Number(req.params.userid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



userrouter.get("/:userid",authenticatejwt,roleauthorization(["Admin"]),permisionauthorization(["getallusers"]),async(req,res)=>{
    const data = await getuser(Number(req.params.userid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})







userrouter.post("/login",async (req,res)=>{
    const data = req.body
    const usertoken = await userlogin(data)
    usertoken ? res.status(200).json({usertoken}) : res.status(400).json({message : "login failed"})
})




userrouter.post("/assign",authenticatejwt,roleauthorization(["Admin"]),async (req,res)=>{
    const data = await req.body 
    const result = await assignroles(data)
    result ? res.status(200).json({result}) : res.status(400).json({message : "error"})
})



userrouter.get("/all",async(req,res)=>{
    const data = await getuserall()
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})








module.exports = {
    userrouter
}