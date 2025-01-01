const JWT = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

// middleware to verify JWT token
const verifyToken = (req, res, next) =>{
    const AutHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!AutHeader){
        const error = appError.create('Token is required', 401, httpStatusText.ERROR);  // unauthorized access!
        return next(error);
    }
    const token = AutHeader.split(' ')[1];
    try {
        const verifyUser = JWT.verify(token, process.env.TOKEN_SECRET_KEY);
        //علشان استخدمه role انا بعمل كل ده علشان فى النهاية اقدر امسح ال
        req.verifyUser = verifyUser;  // attach user to request object for further use.  // req.verifyUser = {email: verifyUser.email, id: verifyUser.id, role: verifyUser.role }  // for example.
        // console.log('verifyUser', verifyUser);
        next();
    }catch(err){
        const error = appError.create(err.message, 401, httpStatusText.ERROR);
        return next(error);
    }

}

module.exports = verifyToken;