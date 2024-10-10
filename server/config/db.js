import mongoose from 'mongoose';

let cachedDB = null

export default async function connect_db() {
  if (cachedDB) {
    console.info("Using cached connection!");
    return cachedDB;
  }

  console.info("No connection found! Creating a new one.");

  const uri = process.env.DB_URI
  const dbName = process.env.DB_NAME
  console.log(uri);
  console.log(dbName);

  if (!uri || !dbName) {
    console.error("DB_URI or DB_NAME is missing!");
    throw new Error("MongoDB URI or Database Name is not defined in environment variables.");
  }


  try {
    const connection = await mongoose.connect(uri, { dbName })
    console.info(`Connected to MongoDB: ${uri}`)
    cachedDB = connection.connection
    return cachedDB
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw error
  }
}
