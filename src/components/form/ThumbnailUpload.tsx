import { Flex, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { PencilEdit02Icon } from 'hugeicons-react'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'

import { ALLOWED_THUMBNAIL_FILE_TYPES, MAX_THUMBNAIL_FILE_SIZE } from '@/utils/constants'

type ThumbnailUploadProps = {
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
  setError: UseFormSetError<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  thumbnailUrl?: string | null
  fieldName?: string
}

export const ThumbnailUpload: FC<ThumbnailUploadProps> = ({
  errors,
  register,
  setError,
  setValue,
  clearErrors,
  thumbnailUrl,
  fieldName = 'thumbnail',
}) => {
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<any>(thumbnailUrl)

  const isFieldError = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  ): error is FieldError => {
    return (error as FieldError).message !== undefined
  }

  useEffect(() => {
    if (thumbnailUrl) {
      setThumbnailPreview(thumbnailUrl)
    }
  }, [thumbnailUrl])

  const validateThumbnailFile = (event: ChangeEvent<HTMLInputElement>) => {
    const thumbnailFile = event.target.files?.[0]

    if (!thumbnailFile) {
      return
    }

    const fileName = thumbnailFile.name || ''
    const fileSize = thumbnailFile.size || 0
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || ''

    if (fileSize > MAX_THUMBNAIL_FILE_SIZE) {
      setError(fieldName, {
        type: 'manual',
        message: `Thumbnail size must be less than ${MAX_THUMBNAIL_FILE_SIZE / (1024 * 1024)} MB`,
      })
    } else if (!ALLOWED_THUMBNAIL_FILE_TYPES.includes(fileExtension)) {
      setError(fieldName, {
        type: 'manual',
        message: `Invalid thumbnail file type. Allowed types: ${ALLOWED_THUMBNAIL_FILE_TYPES.join(
          ', '
        )}`,
      })
    } else {
      clearErrors(fieldName)

      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(thumbnailFile)
      setValue(fieldName, thumbnailFile)
    }
  }

  const triggerThumbnailFileInput = () => {
    if (thumbnailFileInputRef.current) {
      thumbnailFileInputRef.current.click()
    }
  }

  return (
    <FormControl isInvalid={!!errors[fieldName]}>
      <Flex
        boxShadow="#00000013 0px 6.5px 19.5px 6.5px"
        borderRadius="8px"
        border="3px solid white"
        height="200px"
        backgroundImage={thumbnailPreview}
        padding={0}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        justifyContent="center"
      />
      <Flex
        data-testid="update-thumbnail-icon"
        boxShadow="0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075)"
        borderRadius="50%"
        position="absolute"
        top="-12px"
        right="-10px"
        background="white"
        cursor="pointer"
        onClick={triggerThumbnailFileInput}
        height="30px"
        width="30px"
        alignItems="center"
        justify="center"
      >
        <PencilEdit02Icon size="20" color="#000000" />
        <input
          style={{ display: 'none' }}
          {...register(fieldName)}
          ref={thumbnailFileInputRef}
          type="file"
          onChange={validateThumbnailFile}
          data-testid="upload-thumbnail-input"
        />
      </Flex>
      {errors[fieldName] && (
        <Flex display-name="field-wrapper-error-box-div" alignItems="center" w="100%">
          <FormErrorMessage>
            {errors.thumbnail && isFieldError(errors.thumbnail) ? errors.thumbnail.message : null}
          </FormErrorMessage>
        </Flex>
      )}
    </FormControl>
  )
}
