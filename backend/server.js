import express from "express"
import dotenv from "dotenv";
const app= express();

dotenv.config();
const PORT = process.env.PORT ||3000
app.get("/",(req,res)=>{
    res.send("Hello Roshan Jaiswal");
})

app.listen(PORT,()=>console.log(`Sever is running on port ${PORT}`));

