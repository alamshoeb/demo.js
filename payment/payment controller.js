const { Payment } = require("./payment model")

const createpay = async (data)=>{
    const x = await Payment.create(data)
    return x
}



const updatepay = async(payid,data)=>{
    const find = await Payment.findOne({where : { id : payid}})
    if(!find){ return null}
    else {
        const change = await Payment.update(data,{where : { id : payid}})
        return change
    }
}



const getpay = async(payid)=>{
    const x = await Payment.findOne({where : { id : payid}})
    return x
}



const delpay = async(payid)=>{
    const x = await Payment.destroy({where : { id : payid}})
return x
}





module.exports = {
    createpay,updatepay,getpay,delpay
}