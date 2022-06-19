import { apolloClient } from '@/plugins/apollo'
import axios from 'axios'
import { GENERATE_PASSPORT_UPLOAD_URL, GENERATE_UPLOAD_URL } from './graphql/file-upload'

/**
 *
 * @param {*} file
 * @param {*} type
 * @returns {Promise<{
 * uploadUrl: string
 * fileUrl: string
 * key: string
 * }>}
 */
async function uploadFile (file, urls) {
  await axios.put(urls.uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size
    }
  })

  return urls
}

export async function uploadPassportFile (file, { bookingId, code } = {}) {
  let res
  if (code) {
    res = await apolloClient.mutate({
      mutation: GENERATE_PASSPORT_UPLOAD_URL,
      variables: {
        contentType: file.type,
        contentLength: file.size,
        bookingId,
        code
      }
    })
  } else {
    res = await apolloClient.mutate({
      mutation: GENERATE_UPLOAD_URL,
      variables: {
        contentType: file.type,
        contentLength: file.size,
        type: 'Passport'
      }
    })
  }
  const urls = res.data.generateMyUploadUrl
  return uploadFile(file, urls)
}
