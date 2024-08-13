import jwt from "jsonwebtoken"

const createJwtToken = (userId, res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt", token,{
        maxAge: 15*24*60*60*1000, //millisec
        httpOnly: true, //only accesible by http req (prevent XSS ATTACK)
        sameSite: "strict", //prevent CSRF attack
        secure: process.env.NODE_ENV !== "development"
    })
}

export default createJwtToken