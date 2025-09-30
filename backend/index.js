
const express = require("express");
require('dotenv').config()


const { sequelize } = require("./database/config");

const { Cart } = require("./Model/cart.model");
const { Products } = require("./Model/product model");
const { Users } = require("./Model/users model");
const { Orders } = require("./Model/order model");
const { Payment } = require("./Model/payment model");
const { Roles } = require("./Model/roles model");
const { Permision } = require("./Model/permision model");
const path = require("path")
const cors = require("cors")



const { userrouter } = require("./Routes/user routes");
const { productrouter } = require("./Routes/product router");
const { orderrouter } = require("./Routes/order router");
const { payrouter } = require("./Routes/payment router");
const { rolerouter } = require("./Routes/roles router");
const { perrouter } = require("./Routes/permision router");
const { cartrouter } = require("./Routes/cart routes");





const app = express();

app.use(express.json());

 app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
app.use("/cart",cartrouter)

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
    await Cart.sync({alter : true})
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