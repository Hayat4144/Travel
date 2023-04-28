import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware  from "./Middleware/ErrorMiddleware.js";
import ConnectDb from "./Configuration/ConnectDb.js";
import UserRouter from "./Apps/Auth/User/Routes/UserRoutes.js";

// configuration for the server
const app = express();
config();
app.use(express.json())
app.use(cookieParser());


// All App Routes
app.use(UserRouter)
app.use(ErrorMiddleware)


// first connect to  the database then open the server port
ConnectDb().then(()=>{
    app.listen(5000, () => console.log('connected'))
})

