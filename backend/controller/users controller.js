const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const { Users } = require("../Model/users model")
const { Roles } = require("../Model/roles model")
const { Permision } = require("../Model/permision model")
const { Orders } = require("../Model/order model")
const { Payment } = require("../Model/payment model")
const { Products } = require("../Model/product model")



const createuser = async (data)=>{
    const encpt = await  bcrypt.hash(data.password,10)
    data.password = encpt
    const x = await Users.create(data)
 if(x){


    //create user with auto login token

        var token = jwt.sign({
           id : x.id,
           email : x.email,
           isactive : x.isActive,
        },process.env.JWT_SECRET,{expiresIn : "2h"})
        return {
               id : x.id,
               excesstoken : token
        }

    }return x
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
    const x = await Users.findOne({where : { id : userid , isActive : true},include : { model : Orders, include : [{ model : Products },{ model : Payment}]}})
    return x
}



const getuserall = async()=>{
    const data = await Users.findAll()
    return data
}




const userlogin = async(data)=>{
    const checkdata = await Users.findOne({where : {  email : data.email }
        //,include : { model : Roles, include : { model : Permision}}
    })
    if(!checkdata){return null}
    const passcheck = await bcrypt.compare(data.password,checkdata.password)

    // const findrole = await checkdata.dataValues.Roles.map((ele)=>ele.dataValues.rolesName)

    // const  permisionarr = [];

//note : agr permision ki table ka nam me end me s nhi hai t bhi jb hm permision ko iterate krenge to s lgana pdhega vrna 
//permision ayegi nhi nikal kr  for example : permision = permisions


    // const rolearr = checkdata.dataValues.Roles.map((ele)=>{
    //     if(ele.Permisions){ele.dataValues.Permisions.forEach(element => { permisionarr.push(element.dataValues.permisionName)
           
            
    //     })}
    //     return ele.rolesName
    // })





    if(!checkdata || !passcheck){ return null}
    else {
        var token = jwt.sign({
           id : checkdata.id,
           email : checkdata.email,
           isactive : checkdata.isActive,
        //    roles : rolearr,
        //    permisions : permisionarr
        },process.env.JWT_SECRET,{expiresIn : "2h"})
        return {
               id : checkdata.dataValues.id,
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