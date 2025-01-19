import axios from "axios";
import { getTourOperatorData, getUserData } from "../utilities/handleToken";
import { BASE_URL } from "../utilities/urls";

export const createCustomTourAPI = async(data)=>{
     const token = getUserData();
     const response = await axios.post(`${BASE_URL}/cusomized-tour/create-customize-tour`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     });
     return response?.data
}
export const getAllCustomToursAPI = async()=>{
    const token = getTourOperatorData();
    const response = await axios.get(`${BASE_URL}/cusomized-tour/all-customized-tour-requests`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     });
     return response?.data
}
