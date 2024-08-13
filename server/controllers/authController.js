import bcrypt from "bcryptjs"
import User from "../models/user.js"
import createJwtToken from "../utils/createJwtToken.js"

export const signup = async(req,res)=>{
    try{
        const {fullname, username, password, confirmPassword, gender} = req.body
        if(password!==confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }   

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error: "user already existed"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        const boyDP = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlDP = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname, 
            username, 
            password: hashedPass, 
            gender,
            profilePic: gender === "male" ? boyDP : girlDP
        })
        
        if(newUser){
            createJwtToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
    }else{
        res.status(400).json({error: "Invalid User Data"})
    }

    }catch(err){
        console.log("error in signup controller")
        res.status(500).json({error: "Internal server error"})
    }
}
export const login = async(req,res)=>{
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPassCorrect = await bcrypt.compare(password, user?.password || "")
        if(!user || !isPassCorrect){
            return res.status(400).json({ error: "Invalid Username or password"})
        }

        createJwtToken(user._id,res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })
    }catch(err){
        console.log("error in login controller")
        res.status(500).json({error: "Internal server error"})
    }
}
export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(err){
        console.log("error in logout controller")
        res.status(500).json({error: "Internal server error"})
    }
}