import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
// import {testAi} from "./src/services/ai.service.js";

// Test the AI service
// testAi();  


// Connect to database
connectDB();


// Start the server
app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`)
})