const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//sign_up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //check username length is more than 3 characters
    if (username.length < 4) {
      return res.status(400).json({
        message: "Username should be more than 3 characters",
      });
    }
    //check username already exists ?
    // const existingUsername = await User.find({ username: username });
    // if(existingUsername) {
    //     return res.status(400).json({
    //       message: "Username already exists",
    //     });
    // }

    //check username already exists ?
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    //check password length
    if (password.length <= 5) {
      return res.status(400).json({
        message: "Password should be more than 5 characters",
      });
    }
    //check address length is more than 3 characters
    if (address.length < 4) {
      return res.status(400).json({
        message: "Address should be more than 3 characters",
      });
    }
    // if all above condition true than this below code will be run.
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//Sign_in
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (!existingEmail) {
      return res.status(401).json({
        message: "User doesn't exist! Please register first.",
      });
    }
    await bcrypt.compare(password, existingEmail.password, (err, data) => {
      if (data) {
        const authClaims = [
          { email: existingEmail.email },
          { role: existingEmail.role },
        ];
        const token = jwt.sign({ authClaims }, "OnlineBookStore", {
          expiresIn: "10d",
        });
        res.status(200).json({
          message: "SignIn successfully",
          token: token,
          id: existingEmail._id,
          role: existingEmail.role,
        });
      } else {
        res.status(401).json({
          message: "Incorrect password!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update address
// router.put("/update-address", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.headers;
//     const { address } = req.body;
//     await User.findByIdAndUpdate(id, { address: address });
//     return res.status(200).json({ message: "Address Updated Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    // Fetch the current user to compare the address
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new address is the same as the current address
    if (user.address === address) {
      return res
        .status(200)
        .json({ message: "No changes made. Address remains the same." });
    }

    // Update the address
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
