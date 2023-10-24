import mongoose from "mongoose";

const connectDB = async (req) => {
  const dbName = "e_commerce_with_nextjs";
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      dbName: dbName,
    })
    .then((res) => {
      console.log(`Database connected ${dbName} 👍`);
    })
    .catch((err) => {
      console.log(`Database not connect 🪲>>>>>> ${err}`);
    });
};

export default connectDB;
