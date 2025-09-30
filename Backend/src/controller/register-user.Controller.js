import userSchema from '../models/userModel.js'
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

export default async(req,res)=>{
try{
    const {name,email,password} = req.body;

    const isExists =  await userSchema.findOne({email});
    if(isExists){
        return res.json({success: false, message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const userData = {
        name,
        email,
        password: hashPassword
    }

    const user = await userSchema.create(userData);

    const token = generateToken(user._id);

    return res.json({success: true, token})


}catch(error){
    console.log(error);
    return res.json({success: false, message: error})
}
}