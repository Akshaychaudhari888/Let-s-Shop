export default async (req, res) => {
  try {
    let a = req.body.num1;
    let b = req.body.num2;
    console.log(a - b);
  } catch (error) {
    res.send({ message: "error" });
  }
};
