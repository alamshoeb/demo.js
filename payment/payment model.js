const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const { Orders } = require("../order/order model");

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



Orders.hasOne(Payment)
Payment.belongsTo(Orders)


module.exports = {
    Payment
}