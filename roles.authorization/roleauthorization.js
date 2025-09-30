
const roleauthorization = (requiredroles)=>{
    return async (req,res,next)=>{
        const userrole = req.user.roles

        const check = await requiredroles.some((ele)=>userrole.includes(ele))
        if(!check){
           return res.status(400).json({message : "forbidden request"})
        }
        else {
            return next()
        }
    }
}


module.exports = {
    roleauthorization
}