const passport = require("passport");

const {Strategy,ExtractJwt} = require("passport-jwt");
const { Users } = require("../Model/users model");




passport.use(new Strategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : process.env.JWT_SECRET},
async(jwtDataPayload,done)=>{
    const user = await Users.findOne({where : { id : jwtDataPayload.id,}})
    if(!user){return done(null,false)}
    else { return done(null,jwtDataPayload)}
}
))




module.exports={
passport
}