const { passport } = require("./passportstratergy")         //note : passport ko require kre jb bhi authenticate k liye
//to path uska wahi dena hai jaha se hmne strategy bnai thi  for example : "./passportstratergy" or jaha se hmne phir export kiya tha





const authenticatejwt = passport.authenticate("jwt",{session : false})



module.exports = {
    authenticatejwt
}