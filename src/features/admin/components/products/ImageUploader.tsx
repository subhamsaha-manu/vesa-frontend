import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import { FC, useState } from 'react'

import { useGeneratePresignedUrlsMutation } from '../../apis/generatePresignedUrls.generated'

interface ImagePreview {
  file: File
  url: string
  status: 'ready' | 'uploading' | 'uploaded' | 'error'
}

export const ImageUploader: FC<{ productId: string }> = ({ productId }) => {
  const [images, setImages] = useState<ImagePreview[]>([])

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const previews = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        status: 'ready',
      }))
      // eslint-disable-next-line
      // @ts-ignore
      setImages(previews)
    }
  }

  const [getPresignedUrls] = useGeneratePresignedUrlsMutation()

  const handleUpload = async () => {
    const contentTypes = images.map((img) => img.file.type)

    try {
      const { data } = await getPresignedUrls({
        variables: { productId, contentTypes },
      })
      const presignedUrls = data!.generatePresignedUrls

      await Promise.all(
        images.map(async (img, index) => {
          const url = presignedUrls[index]
          img.status = 'uploading'
          setImages([...images])

          try {
            await fetch(url, {
              method: 'PUT',
              body: img.file,
              headers: { 'Content-Type': img.file.type },
            })
            img.status = 'uploaded'
          } catch (error) {
            img.status = 'error'
          }
          setImages([...images])
        })
      )
    } catch (error) {
      console.error('Error fetching presigned URLs:', error)
    }
  }

  return (
    <VStack spacing={4}>
      <Box
        border="2px dashed"
        p={4}
        width="100%"
        textAlign="center"
        borderRadius="md"
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Text>Drag & drop images here or click to select files</Text>
      </Box>
      <input type="file" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
      <Button onClick={handleUpload}>Upload Images</Button>

      <VStack spacing={2} width="100%">
        {images.map((img, index) => (
          <Box key={index} position="relative">
            <Image src={img.url} boxSize="100px" objectFit="cover" />
            <Text>{img.status}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}
