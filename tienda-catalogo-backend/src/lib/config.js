require("dotenv").config();
const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);
let db;

const connectToDatabase = async () => {
  if (!db) {
    try {
      const conn = await client.connect();
      db = conn.db("ShopNestSV"); //Colocar el nombre de la BD
      console.log("Conectado a la base de datos MongoDB");
    } catch (e) {
      console.error("Error al conectar a MongoDB:", e);
    }
  }
  return db;
};

module.exports = connectToDatabase;
