
const jwt = require('jsonwebtoken')
const authentication = (req,res,next)=>{


  const cookies = req.cookies.token

if(!cookies){
    throw new Error("User Not Found")
}
const jwtdecode =jwt.decode(cookies)

if(jwtdecode.role =='user'){
    req.user= jwtdecode.userId
    console.log("user",jwtdecode.userId);
    
  
}
else if(jwtdecode.role == 'admin'){
  req.admin= jwtdecode.adminId
  console.log("admin",jwtdecode.adminId);

}

else if(!jwtdecode.role == 'tour-operator'){
  req.tourOperator= jwtdecode.tourOperatorId
  console.log("tourOperator",jwtdecode.tourOperatorId);
 
}
else{
  throw new Error("Authentication Failed")
  
}

next()



}
module.exports = authentication