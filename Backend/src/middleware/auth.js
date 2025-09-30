import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log("no token found");
        return res.json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded.id){
            console.log("token not valid");
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.body.userId = decoded.id;
        next();
    } catch (err) {
        console.log("token not valid");
        res.status(401).json({ message: 'Token is not valid' });
    }
}

export default auth;