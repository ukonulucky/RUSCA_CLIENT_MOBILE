import axios from 'axios'
import { getAllGroupsType } from '../../utils/types'

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
