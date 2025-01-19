import axios from "axios"
import { BASE_URL } from "../utilities/urls"
import { getTourOperatorData } from "../utilities/handleToken"



export const toursAPI=async(data)=>{
  
   
    const response = await axios.get(`${BASE_URL}/tour/get_all_tour`,data)
  
    return response?.data
}  

export const createTourAPI = async(data)=>{
  const token = getTourOperatorData();
  const response = await axios.post(`${BASE_URL}/tour/create_tour`,data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
  });
  return response.data
}
// export const acceptRoleRequestAPI = async (requestId ) => {
//     const token = getAdminToken();
  
  
//     const response = await axios.put(
//       `${BASE_URL}/admin/accept_role_change/${requestId }`,
//    // Empty body if no additional data is sent
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
  
//     return response.data;
//   };