const mongoose =require("mongoose")
require("dotenv").config()

const mongoUrl=process.env.MONGODB

const initializeDatabase=async()=>{
    await mongoose.connect(mongoUrl,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    ).then(()=>{
        console.log("Connected to Database")
    }).catch((error)=>{
        console.log("Error in Connecting Database",error)
    })
}


module.exports={initializeDatabase}