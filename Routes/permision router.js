
const express = require("express");
const { authenticatejwt } = require("../passport/passport middleware");
const { roleauthorization } = require("../roles.authorization/roleauthorization");
const { createper, updateper, assignpermision, getpermision } = require("../controller/permision controller");

const perrouter = express.Router();


perrouter.post("/",authenticatejwt,roleauthorization(["superadmin"]),async (req,res)=>{
    const data = await req.body
    const newdata = await createper(data)
    if(newdata){res.status(200).json({newdata})}
    else {res.status(400).json({message : "error"})}
})


perrouter.put("/:perid",authenticatejwt,roleauthorization(["superadmin"]),async(req,res)=>{
        const newdata = await updateper(Number(req.params.perid),req.body)
        newdata ? res.status(200).json({newdata}) : res.status({message : " error"})
})



perrouter.post("/assignpermision",authenticatejwt,roleauthorization(["superadmin"]),async(req,res)=>{
    const data = req.body
    const newdata = await assignpermision(data)
    newdata ? res.status(200).json({newdata}) : res.status(400).json({message : "error"})
})



perrouter.get("/",authenticatejwt,async (req,res)=>{
    const data = await getpermision()
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



module.exports = {
    perrouter
}