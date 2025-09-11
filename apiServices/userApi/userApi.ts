import axios from 'axios'

const baseUrl = 'http://10.0.2.2:9000/v1'

/* getAllGroups api */

export const getAllGroupsApi = async (data: {
  jwtToken: string,
  userId: string
}) => {
  console.log("credentials sent", data)
  const res = await axios.get(`${baseUrl}/contribution/group/groups`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      "userid":data.userId
    }
  })
  return res.data
}
export const addMemberToGroupApi = async (data: {
  jwtToken: string,
  userId: string,
  groupId: string
}) => {
 
  const res = await axios.post(`${baseUrl}/contribution/member/addMember`, {
    groupId : data.groupId
  }, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      "userid":data.userId
    }
  })
  return res.data
}

export const getGroupMembersApi = async (data: {
  jwtToken: string,
  userId: string,
  groupId: string
}) => {
  const res = await axios.get(`${baseUrl}/contribution/group/members/${data.groupId}`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      "userid":data.userId
    }
  })
  return res.data
}
export const getGroupApi = async (data: {
  jwtToken: string,
  userId: string,
  groupId: string
}) => {
  const res = await axios.get(`${baseUrl}/contribution/group/${data.groupId}`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      "userid":data.userId
    }
  })
  return res.data
}
export const getGroupMembersAndPaymentAmountApi = async (data: {
  jwtToken: string,
  userId: string
}) => {
  const res = await axios.get(`${baseUrl}/contribution/member/members/all`, {
    headers: {
      Authorization: `Bearer ${data.jwtToken}`,
      "userid":data.userId
    }
  })
  return res.data
}








