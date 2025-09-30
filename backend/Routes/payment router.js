

const express = require("express");

const { createpay, updatepay, getpay, delpay } = require("../controller/payment controller");
const { authenticatejwt } = require("../passport/passport middleware");
const { roleauthorization } = require("../roles.authorization/roleauthorization");

const payrouter = express.Router();



payrouter.post("/",authenticatejwt,roleauthorization(["finance executive"]),async (req,res)=>{
    const data = req.body
    const newdata  = await createpay(data)
   newdata ? res.status(200).json({newdata}) : res.status(400).json({message :"error"})
})


payrouter.put("/:payid",authenticatejwt,roleauthorization(["finance executive"]),async (req,res)=>{
    const data = await updatepay(Number(req.params.payid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})

payrouter.get("/:payid",authenticatejwt,roleauthorization(["finance executive"]),async(req,res)=>{
    const data = await getpay(Number(req.params.payid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



payrouter.delete("/:payid",authenticatejwt,roleauthorization(["finance executive"]),async(req,res)=>{
    const data = await delpay(Number(req.params.payid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



payrouter.post("/assignprowithpay",async (req,res)=>{
    const data = req.body
    const newdata  = await assigproductwithpayment(data)
   newdata ? res.status(200).json({newdata}) : res.status(400).json({message :"error"})
})





module.exports ={
    payrouter
}