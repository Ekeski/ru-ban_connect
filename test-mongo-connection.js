const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://ekemewomaogbofavour_db_user:c1Iy8hZ4okpbYcSZ@cluster0.ddi9cfd.mongodb.net/rubanconnect?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("✓ Successfully connected to MongoDB!");

    const adminDb = client.db("admin");
    await adminDb.command({ ping: 1 });
    console.log("✓ Ping successful!");

    const db = client.db("rubanconnect");
    const collections = await db.listCollections().toArray();
    console.log(
      "✓ Collections in database:",
      collections.map((c) => c.name),
    );

    await client.close();
    console.log("✓ Connection closed");
    process.exit(0);
  } catch (error) {
    console.error("✗ Connection error:", error.message);
    process.exit(1);
  }
}

testConnection();
