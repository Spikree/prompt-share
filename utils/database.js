import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("MongoDb is already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt_share",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log("MongoDb connected")
    } catch (error) {
        console.log(error)
    }
}