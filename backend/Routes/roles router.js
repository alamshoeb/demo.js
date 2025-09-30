
const express = require("express");


const { authenticatejwt } = require("../passport/passport middleware");
const { createrole, createrolewithuser, updaterole, delrole, getrole } = require("../controller/roles controller");
const { roleauthorization } = require("../roles.authorization/roleauthorization");

const rolerouter = express.Router();


rolerouter.post("/",authenticatejwt,roleauthorization(["superadmin"]),async(req,res)=>{
    const data = req.body
    const newdata = await createrole(data)
    newdata ? res.status(200).json({newdata, status : 1 , message : "Roles has been add sucessfully"}) : res.status(400).json({message : "roles "})
})


rolerouter.post("/withuser",authenticatejwt,roleauthorization(["superadmin"]),async(req,res)=>{
    const data = req.body
    const newdata = await createrolewithuser(data)
    newdata ? res.status(200).json({newdata}) : res.status(400).json({message : "error"})
})


rolerouter.put("/:rolid",authenticatejwt,roleauthorization(["superadmin"]),async (req,res)=>{
    const data = await updaterole(Number(req.params.rolid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})




rolerouter.delete("/:rolid",authenticatejwt,roleauthorization(["superadmin"]),async(req,res)=>{
    const data = await delrole(Number(req.params.rolid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



rolerouter.get("/:rolid",authenticatejwt,async(req,res)=>{
    const data = await getrole(Number(req.params.rolid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})




module.exports = {
    rolerouter
}