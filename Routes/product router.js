

const express = require("express")
const { authenticatejwt } = require("../passport/passport middleware")
const { roleauthorization } = require("../roles.authorization/roleauthorization")
const { createproduct, updatepro, deletepro, getpro, gety, search } = require("../controller/product controller")
const upload = require("../uploads/uploads")

const productrouter = express.Router()

productrouter.post("/",upload.single("file"),async(req,res)=>{
    const x = req.body
    x.url = req.file.filename
    const data = await req.body
    const productsdata = await createproduct(data)
    productsdata ? res.status(200).json({productsdata}) : res.status(400).json({message : "error"})
})

productrouter.get("/search",async (req,res)=>{
const { q } = req.query
if(!q){ return res.status(400).json({message : "query param not found"})}
const result = await search(q)
result ? res.status(200).json({data : result}) : res.status(400).json({message : "error"})
},)


productrouter.put("/:proid",upload.single("file"),async (req,res)=>{
    req.body.url = req.file.filename
    const data = await updatepro(Number(req.params.proid),req.body)
    data ? res.status(200).json({data}) : res.status(400).json({message : "error"})
})


productrouter.delete("/:proid",authenticatejwt,roleauthorization(["product executive"]),async(req,res)=>{
    const data = await deletepro(Number(req.params.proid))
    data ? res.status(200).json(data) : res.status(400).json({message : "error"})
})



productrouter.get("/hello",async (req,res)=>{
    const data = await gety()
    data ? res.status(200).json({data}) : res.status(404).json({message : "no user found"})
})

module.exports={
    productrouter
}