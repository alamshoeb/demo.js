const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");





const Products = sequelize.define("Products", {
    id : {type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    productName : { type : DataTypes.STRING,
        allowNull : false
    },
    productPrice : { type : DataTypes.INTEGER,
        allowNull : false
    },
    description : { type : DataTypes.STRING,
        allowNull : true
    },category : { type : DataTypes.STRING,
        allowNull : true
        
    },url : { type : DataTypes.STRING,
        allowNull : true
        
    }
},{tableName : "Products",timestamps : true})



module.exports = {
    Products
}