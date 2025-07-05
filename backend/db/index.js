import mongoose from 'mongoose'
import { DB_NAME } from '../constant/constant.js'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
   try {
        const baseUri = process.env.MONGODB_URI;
        if (!baseUri) throw new Error("❌ MONGODB_URI is not defined");

        const finalUri = `${baseUri}/${DB_NAME}`;
        console.log("✅ Final URI:", finalUri);

        const connectionInstance = await mongoose.connect(finalUri);
        console.log("✅ Connected to MongoDB at", connectionInstance.connection.host);
    } catch (error) {
        console.log("❌ MongoDB connection error:", error);
        process.exit(1); // exit if DB connection fails
    }
};

export default connectDB
/* const connectDB = async () => {
   try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log("✅ Parsed MONGODB_URI:", process.env.MONGODB_URI);
       console.log("✅ Final URI:", `${process.env.MONGODB_URI}/${DB_NAME}`);

   } catch (error) {
       console.log("MongoDb connection Error", error)
   }
}

export default connectDB
*/