const { Users } = require("../users/users model")
const { Roles } = require("./roles model")
const bcrypt = require("bcrypt")


const createrole = async (data)=>{
    const x = await Roles.create(data)
    return x
}



const createrolewithuser = async (data)=>{
    const encpt = await bcrypt.hash(data.Users.password,10)
    data.Users.password = encpt
    const x = await Roles.create(data,{include : { model : Users}})
    return x
}




const updaterole = async(rolid,data)=>{
    const x = await Roles.findOne({where : { id : rolid}})
    if(!x) { return null} 
    else {z = await Roles.update(data,{where : { id : rolid}}) } 
    return z
}


const delrole = async (rolid)=>{
    const x = Roles.destroy({where : { id : rolid}})
    return x
}



const getrole = async (rolid)=>{
    const x = await Roles.findOne({where : { id : rolid}})
    return x
}



module.exports = {
    createrole,updaterole,delrole,getrole,createrolewithuser
}