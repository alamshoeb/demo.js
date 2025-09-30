const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Products } = require("./product model");



const Orders = sequelize.define("Orders",{
    id : { type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }
    ,userId : { type : DataTypes.INTEGER,
        allowNull : false
    },
    totalAmount : { type : DataTypes.INTEGER,
        allowNull : false
    }
   ,
     name : { type : DataTypes.STRING,
        allowNull : false
    }
    ,
    address : { type : DataTypes.STRING,
        allowNull : false
    },
    paymentMode : { type : DataTypes.STRING,
        allowNull : false
    },
    phoneNumber : { type : DataTypes.STRING,
        allowNull : false
    }
},{tableName : "Orders",timestamps : true})


// Products.belongsToMany(Orders,{through :"producthasorder"})
// Orders.belongsToMany(Products,{through :"producthasorder"})



module.exports = {
    Orders
}