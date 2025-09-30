const addNum = async(req,res)=>{
  try{
    let a=req.body.num1;
    let b=req.body.num2;
    console.log(a+b);
    res.send({message:"success"});
  }catch(error){
    res.send({message:"error"});
  }
}

export default addNum;