
const jwt = require('jsonwebtoken')
const authentication = (req,res,next)=>{


//   const cookies = req.cookies.token
  const cookies = req.headers['authorization']?.split(' ')[1];
    //    const cookies = cookie.token
    // console,log('cookies',cookies) 
    // console.log(req.headers);
if(!cookies){
    throw new Error("User Not Found")
}
const jwtdecode =jwt.decode(cookies)

switch (jwtdecode.role) {
  case 'user':
      req.user = jwtdecode.userId;
      
      break;
  case 'admin':
      req.admin = jwtdecode.adminId;
      break;
  case 'tour-operator':
      req.tourOperator = jwtdecode.tourOperatorId;
   
      break;
  default:
      return res.status(403).json({ message: "Authentication failed: Invalid role" });
}

console.log("hi");
next()



}
module.exports = authentication