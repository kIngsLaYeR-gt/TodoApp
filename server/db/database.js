import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log("mongoDB connected");
    } catch(error) {
        console.log(error)
    }
}
export  default connectDB;