import axios from "axios"
import { getTourOperatorData, getTourOperatorToken, getUserData, getUserToken } from "../utilities/handleToken"
import { BASE_URL } from "../utilities/urls"


  export const createBookingAPI = async (tourId, bookingDetails) => {
    const token = getUserToken();
    const { start_date, end_date } = bookingDetails;
  
    const response = await axios.put(
      `${BASE_URL}/bookings/create_booking/${tourId}`,{ start_date, end_date},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };

  export const getUserBookingsAPI = async()=>{
    const token = getTourOperatorToken();
   
  const response = await axios.get(`${BASE_URL}/bookings/get_all_bookings`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
     return response?.data
  }

export const acceptBookingAPI = async(bookingId)=>{
  const token = getTourOperatorToken();
  const response =await axios.put(`${BASE_URL}/bookings/accept-booking/${bookingId}`,{},{
    
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response ?.data
} 



export const rejectBookingAPI = async(bookingId)=>{
  const token = getTourOperatorToken();
  const response =await axios.put(`${BASE_URL}/bookings/reject-booking/${bookingId}`,{},{
    
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response?.data
} 




export const deleteBookingAPI = async(bookingId)=>{
  const token= getUserToken()
  const response= await axios.delete(`${BASE_URL}/bookings/delete-booking/${bookingId}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response?.data
}


//   export const getAllCustomToursAPI = async()=>{
//     const token = getTourOperatorData();
//     const response = await axios.get(`${BASE_URL}/cusomized-tour/all-customized-tour-requests`,{
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//      });
//      return response?.data
// }




