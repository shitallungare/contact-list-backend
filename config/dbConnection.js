const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected:",
      connect.connection.host, // lowercase 'c'
      connect.connection.name   // lowercase 'c'
    );
  } catch (err) {
    console.log(err);
    process.exit(1); 
  }
};

module.exports = connectDb;
