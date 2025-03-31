const {initializeDatabase} = require("./db/db.connect")
const Hotel= require("./models/hotel.models")
const express=require("express")
require("dotenv").config()
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};


const app=express()
app.use(express.json())
app.use(cors(corsOptions));
initializeDatabase()
const port=process.env.PORT||3000


  async function savedData(newHotel){
    try {
        const rest=new Hotel(newHotel)
        const saveRest= await rest.save()
        return(saveRest)
    } catch (error) {
        throw(error)
    }
  }
//   savedData(newHotel)
app.post("/hotels",async(req,res)=>{
    try {
        const data=await savedData(req.body)
        if(data){
            res.status(200).json({message:"data Saved Sucessfully",data})
        }else{
            res.status(404).json({message:"Data not saved"})
        }
    } catch (error) {
        res.status(500).json({error:"Error in saving data",error})
    }
})


async function readAllHotel(){
    try {
        const nameRestaurant= await Hotel.find()
        return(nameRestaurant)
        
    } catch (error) {
        throw(error)
    }
}
// readAllHotel()
app.get("/hotels",async(req,res)=>{
    try {
        const data= await readAllHotel()
        if(data.length!=0){
            res.status(200).json(data)
        }else{
            res.status(404).json({message:"Hotels not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Error in getting Hotels",error})
    }
})
async function readAllbyName(hotelName){
   try{
    const nameHotel=await Hotel.findOne({name:hotelName})
    console.log(nameHotel)
    return(nameHotel)
   }catch(error){
    throw(error)
   }
}
// readAllbyName("Lake View")
app.get("/hotels/:hotelName",async(req,res)=>{
    try {
        const data= await readAllbyName(req.params.hotelName)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({message:"Hotel no Found"})
        }
        
    } catch (error) {
        res.status(500).json({message:"Error in finding hotel by name."})
    }
})

async function readAllByOffer(){
    try{
const selectHotel=  await Hotel.find({ isParkingAvailable: true })
console.log(selectHotel)
    }catch(error){
        throw(error)
    }
}
// readAllByOffer()

async function readAllByOfferRestaurant(){
    try{
const selectHotel=  await Hotel.find({ isRestaurantAvailable: true })
console.log(selectHotel)
    }catch(error){
        throw(error)
    }
}
//  readAllByOfferRestaurant()

async function readAllByCategory(){
    try{
        const hotel=await Hotel.findOne({category:"Mid-Range"})
        return(hotel)

    }catch(error){
        throw(error)
    }
}
// readAllByCategory()
app.get("/hotels/category/:hotelCategory",async(req,res)=>{
    try {
        const data=await readAllByCategory(req.params.hotelCategory)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json({message:"Hotel not found"})
        }

        
    } catch (error) {
        res.status(500).json({message:"Error in getting Hotel by Category"})
    }
})

async function readAllByPrice(price){
    try{
const Price= await Hotel.find({priceRange:"$$$$ (61+)"})
console.log(Price)
    }catch(error){
throw(error)
    }
}
// readAllByPrice()

async function readAllByRating(rating){
    try{
        const hotelRating=await Hotel.find({rating:rating})
       return(hotelRating)

    }catch(error){
        throw(error)
    }
}
// readAllByRating(4)
app.get("/hotels/rating/:hotelRating",async(req,res)=>{
    try {
        const data=await readAllByRating(req.params.hotelRating)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({message:"Hotel not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Error in finding Hotel by Rating"})
    }
})

async function readAllByPhoneNumber(number){
try{
const selectHotel=await Hotel.findOne({phoneNumber:number})
return(selectHotel)
}catch(error){
throw(error)
}
}
app.get("/hotels/directory/:number",async(req,res)=>{
    try {
        const data=await readAllByPhoneNumber(req.params.number)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({message:"Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({message:"Error in getting hotel by Phone Number"})
    }
})

const deleteHotel=async(hotelId)=>{
    try {
        const data=await Hotel.findByIdAndDelete(hotelId)
        return data

    } catch (error) {
        console.log("Failed to Delete Hotel")
    }
}
app.delete("/hotel/:hotelId",async(req,res)=>{
    try {
        const deletedData= await deleteHotel(req.params.hotelId)
        if(deletedData){
            res.status(200).json(deletedData)
        }else{
            res.status(404).json({message:"Hotel not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:"Error in Deleting Hotel"})
    }
})
const updateHotel=async(hotelId,updateValue)=>{
    try {
        const updatedData=await Hotel.findByIdAndUpdate({_id:hotelId},updateValue,{new:true})
        if(updatedData){
            console.log("Hotel get updated")
        }else{
            console.log("Hotel don't get updated")
        }
        return updatedData
    } catch (error) {
        console.log("Error in updating Hotel")
    }
}
app.post("/hotel/:hotelId",async(req,res)=>{
    try {
        const data=await updateHotel(req.params.hotelId,req.body)
        if(data){
            res.status(200).json({message:"Hotel get Updated",data:data})
        }else{
            res.status(404).json({message:"Hotel not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Error in updating Data"})
    }

})



app.listen(port,()=>{
    console.log("Server is connected at Port:",port)
})