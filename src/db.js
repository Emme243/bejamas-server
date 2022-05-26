const { connect } = require("mongoose");

const connectToDb = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("MongoDb conected");
  } catch (error) {
    console.log("Error al conectar a base de datos");
    console.log(error);
  }
};

module.exports = { connectToDb };
