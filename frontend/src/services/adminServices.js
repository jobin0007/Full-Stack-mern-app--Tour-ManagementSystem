import axios from "axios";
import { BASE_URL } from "../utilities/urls";

import {  getAdminToken } from "../utilities/handleToken";
axios.defaults.withCredentials = true

export const adminLoginAPI = async(data)=>{
    const response = await axios.post(`${BASE_URL}/admin/login`,data)
    return response?.data
}
export const getOneAdminAPI = async(adminId)=>{
  const token = getAdminToken()
  const response = await axios.get(`${BASE_URL}/admin/getoneadmin/${adminId}`,{
    
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  console.log(response?.data);
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
 
export const getAllUsersAPI = async()=>{
  const token= getAdminToken()
  console.log(token);
  const response = await axios.get(`${BASE_URL}/admin/get-users`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  return response?.data
  
}
export const getAllTourOPeartorsAPI = async()=>{
  const token= getAdminToken()
  console.log(token);
  const response = await axios.get(`${BASE_URL}/admin/get-tour-operators`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  return response?.data
  
}
export const deleteUserAPI = async(userId)=>{
  const token= getAdminToken()
  console.log(token);
  const response = await axios.delete(`${BASE_URL}/admin/delete-user/${userId}`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  return response?.data
  
}
export const deleteTourAPI = async(tourId)=>{
  const token= getAdminToken()
  console.log(token);
  const response = await axios.delete(`${BASE_URL}/admin/delete-tour/${tourId}`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  return response?.data
  
}
export const deleteTourOpeartorAPI = async(operatorId)=>{
  const token= getAdminToken()
  console.log(token);
  const response = await axios.delete(`${BASE_URL}/admin/delete-tour-operator/${operatorId}`,{
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  return response?.data
  
}






