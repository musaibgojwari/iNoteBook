const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/fetchUser")
const { body, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");

const JWT_SECRET = "@@musaib@@";


// The email should be unique as it set to no duplicates
// look the url will become /api/auth/createuser
router.post("/createuser", 
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must be at least 5 chars in length").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    async (req, res) => {
        let success = false;
        
        // Validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
            }

            // Hash password and create user
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            success = true;

            // Create JWT auth token
            const data = { user: { id: user.id } };
            const authToken = jwt.sign(data, JWT_SECRET);

            // Return the auth token as the response
            return res.json({ success, authToken });

        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Some error occurred");
        }
    }
);

// ROUTE 2:
router.post(
  "/login",
  body("email", "Enter a valid email address").isEmail(),
  body("password", "Password cant be blank").exists(),
  async (req, res) => {
    console.log("got here from the click in login ui")
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("body=>",req.body);
    const { email, password } = req.body;
    try {
      let user = await User.findOne({email});
      console.log("user=>",user)
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter the correct email credentials" });
      }
      // comparting the password
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter the correct credentials" });
      }

      // it we come here now, that means both the credentials are right now we need the authorization token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

      // __________________________________________________
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error occured");
    }
  }
);


// ROUTE 3: /getuser

router.post(
  "/getuser", fetchUser,
  async (req, res) => {
    try {
      userid = req.user.id
      const user = await User.findById(userid).select("-password")
      res.send(user)
      console.log(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error occured");
    }
  })

module.exports = router;
