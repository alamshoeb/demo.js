const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Users } = require("../users/users model");

const Roles = sequelize.define("Roles",{
    id : { type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    rolesName : { type :
     DataTypes.STRING ,
    allowNull : true}
    
})


Users.belongsToMany(Roles,{through : "userhasroles"})
Roles.belongsToMany(Users, { through : "userhasroles"})




module.exports = {
Roles
}
