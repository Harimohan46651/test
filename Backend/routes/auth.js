const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser= require('../middleware/fetchuser')

const jwtstring="hari@mohan$jha."
// ROUTE1: Create a User using: POST "/api/auth/createuser". No login required
 let success = false
router.post('/createuser',[body('name').isLength({ min: 5 }),
body('password').isLength({ min: 5 }),
body('email').isEmail()
],async (req,res)=>
{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false
      return res.status(400).json({ success,errors: errors.array() }); // this error will be send if we give wrong vlaue for any field
    }
    let user = await    User.findOne({email:req.body.email})
    if(user)
    {
        success=false
        return res.status(400).json({success,error: 'please give unique email'}) // if user with same email is present then throw error
    }
    try{
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(req.body.password, salt);
        user =  await User.create({ // use await to get user
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email
        })
        const jwttoken = jwt.sign({ user: {id:user.id} },jwtstring)
        success=true
        res.json({success,authToken:jwttoken})
    }
    catch(error){
        console.log(error)
        res.status(500).send('error occured')
    }  
})

// Route2: authenticate/login a User using: POST "/api/auth/login". No login required

router.post("/login",[body('email').isEmail()] ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // this error will be send if we give wrong vlaue for any field
    }
    try {
        const {email, password}= req.body
        const user= await User.findOne({email})
        if(!user)
        {
            success=false
            return res.status(400).json({success,error:"please enter correct email and password"})
        }
        const passwordcheck= await bcrypt.compare(password, user.password)
        if(!passwordcheck)
        {
            success=false
            return res.status(400).json({success,error:"please enter correct email and password"})
        }
        const jwttoken = jwt.sign({ user: {id:user.id} },jwtstring)
        success=true
        res.json({success,authToken:jwttoken})
        
    } catch (error) {
        console.log(error)
        res.status(500).send(`internal server error ${error}`)
    }
})

// ROUTE-3: get user details using post:api/auth/getuser login required
router.post("/getuser", fetchUser, async(req,res)=>{        // fetchuser is middle function that will verify authtoken and return values
    try {
        const userId= req.user.id
        const userDetails = await User.findById(userId).select("-password")     //get all details except password
        // res.json({userDetails})
        res.send(userDetails)
    } catch (error) {
        console.log(error)
        res.send('internal server error', error)
    }
    
})


module.exports = router