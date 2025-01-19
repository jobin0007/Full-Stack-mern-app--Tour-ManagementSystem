import axios from "axios"
import { BASE_URL } from "../utilities/urls"

export const tourOperatorLoginAPI =async(data)=>{
    const response = await axios.post(`${BASE_URL}/tour-operator/login`,data)
    return response?.data

}
