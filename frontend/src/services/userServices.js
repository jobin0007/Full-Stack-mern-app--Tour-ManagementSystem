import axios from 'axios';
import { BASE_URL } from '../utilities/urls';
import { getUserData } from '../utilities/handleToken';





export const registerAPI= async(data)=>{
  console.log(data)
  const response = await axios.post(`${BASE_URL}/user/register`,data)
  return response?.data 
}


export const loginAPI=async(data)=>{
  console.log(data);
  const response = await axios.post(`${BASE_URL}/user/login`,data)

  return response?.data
}  
// const token= getAdminToken()
// console.log(token);
// const response = await axios.get(`${BASE_URL}/admin/get_all_role_changing_requests`,{
//     headers:{
//         Authorization:`Bearer ${token}`
//     }
// }





export const getOneUserAPI = async(userId)=>{
  const token = getUserData()
  const response = await axios.get(`${BASE_URL}/user/getoneuser/${userId}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return response?.data
}

export const operatorRequest = async()=>{
  const token = getUserData()
  const response = await axios.patch(`${BASE_URL}/user/request-tour-operator`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
  } )
  return response?.data
}




