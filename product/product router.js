

const express = require("express")
const { createproduct, updatepro, deletepro, getpro, getallpro } = require("./product controller")
const { authenticatejwt } = require("../passport/passport middleware")
const { roleauthorization } = require("../roles/roleauthorization")

const productrouter = express.Router()

productrouter.post("/",authenticatejwt,roleauthorization(["product executive"]),async(req,res)=>{
    const data = await req.body
    const productsdata = await createproduct(data)
    productsdata ? res.status(200).json({productsdata}) : res.status(400).json({message : "error"})
})


productrouter.put("/:proid",authenticatejwt,roleauthorization(["product executive"]),async (req,res)=>{
    const data = await updatepro(Number(req.params.proid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})


productrouter.delete("/:proid",authenticatejwt,roleauthorization(["product executive"]),async(req,res)=>{
    const data = await deletepro(Number(req.params.proid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})

productrouter.get("/:proid",authenticatejwt,roleauthorization(["product executive"]),async(req,res)=>{
    const data = await getpro(Number(req.params.proid))
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})


productrouter.get("/all",async (req,res)=>{
    const data = await getallpro()
    data ? res.status(200).json({data}) : res.status(400).json({message : "no product found"})
})



module.exports={
    productrouter
}