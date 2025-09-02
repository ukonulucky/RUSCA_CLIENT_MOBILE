import axios from 'axios'
import { apiLoginType,  signUpFormStateProp } from '../../utils/types'

const baseUrl = 'http://10.0.2.2:9000/v1'

/* register api */
export const registerApi = async (data: signUpFormStateProp) => {
  const res = await axios.post(`${baseUrl}/auth/register`, data)
  return res.data
}

/* register login api */
export const loginApi = async (data: apiLoginType) => {
  const response = await axios.post(`${baseUrl}/auth/login`, data)
  return response.data
}

/* verify email otp inputed  by user api */
export const verifyEmailApi = async (data: {
  jwtToken: string
  token: string
}) => {
  console.log('sent data to token', data)
  const response = await axios.post(
    `${baseUrl}/user/verify-email`,
    { token: data.token },
    {
      headers: {
        Authorization: `Bearer ${data.jwtToken}`
      }
    }
  )
  return response.data
}

/* send verification email to user  api */

export const sendVerificationEmailApi = async (token: string) => {
  console.log("this is the token received", token)
  const response = await axios.get(`${baseUrl}/user/send-verification-email`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

/* send user email for password reset */

export const sendUserEmailForPasswordResetApi = async (data: {
  email: string
}) => {
  /* user/send-password-token */
  const response = await axios.post(`${baseUrl}/auth/forgotpassword`, data)
  return response.data
 
}

/* verify user password reset token sent to user email */

/* 
verifyUserPasswordResetTokenApi
*/
export const verifyUserPasswordResetTokenApi = async (data: {
  email: string
  token: string
}) => {
  const response = await axios.post(`${baseUrl}/auth/verify-reset-token`, data)
  return response.data
}

/* Reset the user password */
export const resetUserPasswordApi = async (data: {
  email: string
  token: string
  password: string
}) => {
  const response = await axios.post(`${baseUrl}/user/reset-password`, data)
  return response.data
}

/* logout user */

export const logOutUserApi = async (token: string) => {

  const response = await axios.get(`${baseUrl}/user/logout`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  return response.data
}


/* update user profile  */

export const upLoadUserProfilePicApi = async (data: {
  formData: HTMLFormElement,
  token: string
}) => { 
  const response = await axios.post(`${baseUrl}/user/upload`, data.formData, {
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'multipart/form-data',
    },

  })
  console.log("this is the uplaod response", response.data)
  return response.data
}
  