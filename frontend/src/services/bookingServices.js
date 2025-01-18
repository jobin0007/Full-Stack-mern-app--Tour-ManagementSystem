import axios from "axios"
import { getUserData } from "../utilities/handleToken"
import { BASE_URL } from "../utilities/urls"


  export const createBookingAPI = async (tourId, bookingDetails) => {
    const token = getUserData();
    const { start_date, end_date } = bookingDetails;
  
    const response = await axios.put(
      `${BASE_URL}/bookings/create_booking/${tourId}`, { start_date, end_date },
   // Empty body if no additional data is sent
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };

