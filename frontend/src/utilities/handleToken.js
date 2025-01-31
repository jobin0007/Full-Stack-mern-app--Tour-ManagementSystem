import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// export const adminTokenData = () => { 

//   return Cookies.get('AdminData') ? jwtDecode(Cookies.get('AdminData')) : null;  

// }

export const getAdminData = () => {
  return Cookies.get('AdminData') ? jwtDecode(Cookies.get('AdminData')) : null
}
export const getAdminToken = () => {
  return Cookies.get('AdminData') ? Cookies.get('AdminData') : null
}

export const getUserData = () => {
  return Cookies.get('UserData') ? jwtDecode(Cookies.get('UserData')) : null
}

export const getUserToken = () => {
  return Cookies.get('UserData') ? Cookies.get('UserData') : null
}

export const getTourOperatorData = () => {
  return Cookies.get('tourOperatorData') ? jwtDecode(Cookies.get('tourOperatorData')) : null
}
export const getTourOperatorToken = () => {
  return Cookies.get('tourOperatorData') ? Cookies.get('tourOperatorData') : null
}
