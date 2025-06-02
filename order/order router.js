

const express = require("express")
const { ordercreate, updateorder, delorder, getorder, assignproducts, assignpayment } = require("./order controller")
const { authenticatejwt } = require("../passport/passport middleware")
const { roleauthorization } = require("../roles/roleauthorization")


const orderrouter = express.Router()



orderrouter.post("/add", authenticatejwt,async (req,res)=>{
    const data = await req.body
    const orderdata = await ordercreate(data)
    orderdata ? res.status(200).json({orderdata}) : res.status(400).json({message : "error"})
})



orderrouter.put("/:orid",authenticatejwt,async (req,res)=>{
    const data = await updateorder(Number(req.params.orid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})





orderrouter.delete("/:orid",authenticatejwt,async(req,res)=>{
    const data = await delorder(Number(req.params.orid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



orderrouter.get("/:orid",authenticatejwt,async(req,res)=>{
    const data = await getorder(Number(req.params.orid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})



orderrouter.post("/assignproduct",authenticatejwt,roleauthorization(["Admin"]),async (req,res)=>{
    const data = await req.body
    const orderdata = await assignproducts(data)
    orderdata ? res.status(200).json({orderdata}) : res.status(400).json({message : "error"})
})







module.exports = {
    orderrouter
}