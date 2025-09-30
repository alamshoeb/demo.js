
const { Orders } = require("../Model/order model")
const { Payment } = require("../Model/payment model")

const { Products } = require("../Model/product model")


const ordercreate = async (data)=>{
    const x = Orders.create(data)
    return x
}

const updateorder = async(orid,data)=>{
    const x = await Orders.findOne({where : { id : orid}})
    if(!x){ return null}
    else {
        const z = await Orders.update(data,{where : { id : orid}})
        return z
    }

}

const getorder = async(orid)=>{
    const z = await Orders.findOne({where : { id : orid}})
    return z
}


const delorder = async (orid)=>{
    const x = await Orders.destroy({where : { id : orid}})
    return x
}


const assignproducts = async (data)=>{
    const x = await Orders.findOne({where : { id : data.orderid}})
    const y = await Products.findOne({where : { id : data.productid}})
    if(!x || !y){return null}
    else{
        const z = await x.addProducts(y)
        return z
    }
}




const assignorderwithpay = async (data)=>{
    const x = await Orders.findOne({where : { id : data.orderid}})
    const y = await Payment.findOne({where : { id : data.paymentid}})
    if(!x || !y){return null}
    else{
        const z = await x.addPayment(y)
        return z
    }
}






module.exports = {
    ordercreate,updateorder,delorder,getorder,assignproducts,assignorderwithpay
}