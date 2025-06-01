
const express = require("express");
require('dotenv').config()


const { sequelize } = require("./database/config");

const { Products } = require("./product/product model");
const { Users } = require("./users/users model");
const { userrouter } = require("./users/user routes");
const { productrouter } = require("./product/product router");
const { orderrouter } = require("./order/order router");
const { Orders } = require("./order/order model");
const { Payment } = require("./payment/payment model");
const { payrouter } = require("./payment/payment router");
const { rolerouter } = require("./roles/roles router");
const { Roles } = require("./roles/roles model");
const { Permision } = require("./passport/permision/permision model");
const { perrouter } = require("./passport/permision/permision router");

const app = express();

app.use(express.json());


app.use("/Users",userrouter)

app.use("/Products",productrouter)

app.use("/Order",orderrouter)

app.use("/Payment",payrouter)

app.use("/Roles",rolerouter)

app.use("/Permision",perrouter)


app.listen(3020, async()=>{
    try {
    await sequelize.authenticate()
    await sequelize.sync()
    await Users.sync({alter : true})
    await Products.sync({alter : true})
    await Orders.sync({alter : true})
    await Payment.sync({alter : true})
    await Roles.sync({alter : true})
    await Permision.sync({alter : true})
    console.log("server is running port : 3020");

    } catch (error) {
     console.log("error found : ",error);
        
        
    }
   
   
    
})