const { Cart } = require("../Model/cart.model")
const { Products } = require("../Model/product model")

const viewcart = async (id)=>{
    const getdata = await Cart.findAll({where : { userid : id},include : { model : Products}} )
    if(!getdata){return null}
    return getdata
}

const delcart = async (id)=>{
    const data = Cart.destroy({where : {id : id}})
    return data
}


const addcart = async (data)=>{
    const add = await Cart.create(data)
    return add
}


module.exports = {
    addcart , viewcart , delcart
}
