const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to Mongo Database");
  } catch (error) {
    console.log(error);
  }
};

connection();