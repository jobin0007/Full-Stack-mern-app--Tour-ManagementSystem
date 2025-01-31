import axios from 'axios';
import { BASE_URL } from '../utilities/urls';
import { getUserData, getUserToken } from '../utilities/handleToken';





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
  const token = getUserToken()
  const response = await axios.get(`${BASE_URL}/user/getoneuser/${userId}`,{
    
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return response?.data

}

export const getBookingStatusAPI = async()=>{
  const token = getUserToken()
  const response = await axios.get(`${BASE_URL}/user/view-status`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  console.log("response",response);
  return response?.data
}

export const operatorRequestAPI = async () => {
  const token = getUserToken() // Retrieve the user's token
  const response = await axios.patch(
    `${BASE_URL}/user/request-tour-operator`, // Use PATCH here based on your backend route
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include Authorization header
      },
    }
  );
  return response?.data;
};


export const viewUserBookingsAPI= async(userId)=>{
const token = getUserToken()
const response = await axios.get(`${BASE_URL}/bookings/get-user-bookings/${userId}`,{
  
  headers: {
        Authorization: `Bearer ${token}`, // Include Authorization header
      },
});
console.log(response);
return response?.data
}


// export const operatorRequestAPI = async()=>{
//   const token = getUserData()
//   const response = await axios.put(`${BASE_URL}/user/request-tour-operator`,{
//     headers:{
//       Authorization:`Bearer ${token}`
//     }
    
//   });
//   console.log("response",response?.data);
//   return response?.data
// }






