

const express = require("express")
const { ordercreate, updateorder, delorder, getorder, assignproducts, assignorderwithpay } = require("../controller/order controller")
const { roleauthorization } = require("../roles.authorization/roleauthorization")
const { authenticatejwt } = require("../passport/passport middleware")



const orderrouter = express.Router()



orderrouter.post("/add",async (req,res)=>{
    const data = await req.body
    const orderdata = await ordercreate(data)
    orderdata ? res.status(200).json({data : orderdata , message : "order placed sucessfully"}) : res.status(400).json({message : "order placed failed"})
})



orderrouter.put("/:orid",authenticatejwt,async (req,res)=>{
    const data = await updateorder(Number(req.params.orid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})





orderrouter.delete("/:orid",authenticatejwt,async(req,res)=>{
    const data = await delorder(Number(req.params.orid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



orderrouter.get("/:orid",async(req,res)=>{
    const data = await getorder(Number(req.params.orid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



orderrouter.post("/assignproduct",authenticatejwt,roleauthorization(["Admin"]),async (req,res)=>{
    const data = await req.body
    const orderdata = await assignproducts(data)
    orderdata ? res.status(200).json({orderdata}) : res.status(400).json({message : "error"})
})




orderrouter.post("/assign",async (req,res)=>{
    const data = await req.body
    const orderdata = await assignorderwithpay(data)
    orderdata ? res.status(200).json({orderdata}) : res.status(400).json({message : "error"})
})




module.exports = {
    orderrouter
}