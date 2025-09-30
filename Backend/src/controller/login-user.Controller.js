import bcrypt from 'bcrypt';
import userSchema from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

export default  async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await userSchema.findOne({email});

        if(!user){
            return res.json({success: false, message: "User Doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"})
        }
        
        const token = generateToken(user._id);

        return res.json({success: true, token})

    }catch(error){
        return res.json({success: false, message: error});
    } 
}