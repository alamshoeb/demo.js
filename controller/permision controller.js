
const { Permision } = require("../Model/permision model")
const { Roles } = require("../Model/roles model")

const createper = async(data)=>{
    const x = await Permision.create(data)
    return x.dataValues
}




const updateper = async (perid,data)=>{
    const x = await Permision.findOne({where : { id : perid}})
    if(!x){ return null}
    else {
        const z = await Permision.update(data,{where : { id : perid}})
        return z
    }
}




const assignpermision = async(data)=>{
    const x = await Permision.findOne({where : { id : data.permisionid}})
    const y = await Roles.findOne({where : { id : data.rolesid}})
    if(!x || !y){return null}
    else {
    const z = x.addRoles(y)
    return z

    }
}




const getpermision = async ()=>{
    const x = await Permision.findOne({where : { id : 1}})
    return x
}



module.exports = {
    createper,assignpermision,updateper,getpermision
}