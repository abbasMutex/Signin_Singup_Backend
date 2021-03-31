const router = require('express').Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validinfo = require("../middleware/validinfo");
const authorize = require("../middleware/authorize");
//registering
router.post("/register", validinfo, async(req, res) =>{
    try {
        // 1. destructure the req.body (name, email, password)
            const {name, email, password} = req.body;
        // 2. check user exist then throw error
            const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
            if(user.rows.length !==0){
                return res.status(401).json("User Already exist!");
            }   
        // 3. Bcrypt the user password
            const saltRound=10;
            const salt =await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);
        // 4. inseert new user in the database
        const newUser = await pool.query(
            "INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]
        );
        // 5. gnerating our jwt token
            const token = jwtGenerator(newUser.rows[0].user_id);
            res.json({token});

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login
router.post("/login", validinfo, async (req, res) => {
    try {
        // 1. destructuring the req.body
            const { email, password } = req.body;

        // 2. check if user does'nt exist 
            const user = await pool.query("SELECT * FROM users WHERE user_email = $1", 
            [email]);

            if(user.rows.length === 0){
                return res.status(401).json("Email and Password is not correct");
            }

        // 3. checking the paassword is same or not
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if(!validPassword){
         return res.status(401).json("Email or Password is incorrect");
        }



        // 4. give them jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json({token});

    } catch (err) {
        console.error(err.message);
         return res.status(500).send("Server Error");
    }
});

// verifying
router.get("/verify", authorize, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;