const express= require('express');
const app=express();
const cors=require('cors');

//Middleware
app.use(express.json()) //whenever access the data through client side it would help
app.use(cors()) //for backend interact with frontend

//Routes
// routes for register and login
app.use("/auth", require("./routes/jwtAuth"))

//dasboard route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000,()=>{
    console.log("SERVER IS RUNNING ON PORT 5000");
})