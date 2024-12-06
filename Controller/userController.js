const jwt = require("jsonwebtoken");
const users = require("../Model/userModel");

// register
exports.register = async (req, res) => {
  console.log("inside register function");
  const { username, email, password } = req.body;
  try {
    // check the user already exist or not
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("user already exist");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(400).json("err");
  }
};
// login
exports.login = async (req, res) => {
  console.log("inside login function");
  const { email, password } = req.body;
  try {
    // check the user already exist or not
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      // generate token
      const token = jwt.sign({userId:existingUser._id},process.env.jwt_secret);
      res.status(200).json({existingUser,token})
    }
    else{
        res.status(406).json('invalid email/password')
    }
  } catch (err) {
    res.status(401).json(err);
  }
};


// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    // Extract the data sent in the request (e.g., github, linkedin, profileImage)
    const { github, linkedin } = req.body;
    const userId = req.payload; // From JWT Middleware (userId)

    // Find the user in the database by their ID (userId)
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update the profile fields
    if (github) user.github = github;
    if (linkedin) user.linkedin = linkedin;

    // Handle file upload for profileImage (if present)
    if (req.file) {
      user.profileImage = req.file.path; // Adjust based on your model schema
    }

    // Save the updated user profile to the database
    await user.save();

    // Send a success response
    res.status(200).json({ message: "Profile updated successfully!", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
