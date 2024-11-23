export const uploadFileToS3 = async (file: File, presignedUrl: string) => {
  try {
    return await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })
  } catch (error) {
    console.error('Error uploading file', error)
  }
}
