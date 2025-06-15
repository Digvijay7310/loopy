import mongoose from 'mongoose'
import { DB_NAME } from '../constant/constant.js'


const connectDB = async () => {
    try {
        console.log("✅ Raw MONGODB_URI:", JSON.stringify(process.env.MONGODB_URI));

        const finalUri = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log("✅ Final URI:", JSON.stringify(finalUri));

        const connectionInstance = await mongoose.connect(finalUri);
        console.log("✅ Connected to MongoDB at", connectionInstance.connection.host);

    } catch (error) {
        console.log("❌ MongoDB connection error:", error);
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