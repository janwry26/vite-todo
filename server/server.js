const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT;

//import routes
const todoRoutes = require("./routes/todo");

app.use(express.json());
app.use(cors());

//define routes
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Vite Todo API");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
