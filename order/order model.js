const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Products } = require("../product/product model");

const Orders = sequelize.define("Orders",{
    id : { type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    orderProducts : {
        type : DataTypes.STRING,
        allowNull : false
    },
    orderAmount : { type : DataTypes.INTEGER,
        allowNull : true
    },
    orderStatus : { type : DataTypes.STRING,
        allowNull : true
    }
},{tableName : "Orders",timestamps : true})


Products.belongsToMany(Orders,{through :"producthasorder"})
Orders.belongsToMany(Products,{through :"producthasorder"})



module.exports = {
    Orders
}