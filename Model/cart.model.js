const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Products } = require("./product model");





const Cart = sequelize.define("Cart", {
    id : {type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    userid : { type : DataTypes.INTEGER,
        allowNull : false
    },
    ProductId : { type : DataTypes.INTEGER,
        allowNull : false
    },
    quantity : { type : DataTypes.INTEGER,
        allowNull : true
    }
},{tableName : "Cart",timestamps : true})



Cart.belongsTo(Products)
Products.hasMany(Cart)

// Cart.belongsTo(Products, { foreignKey: "productid" });  
// Products.hasMany(Cart, { foreignKey: "productid" });


module.exports = {
    Cart
}