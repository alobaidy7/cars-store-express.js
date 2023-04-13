const jwt = require("jsonwebtoken")


// verify token
function verifyToken(req,res,next){
    const authToken = req.headers.authorization;

    if(authToken){
        const token = authToken.split(" ")[1];

        try {
            const decodedPaylod = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decodedPaylod;
            next();
        } catch (error) {
            return res.status(401).json({message: "Invalid Token, Access denied"});
        }
    }   
    
    else{
        return res.status(401).json({message: "No Token Provided, Access denied"});
    }
}

// verify token & admin
function verifyTokenAndAdmin (req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json({message:"Not Authorized"})
        }

    })

}



// verify token & Only User Himself
function verifyTokenAndOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next()
        }
        else{
            return res.status(403).json({message:"Not Authorized, Only User Himself"})
        }

    })

}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser
}