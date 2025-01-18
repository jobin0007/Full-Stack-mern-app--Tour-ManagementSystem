import Cookies from 'js-cookie';







// export const adminTokenData = () => { 

//   return Cookies.get('AdminData') ? jwtDecode(Cookies.get('AdminData')) : null;  

// };

export const getAdminToken = ()=>{

    return Cookies.get('AdminData') 
  
  }

  export const getUserData = () => {
    return Cookies.get("UserData"); 
  };
