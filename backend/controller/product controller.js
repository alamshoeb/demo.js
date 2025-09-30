const { Op } = require("sequelize")
const { Products } = require("../Model/product model")


const createproduct = async (data)=>{
    const x = await Products.create(data)
    return x
}



const updatepro = async(proid,data)=>{
    const x = await Products.findOne({where : { id : proid}})
    if(!x){return null}
    else {
        const z = await Products.update(data,{where : { id : proid}})
        return z
    }
    
}


const deletepro = async (proid)=>{
    const x = await Products.destroy({where : { id : proid}})
    return x
}




const getpro = async(proid)=>{
    const x = await Products.findOne({where : { id : proid}})
    return x.dataValues
}




const gety = async ()=>{
    const x = Products.findAll()
    return x
}



const search  = async (q)=>{
    const data = Products.findAll({where :  { productName : { [Op.like] : `%${q}%` } }})
return data

}


module.exports = {
    createproduct,updatepro,deletepro,getpro,gety,search
}