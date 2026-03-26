import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
};

startServer();
