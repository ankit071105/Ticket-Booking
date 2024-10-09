import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();


let cachedDB = null

export default async function connect_db() {
  if (cachedDB) {
    console.info("Using cached connection!");
    return cachedDB;
  }

  console.info("No connection found! Creating a new one.");

  const uri = process.env.DB_URI
  const dbName = process.env.DB_NAME
  if (!uri || !dbName) {
    console.error("DB_URI and DB_NAME must be set in environment variables");
    throw new Error("Database configuration error");
  }

  try {
    const connection = await mongoose.connect(uri, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info(`Connected to MongoDB: ${uri}`);
    cachedDB = connection.connection;
    return cachedDB;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
