const { Orders } = require("./order model")





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




module.exports = {
    ordercreate,updateorder,delorder,getorder
}