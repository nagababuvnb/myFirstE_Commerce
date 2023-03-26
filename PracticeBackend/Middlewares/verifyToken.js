const jwt = require('jsonwebtoken');
const secretkey = "gcgfhgv#@5432%$vgvhbj";

const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    console.log('token is',token)

    if(!token){
        res.status(403).send("A token is required for authentication")
    }
    else{
        try{
            const decodedToken = jwt.verify(token,secretkey);
            req.decodedToken = decodedToken;
        } catch{
            res.json({status:"error",data:"Invalidtoken"})
        }

    }
    return next()
};

module.exports = verifyToken;