import axios from "axios"
import { BASE_URL } from "../utilities/urls"



export const toursAPI=async(data)=>{
    console.log(data);
    console.log('base',BASE_URL);
    const response = await axios.get(`${BASE_URL}/tour/get_all_tour`,data)
  
    return response?.data
}  