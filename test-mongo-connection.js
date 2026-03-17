const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;

if (!uri) {
  console.error("Missing DATABASE_URL in environment. Aborting.");
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    const adminDb = client.db("admin");
    await adminDb.command({ ping: 1 });
    console.log("Ping successful");

    const db = client.db("rubanconnect");
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map((c) => c.name));
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exitCode = 1;
  } finally {
    await client.close().catch(() => {});
    console.log("Connection closed");
  }
}

testConnection();
