const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database Error: ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnection;



const mongoose = require('mongoose');


module.exports = async() => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
        
    } catch (error) {
        console.log("Connection Failed To MongoDB", error)
    }
}