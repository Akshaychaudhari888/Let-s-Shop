import jwt from 'jsonwebtoken';
export default (id)=>{
    const secretKey =process.env.JWT_SECRET_KEY;
    return jwt.sign({id},secretKey,{expiresIn: '24h'})
}