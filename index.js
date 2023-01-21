const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app=express();
const userRouter=require("./routes/users");
const authRouter=require("./routes/auth");
const postRouter=require("./routes/posts");


dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser:true , useUnifiedTopology:true },
    ()=>{
        console.log("Connected to MongnoDB");
    }
    );

    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);

app.get("/",(req,res)=>{
     res.send("welcome server is running")
});

 app.listen(3000,()=>{
    console.log("Backend sever is running")
 })



