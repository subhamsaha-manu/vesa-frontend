// eslint-disable-next-line import/namespace
import axios from 'axios'

import { USER_TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

export const getCurrentUserDetails = async () => {
  const token = storage.getItem(USER_TOKEN)

  return await axios.get(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/v1/user/details`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}
