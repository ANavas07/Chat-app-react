import mongoose from "mongoose";    

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI || "",)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(process.env.MONGO_DB_URI);
        console.log(`Error trying to connecto to MongoDB: ${error}`);
    }
};

export default connectToMongoDb;