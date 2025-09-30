const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Roles } = require("./roles model");


const Permision = sequelize.define("Permision",{
    id : {type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    permisionName : {
        type : DataTypes.STRING,
        allowNull : true
    }
},{tableName : "Permision",timestamps : true})


Roles.belongsToMany(Permision,{through : "roles has permision"})
Permision.belongsToMany(Roles,{through : "roles has permision"})


module.exports = {
    Permision
}