require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/connection");
const user = require("./routes/user");
const Books = require("./routes/Book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(express.json());
app.use(cors());  //cors policies help to transfer the data from database to UI.
//routes
app.use("/api/auth", user);
app.use("/api/book", Books);
app.use("/api/favourite", Favourite);
app.use("/api/cart", Cart);
app.use("/api/order", Order);

//creating Port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
