var jwt = require("jsonwebtoken");
const JWT_SECRET = "farahism!ne";


const fetchUser = (req,res,next) => {
    const authToken = req.header("auth-token")

    if(!authToken) {
        return res.status(401).json({erro:"Please enter the correct Authorization Token"})
    }

    try {
        const data = jwt.verify(authToken,JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(401).json({erro:"Please enter the correct Authorization Token"})
    }

    
}


module.exports = fetchUser