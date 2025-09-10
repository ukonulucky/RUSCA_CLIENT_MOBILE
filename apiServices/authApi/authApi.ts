import axios from 'axios'
import { apiLoginType,  createGroupApiProp,   signUpFormStateProp } from '../../utils/types'

const baseUrl = 'http://10.0.2.2:9000/v1'

/* register api */
export const registerApi = async (data: signUpFormStateProp) => {
  const res = await axios.post(`${baseUrl}/auth/register`, data)
  return res.data
}
/* register api */
export const createGroupApi = async ({ 
  groupName,
  jwtToken,
  monthlyContribution,
  numberOfMembers,
  userId
}: createGroupApiProp) => {
  
  const res = await axios.post(`${baseUrl}/contribution/group/create`, {
    groupName,
    numberOfMembers,
    monthlyContribution
  }, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "userid":userId
    }
  })
  console.log("response", res)
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

/* 
verifyUserPasswordResetTokenApi
*/
export const verifyUserPasswordResetTokenApi = async (data: {
  email: string
  token: string
}) => {
  const response = await axios.post(`${baseUrl}/auth/verifyChangePasswordToken`, data)
  return response.data
}

/* Reset the user password */
export const resetUserPasswordApi = async (data: {
  email: string
  token: string
  password: string
}) => {
  const response = await axios.post(`${baseUrl}/auth/updatepassword`, data)
  return response.data
}

/* logout user */

export const logOutUserApi = async (token: string) => {

  const response = await axios.get(`${baseUrl}/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}


/* update user profile  */
// v1/
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
export const getAllMembersDetailsApi = async (data: {
  userId: string,
  jwtToken: string
}) => { 
  const response = await axios.get(`${baseUrl}/contribution/member/members/all/details`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      'userId': data.userId,
    },

  })
  return response.data
}

// delete member by Id

export const deletMemberByIdApi = async (data: {
  userId: string,
  jwtToken: string,
  id: string
}) => { 
  const response = await axios.delete(`${baseUrl}/contribution/member/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      'userId': data.userId,
    },
    
  })
  return response.data
}

export const activateMemberByIdApi = async (data: {
  userId: string,
  jwtToken: string,
  id: string
}) => { 
  const response = await axios.get(`${baseUrl}/contribution/member/activate/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      'userId': data.userId,
    },
    
  })
  return response.data
}

// delete member
