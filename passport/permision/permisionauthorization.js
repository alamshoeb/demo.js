

const permisionauthorization = (requiredpermision)=>{
    return async(req,res,next)=>{
        const userpermision = req.user.permisions
        const check = await requiredpermision.some((ele)=>userpermision.includes(ele))
        if(!check){
             res.status(400).json({message : " forbidden resource"})
             
            //if ke or else ke kisi m bhi return nhi lgega
        }
        else {
            next()
        }
    }
}

module.exports = {
    permisionauthorization
}