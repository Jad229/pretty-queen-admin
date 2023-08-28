import mongoose from "mongoose";

let isConnected = false; //track connection

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected!");
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "pretty_queen",
    });
    isConnected = true;
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
