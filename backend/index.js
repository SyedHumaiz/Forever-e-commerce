import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import db from "./util/db.js";
import 'dotenv/config'
import connectcloudinary from "./util/cloudinary.js";
import {userRouter} from './routes/userRouter.js'
import { productRouter } from "./routes/productRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { orderRouter } from "./routes/orderRouter.js";


const app = express();
const port = 4000;

app.use(cors(
    {
        origin : ["http://localhost:5173" ,"http://localhost:5174"],
        methods :["POST", "GET", "PUT", "DELETE"],
        credentials : true
    }
))


db.connect((err) => {
    if(err){
        console.log("connection error")
    } else{
        console.log('server connected')
    }
})



app.use(express.json())

app.get("/" , (req , res ) => {
    res.send("API WORKING")
})

connectcloudinary();

app.use('/api/user' , userRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/order' , orderRouter)

app.listen(port , ()=> console.log('server started on port ' ,port))

