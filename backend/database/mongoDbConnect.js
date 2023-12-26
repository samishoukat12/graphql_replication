const mongoose = require('mongoose');

const connectMondoDb = () => {
  try {
    mongoose.connect(
     process.env.DATABASE_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports={
    connectMondoDb
}
