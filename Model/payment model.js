const { DataTypes } = require("sequelize");


const { sequelize } = require("../database/config");
const { Products } = require("./product model");
const { Orders } = require("./order model");


const Payment = sequelize.define("Payment",{
    id : { type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    paymentMethod : { type : DataTypes.STRING,
        allowNull : true
    },
    paymentStatus : { type : DataTypes.STRING,
        allowNull : true
    },
    totalAmount : { type : DataTypes.INTEGER,
        allowNull : true
    }
},{tableName : "Payment",timestamps : true})



Orders.hasMany(Payment)
Payment.belongsTo(Orders)


module.exports = {
    Payment
}