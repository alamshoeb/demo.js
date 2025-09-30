const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Orders } = require("./order model");
const { Products } = require("./product model");

Orders
const Users = sequelize.define("Users",{
    id : { type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    
    },
    UserName : { type : DataTypes.STRING,
        allowNull : false,
    },
    password : { type : DataTypes.STRING,
        allowNull : false
    },
    email : { type : DataTypes.STRING,
        allowNull : false
    },
    isActive : { type : DataTypes.BOOLEAN,
        allowNull : true
    }
    
},{tableName : "Users",timestamps : true})


Users.hasMany(Orders)
Orders.belongsTo(Users)

module.exports = {
    Users
}