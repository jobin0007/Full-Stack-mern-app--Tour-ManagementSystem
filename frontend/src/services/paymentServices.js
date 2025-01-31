import axios from "axios";
import { getUserData, getUserToken } from "../utilities/handleToken";
import { BASE_URL } from "../utilities/urls";

// 
// Create Order API
export const createOrderAPI = async (bookingId) => {
  const token = getUserToken(); // Get the token of the current user

  try {
    const response = await axios.post(
      `${BASE_URL}/payment/create-order/${bookingId}`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data; // Return the response from backend (order details)
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(error.response?.data?.message || "Failed to create order.");
  }
};

// Verify Payment API
export const verifyPaymentAPI = async (paymentData) => {
  const token = getUserToken(); // Get the token of the current user

  try {
    const response = await axios.post(
      `${BASE_URL}/payment/verify-payment`, 
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data; // Return the verification response from the backend
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw new Error(error.response?.data?.message || "Payment verification failed.");
  }
};