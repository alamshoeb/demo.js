const express = require("express")
const {  addcart, viewcart, delcart } = require("../controller/cart controller")
const { authenticatejwt } = require("../passport/passport middleware")


const cartrouter = express.Router()


cartrouter.post("/cart",authenticatejwt,async(req,res)=>{
    const data = req.body 
    result = await addcart(data)
    result ? res.status(200).json({data : result , message : "addtocart sucessfull"}) : res.status(400).json({message : "failed"})
})

cartrouter.get("/get/:userid",async (req,res)=>{
    const data = await viewcart(Number(req.params.userid))
    data.length > 0 ? res.status(200).json({data , message : "sucess"}) : res.status(400).json({message : "failed"})
})


cartrouter.delete("/del/:userid", async (req , res)=>{
    const data = await delcart(Number(req.params.userid))
    data ? res.status(200).json({data , message : "remove from cart"}) : res.status(400).json({message : "remove failed"})
})

module.exports = {
    cartrouter
 }