import axios from 'axios'

const baseUrl = 'http://10.0.2.2:9000/v1/payment'

/* payment api api */

export const makePaymentApi = async (data: {
  amount: string,
    email: string,
  name: string,
  groupId: string,
  userId: string,
    jwtToken: string
}) => {
  const res = await axios.post(`${baseUrl}/paymentIntent`, data, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      "userid":data.userId
    }
  })
  return res.data
   
  }
export const getPaymentHistoryApi = async (data: {
  jwtToken: string,
  userId: string,
  email: string
}) => {
    const res = await axios.post(`${baseUrl}/history`, {
        email: data.email
      }, {
        headers: {
          Authorization: `Bearer ${data.jwtToken}`,
          "userid":data.userId
        }
      })
  
    return res.data
  }



