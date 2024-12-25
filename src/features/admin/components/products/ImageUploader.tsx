import { isNonEmptyArray } from '@apollo/client/utilities'
import { Flex, Image, Text } from '@chakra-ui/react'
import { Cancel01Icon, ImageUpload01Icon } from 'hugeicons-react'
import { isEmpty } from 'lodash'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

enum ImageStatusEnum {
  Ready = 'ready',
  Uploading = 'uploading',
  Uploaded = 'uploaded',
  Error = 'error',
}

interface ImagePreview {
  file: File
  url: string
  status: ImageStatusEnum
}

type ImageUploaderProps = {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export const ImageUploader: FC<ImageUploaderProps> = ({ register, setValue }) => {
  const [images, setImages] = useState<ImagePreview[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      handleFiles(files)

      setValue('medias', files)
    }
  }

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const previews = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        status: ImageStatusEnum.Ready,
      }))

      setImages(previews)
    }
  }

  return (
    <Flex gap={4} flexDir="column">
      <Flex
        border="1px dashed #17C653"
        background="#DFFFEA"
        p={6}
        width="100%"
        textAlign="center"
        borderRadius="md"
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        _hover={{ cursor: 'pointer' }}
      >
        {images.map((img, index) => (
          <Flex flexDir="column" alignItems="center" key={index} position="relative">
            <Image src={img.url} alt="" width="120px" height="120px" borderRadius="8px" />
            <Flex
              display-name="cancel-icon"
              position="absolute"
              top="-8px"
              right="-8px"
              rounded="full"
              bg="white"
              p={1}
              zIndex={2}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                images.splice(index, 1)
                setImages([...images])
              }}
            >
              <Cancel01Icon size={16} />
            </Flex>
          </Flex>
        ))}
        {isEmpty(images) && (
          <Flex flexGrow="1" gap="16px">
            <ImageUpload01Icon size={24} />
            <Text fontWeight="700">Drop files here or click to upload.</Text>
          </Flex>
        )}
      </Flex>
      {isNonEmptyArray(images) && (
        <Flex flexGrow="1" gap="16px" display-name="">
          <Text fontSize="sm" color="gray.500">
            {images.length} files selected
          </Text>
        </Flex>
      )}
      <input
        type="file"
        multiple
        hidden
        {...register('medias')}
        ref={fileInputRef}
        onChange={handleFileSelection}
      />
    </Flex>
  )
}
