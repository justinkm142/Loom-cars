import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from 'dotenv'


import { dirname,join } from 'path';
import { fileURLToPath } from 'url';



dotenv.config()






import userRouter from './Routes/userRouter.js'
import adminRouter from "./Routes/adminRouter.js";
import authRouter from "./Routes/authRoutes.js"

import connectDB from "./Config/db.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// const buildPath = path.join(_dirname , "../client/dist")


const _dir = join(__dirname,"../client/dist")

console.log("www path sis",_dir  )

app.use(express.static(_dir))


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

app.get ("/app2",(req,res)=>{
  res.send('<h1> Justin plese note server is working </h1>')
})



app.get('*', function(req, res) {
 
  res.sendFile(join(_dir, 'index.html'));
});



// connect to db
connectDB();

app.listen(port, () => {
  console.log("listening for requests on port", port);
});
