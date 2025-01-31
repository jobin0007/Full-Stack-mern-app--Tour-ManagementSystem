import axios from "axios";
import { BASE_URL } from "../utilities/urls";

import {  getAdminToken } from "../utilities/handleToken";
axios.defaults.withCredentials = true

export const adminLoginAPI = async(data)=>{
    const response = await axios.post(`${BASE_URL}/admin/login`,data)
    return response?.data
}



export const getAllRoleRequestsAPI = async()=>{
    const token= getAdminToken()
    console.log(token);
    const response = await axios.get(`${BASE_URL}/admin/get_all_role_changing_requests`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })



    return response?.data
    
}

export const acceptRoleRequestAPI = async (requestId ) => {
  const token = getAdminToken();


  const response = await axios.put(
    `${BASE_URL}/admin/accept_role_change/${requestId }`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const cancelRoleRequestAPI = async(requestId)=>{
  const token = getAdminToken();
  const response = await axios.put(`${BASE_URL}/admin/cancel_role_change/${requestId}`,{},{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return response?.data
}




// export const acceptRoleRequestAPI = async (requestId ) => {
//     const token = getAdminToken();
//     const response = await axios.put(`${BASE_URL}/admin/accept_role_change/${requestId }`,
//      {
      
//      }
//     );
//   console.log("admin-resonse",response);
//     return response.data;
//   };
  
//  export const acceptRoleRequestAPI = async (requestId)=>{
//      const token = getToken()
//      const response = await axios.put(`${BASE_URL}/accept_role_change/${requestId}`,{
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//      }
   
     
     
//      )
//      return response?.data
//  }
// export cost cancelRoleRequestAPI =async(data)

 