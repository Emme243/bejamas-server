const { MongoClient, ServerApiVersion } = require("mongodb");

/* const connectToDb = async () => {
     const uri =
    "mongodb+srv://Emmanuel:2iNK!GcTz9.tgT2@cluster0.nhpig.mongodb.net/?retryWrites=true&w=majority";
  try {
    await connect(uri);
    console.log("MongoDb conected");
  } catch (error) {
    console.log("Error al conectar a base de datos");
    console.log(error);
  }
}; */

const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect(err => {
    const artworkCollection = client.db("artworksDb").collection("artwork");
    console.log("chido");
    // perform actions on the collection object
    client.close();
  });
};

module.exports = { connectToDb };
