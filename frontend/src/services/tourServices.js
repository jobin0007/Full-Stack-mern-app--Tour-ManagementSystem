import axios from "axios"
import { BASE_URL } from "../utilities/urls"
import { getTourOperatorData, getTourOperatorToken } from "../utilities/handleToken"



export const toursAPI=async(data)=>{
  
   
    const response = await axios.get(`${BASE_URL}/tour/get_all_tour`,data)
  
    return response?.data
}  

export const tourDetailAPI=async(tourId)=>{
  
   
  const response = await axios.get(`${BASE_URL}/tour/detail/${tourId}`)

  return response?.data
}  

export const createTourAPI = async(data)=>{
  const token = getTourOperatorToken();
  const response = await axios.post(`${BASE_URL}/tour/create_tour`,data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
  });
  return response.data
}

// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api"; // Update based on your backend URL
export const searchToursAPI = async (filters = {}) => {
  try {
    // Send the filters as query parameters in the request
    const response = await axios.get(`${BASE_URL}/tour/search`, { params: filters });

    // Return the filtered tours from the response
    return response.data; 
  } catch (error) {
    console.error("Error searching tours:", error);
    throw error;
  }
};




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