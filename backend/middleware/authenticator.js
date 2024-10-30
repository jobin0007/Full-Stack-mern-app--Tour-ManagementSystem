
const jwt = require('jsonwebtoken')
const authentication = (req,res,next)=>{
  const cookies = req.cookies.token

if(!cookies){
    throw new Error("User Not Found")
}
const jwtdecode =jwt.decode(cookies)

if(!jwtdecode.role =='user'){
    throw new Error("Authentication Failed")
}
req.user= jwtdecode.userId
if(!jwtdecode.role == 'tour-operator'){
  throw new Error("Authentication Failed")
}
req.admin= jwtdecode.adminId

if(!jwtdecode.role == 'tour-operator'){
  throw new Error("Authentication Failed")
}
req.tourOperator= jwtdecode.tourOperatorId

next()

}
module.exports = authentication