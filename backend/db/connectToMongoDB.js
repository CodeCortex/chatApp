import mongoose from "mongoose";

const connectToMongoDB= async()=>{
    try {
        console.log("MongoDB URL:", process.env.MONGO_DB_URL);

        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connect to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message)
    }
}
export default connectToMongoDB;

