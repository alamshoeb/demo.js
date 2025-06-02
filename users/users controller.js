const bcrypt = require("bcrypt")
const { Users } = require("./users model")
const jwt = require("jsonwebtoken")
const { Roles } = require("../roles/roles model")
const { Permision } = require("../passport/permision/permision model")
const { Orders } = require("../order/order model")
const { Payment } = require("../payment/payment model")
const { Products } = require("../product/product model")


const createuser = async (data)=>{
    const encpt =await  bcrypt.hash(data.password,10)
    data.password = encpt
    const x = await Users.create(data,{include : { model : Roles}})
    return x
}




const updateuser = async (userid,data)=>{
    const x = await Users.findOne({where : { id : userid, isActive : true }})
    if(!x){return null}
    else { 
        const y = await Users.update(data,{where : { id : userid, isActive : true}})
        return y
    }
}


const deluser = async (userid)=>{
    const z = await Users.destroy({where : { id : userid , isActive : true}})
    return z
}



const getuser = async(userid)=>{
    const x = await Users.findOne({where : { id : userid , isActive : true},include : { model : Orders, include : { model : Products , include : { model : Payment}}}})
    return x
}



const getuserall = async()=>{
    const data = await Users.findAll()
    return data
}




const userlogin = async(data)=>{
    const checkdata = await Users.findOne({where : {  email : data.email , isActive : true},include : { model : Roles, include : { model : Permision}}})
    const passcheck = await bcrypt.compare(data.password,checkdata.password)

    // const findrole = await checkdata.dataValues.Roles.map((ele)=>ele.dataValues.rolesName)

    const  permisionarr = [];

//note : agr permision ki table ka nam me end me s nhi hai t bhi jb hm permision ko iterate krenge to s lgana pdhega vrna 
//permision ayegi nhi nikal kr  for example : permision = permisions


    const rolearr = checkdata.dataValues.Roles.map((ele)=>{
        if(ele.Permisions){ele.dataValues.Permisions.forEach(element => { permisionarr.push(element.dataValues.permisionName)
           
            
        })}
        return ele.rolesName
    })





    if(!checkdata || !passcheck){ return null}
    else {
        var token = jwt.sign({
           id : checkdata.id,
           email : checkdata.email,
           isactive : checkdata.isActive,
           roles : rolearr,
           permisions : permisionarr
        },process.env.JWT_SECRET,{expiresIn : "2h"})
        return {
            excesstoken : token
        }
    }
}



const assignroles = async (data)=>{
    const x = await  Users.findOne({where : { id : data.userid}})
    const y = await  Roles.findOne({where : { id : data.roleid}})
    if(!x || !y){return null}
    else{
         const z = x.addRoles(y)
         return z
    }
}


const assignorder = async(data)=>{
    const x = await Users.findOne({where : { id : data.userid}})
    const y = await Orders.findOne({where : { id : data.orderid}})
    if(!x || !y){return null}
    else {
        const z = x.addOrders(y)
        return z
    }
}



module.exports = {
    createuser,userlogin,updateuser,deluser,getuser,assignroles,getuserall,assignorder
}