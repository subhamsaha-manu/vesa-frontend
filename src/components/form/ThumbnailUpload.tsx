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
  UseFormTrigger,
} from 'react-hook-form'

import { ALLOWED_THUMBNAIL_FILE_TYPES, MAX_THUMBNAIL_FILE_SIZE } from '@/utils/constants'

type ThumbnailUploadProps = {
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
  setError: UseFormSetError<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  thumbnailUrl?: string | null
  trigger: UseFormTrigger<FieldValues>
  onFileAdded: () => void
}

export const ThumbnailUpload: FC<ThumbnailUploadProps> = ({
  errors,
  register,
  setError,
  setValue,
  clearErrors,
  thumbnailUrl,
  onFileAdded,
}) => {
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<any>(thumbnailUrl ?? null)

  const isFieldError = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  ): error is FieldError => {
    return (error as FieldError).message !== undefined
  }
  useEffect(() => {
    setThumbnailPreview(thumbnailUrl)
    if (thumbnailUrl) {
      setValue('thumbnail', thumbnailUrl)
    }
  }, [setValue, thumbnailUrl])

  const validateThumbnailFile = (event: ChangeEvent<HTMLInputElement>) => {
    const thumbnailFile = event.target.files?.[0]

    if (!thumbnailFile) {
      return
    }

    const fileName = thumbnailFile.name || ''
    const fileSize = thumbnailFile.size || 0
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || ''

    if (fileSize > MAX_THUMBNAIL_FILE_SIZE) {
      setError('thumbnail', {
        type: 'manual',
        message: `Thumbnail size must be less than ${MAX_THUMBNAIL_FILE_SIZE / (1024 * 1024)} MB`,
      })
    } else if (!ALLOWED_THUMBNAIL_FILE_TYPES.includes(fileExtension)) {
      setError('thumbnail', {
        type: 'manual',
        message: `Invalid thumbnail file type. Allowed types: ${ALLOWED_THUMBNAIL_FILE_TYPES.join(
          ', '
        )}`,
      })
    } else {
      clearErrors('thumbnail')

      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(thumbnailFile)
      setValue('thumbnail', thumbnailFile)
      onFileAdded()
    }
  }

  const triggerThumbnailFileInput = () => {
    if (thumbnailFileInputRef.current) {
      thumbnailFileInputRef.current.click()
    }
  }

  return (
    <FormControl isInvalid={!!errors['thumbnail']}>
      <Flex
        boxShadow="#00000013 0px 6.5px 19.5px 6.5px"
        borderRadius="8px"
        border="3px solid white"
        height="200px"
        width="200px"
        backgroundImage={thumbnailPreview}
        padding={0}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        justifyContent="center"
      />
      <Flex
        border="5px solid white"
        borderRadius="50%"
        position="absolute"
        top="8px"
        right="30px"
        background="white"
        cursor="pointer"
        onClick={triggerThumbnailFileInput}
      >
        <PencilEdit02Icon size="20" color="#000000" data-testid="update-thumbnail-icon" />
        <input
          style={{ display: 'none' }}
          {...register('thumbnail')}
          ref={thumbnailFileInputRef}
          type="file"
          onChange={validateThumbnailFile}
          data-testid="upload-thumbnail-input"
        />
      </Flex>
      {errors['thumbnail'] && (
        <Flex display-name="field-wrapper-error-box-div" alignItems="center" w="100%">
          <FormErrorMessage>
            {errors.thumbnail && isFieldError(errors.thumbnail) ? errors.thumbnail.message : null}
          </FormErrorMessage>
        </Flex>
      )}
    </FormControl>
  )
}
