import axios from "axios";
import { getTourOperatorData, getTourOperatorToken, getUserData, getUserToken } from "../utilities/handleToken";
import { BASE_URL } from "../utilities/urls";

export const createCustomTourAPI = async(data)=>{
     const token = getUserToken();
     const response = await axios.post(`${BASE_URL}/cusomized-tour/create-customize-tour`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     });
     return response?.data
}
export const getAllCustomToursAPI = async()=>{
    const token = getTourOperatorToken();
    const response = await axios.get(`${BASE_URL}/cusomized-tour/all-customized-tour-requests`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     });
     return response?.data
}
export const acceptCustomTourAPI = async (foundTourId, totalPrice) => {
    const token = getTourOperatorToken();
  
    const response = await axios.post(
      `${BASE_URL}/tour-operator/accept-custom-tour/${foundTourId}`, 
      { total_price: totalPrice },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response?.data; // Return the response from API
  };
export const rejectCustomTourAPI = async (foundTourId) => {
    const token = getTourOperatorToken();
    const response = await axios.put(`${BASE_URL}/tour-operator/reject-custom-tour/${foundTourId}`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response?.data; 
};
export const statusCustomTourAPI = async (userId) => {
    const token = getUserToken();
    const response = await axios.get(`${BASE_URL}/cusomized-tour/status/${userId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    console.log(response);
    return response?.data; 
};
// export const viewUserBookingsAPI= async(userId)=>{
//     const token = getUserToken()
//     const response = await axios.get(`${BASE_URL}/bookings/get-user-bookings/${userId}`,{
      
//       headers: {
//             Authorization: `Bearer ${token}`, // Include Authorization header
//           },
//     });
//     console.log(response);
//     return response?.data
//     }