import mongoose from "mongoose";

interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache object to store the database connection
const globalForMongoose = global as unknown as {
  mongoose: ConnectionCache;
};

// Initialize the connection cache
const cached = globalForMongoose.mongoose || {
  conn: null,
  promise: null,
};

// Make sure the connection cache is set on the global object
if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

/**
 * Connect to MongoDB using Mongoose
 * Reuses existing connection if available
 */
export const connectDB = async () => {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const options = {
      bufferCommands: false,
    };

    // Create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      });
  }

  // Wait for the connection to be established
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

// Export the mongoose instance for model definitions
export const db = mongoose;
