import axios from "axios"
import { updateUserDataApiProp } from "../../utils/types"



const baseUrl = 'https://quible-mobile-app-88c4ecf72677.herokuapp.com/api'



/* save expo token to nodejs server */
export const saveExpoPushTokenApi = async (data: {
    jwtToken: string
    expoPushToken: any
  }) => {
   const response = await axios.post(
      `${baseUrl}/user/save-fcmtoken`,
      { fcm_token: data.expoPushToken.toString()},
      {
        headers: {
          Authorization: `Bearer ${data.jwtToken}`
        }
      }
   )
  return response.data
  }
  

  /* upload image api  */


  export const uploadImageApi = async (data: {
    jwtToken: string
    formData: any
  }) => {
   const response = await axios.post(
      `${baseUrl}/user/upload`, data.formData,
      {
        headers: {
          Authorization: `Bearer ${data.jwtToken}`,
          'content-type': 'multipart/form-data'
        }
      }
   )
  return response.data
  }
  




  

/* get current user  */


export const getCurretUserApi = async (jwtToken: string) => {
 const response = await axios.get(
   `${baseUrl}/user/me`, {
     headers: {
      Authorization: `Bearer ${jwtToken}`,
     }
   }
 )
return response.data
}



/* update user data */
/* 
/user/update
*/

export const updateUserDataApi = async ({ 
  jwtToken,
  userData
}: updateUserDataApiProp) => {
  const data = {
    fullname: userData.fullName,
    phone: userData.phone,
    image: userData.image,
    dob: userData.dob
  
  }

  const response = await axios.put(
    `${baseUrl}/user/update`,data, {
      headers: {
       Authorization: `Bearer ${jwtToken}`
      }
    }
  )
 return response.data
 }
 
/* {{base_url}}/rider-verification/me */


export const getRiderVerificationStatusApi = async (
  jwtToken: string
) => {

  const response = await axios.get(
    `${baseUrl}/rider-verification/me`, {
      headers: {
       Authorization: `Bearer ${jwtToken}`
      }
    }
  )
 return response.data
 }