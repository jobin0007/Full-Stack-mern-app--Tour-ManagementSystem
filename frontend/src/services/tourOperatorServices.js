import axios from "axios"
import { BASE_URL } from "../utilities/urls"
import { getTourOperatorData, getTourOperatorToken } from "../utilities/handleToken"

export const tourOperatorLoginAPI =async(data)=>{
    const response = await axios.post(`${BASE_URL}/tour-operator/login`,data)
    return response?.data

}
export const getTourOperatorAPI = async(tourOperatorId)=>{
    const token = getTourOperatorToken()
    const response = await axios.get(`${BASE_URL}/tour-operator/get_tour_operator_profile/${tourOperatorId}`,{
        headers:{
            Authorization:`Bearer ${token}`       
         }
    })
    console.log("operator", response.data);
    return response?.data
}

export const viewAcceptedToursAPI= async()=>{
    const token = getTourOperatorToken()
    const response = await axios.get(`${BASE_URL}/bookings/accepted-tours`,{
        
        headers:{
            Authorization:`Bearer ${token}`       
         }
    })
    console.log("operator", response.data);
    return response?.data
}