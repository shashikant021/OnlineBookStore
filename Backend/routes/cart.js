const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(400).json({
        status: "success",
        message: "Book already in cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({
      status: "success",
      message: "Book added to cart successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({
      status: "success",
      message: "Book removed from cart",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

//get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart"); //populate means show all data/details of the book or if not use populate then it only show the object id.
    const cart = userData.cart.reverse();
    return res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
