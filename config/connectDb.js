const moongoose = require("mongoose");
const connectDb = async () => {
  
    try {
    await moongoose.connect(process.env.URI);
    console.log("db is connected");
  } 
 
  catch (error) {
    console.log(error);
  }
};
//export
module.exports = connectDb;
