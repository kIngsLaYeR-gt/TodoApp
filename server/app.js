import express from 'express';
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js"
import todorouter from "./routes/todo.js"
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors"

//.env 
dotenv.config();

//database connnect
connectDB();
//server start
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/v1/',userRouter);
app.use('/api/v1/',todorouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is listening at port: ${PORT}`);
});
