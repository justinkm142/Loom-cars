import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from 'dotenv'
import * as path from 'path'



dotenv.config()






import userRouter from './Routes/userRouter.js'
import adminRouter from "./Routes/adminRouter.js";
import authRouter from "./Routes/authRoutes.js"

import connectDB from "./Config/db.js";

const app = express();

const  _dirname = path.dirname("")
const buildPath = path.join(_dirname , "../client/dist")


app.use(express.static(buildPath))


const port = process.env.PORT;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true 
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));





app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/verify", authRouter);

// connect to db
connectDB();

app.listen(port, () => {
  console.log("listening for requests on port", port);
});
