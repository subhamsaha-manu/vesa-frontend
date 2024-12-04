import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { FC, useEffect, useState } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { allCategoriesForAdmin } from '../../apis/categories'
import { useGeneratePresignedUrlsMutation } from '../../apis/generatePresignedUrls.generated'
import { useUpdateCategoryMutation } from '../../apis/updateCategory.generated'
import { uploadFileToS3 } from '../../apis/uploadFileToS3'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { InputField, TextAreaField, ThumbnailUpload } from '@/components/form'
import { Category, CategoryStatus, GenerateUrlFor, UpdateCategoryInput } from '@/types'
import {
  CATEGORY_TITLE_IS_MANDATORY,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  PRODUCT_DESCRIPTION_IS_MANDATORY,
} from '@/utils/constants'

const schema = z.object({
  name: z
    .string()
    .min(1, CATEGORY_TITLE_IS_MANDATORY)
    .max(100)
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
  description: z
    .string()
    .min(1, PRODUCT_DESCRIPTION_IS_MANDATORY)
    .max(200)
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
  image: z.any().optional(),
  status: z.any().optional(),
})

type EditContainerFormProps = {
  categoryDetail: Category
}

export const EditContainerForm: FC<EditContainerFormProps> = ({ categoryDetail }) => {
  const navigate = useNavigate()

  const { categoryId, name, description, imageUrl, status } = categoryDetail

  const [categoryStatus, setCategoryStatus] = useState<CategoryStatus>(status)

  const categoryStatusOptions = Object.entries(CategoryStatus)

  useEffect(() => {
    setCategoryStatus(status)
  }, [categoryId, status])

  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    clearErrors,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const toast = useToast()

  const goBackToProducts = () => {
    navigate('/admin/categories')
  }

  const [updateCategory, { loading }] = useUpdateCategoryMutation({
    onCompleted: () => {
      toast({
        title: 'Category updated successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      goBackToProducts()
    },
    refetchQueries: [{ query: allCategoriesForAdmin }],
  })

  const [generatePresignedUrls, { loading: generatingPresignedUrls }] =
    useGeneratePresignedUrlsMutation({
      fetchPolicy: 'network-only',
    })

  const handleFormSubmit = (values: FieldValues) => {
    const { name, description, image } = values

    const imageFileType = image?.type

    generatePresignedUrls({
      variables: {
        generatePresignedUrlsInput: {
          generateUrlFor: GenerateUrlFor.Category,
          id: categoryId,
          mediaFileTypes: imageFileType ? [imageFileType] : [],
        },
      },
    }).then((data) => {
      if (data.data?.generatePresignedUrls) {
        const { mediaUrls } = data.data.generatePresignedUrls

        void uploadFileToS3(image as File, mediaUrls[0])

        const variables: UpdateCategoryInput = {
          name,
          description,
          mediaFileType: imageFileType,
          status: categoryStatus,
        }

        void updateCategory({
          variables: {
            categoryId,
            updateCategoryInput: variables,
          },
        })
      }
    })
  }

  return (
    <form
      data-testid="edit-category-form"
      style={{ width: '100%' }}
      onSubmit={handleSubmit(handleFormSubmit)}
      id="edit-category-form"
    >
      <Flex
        flexDir={{ base: 'column', xl: 'row' }}
        w="100%"
        gap="32px"
        data-testid="edit-category-form-flex"
      >
        <Flex flexDir="column" w={{ base: '100%', xl: '20%' }} gap="24px">
          <Card variant="elevated" size="md" p="20px">
            <CardHeader>
              <Heading size="md">Thumbnail</Heading>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <ThumbnailUpload
                errors={errors}
                register={register}
                setError={setError}
                setValue={setValue}
                clearErrors={clearErrors}
                thumbnailUrl={imageUrl}
                fieldName="image"
              />
            </CardBody>
          </Card>
          <Card variant="elevated" size="md" p="20px" data-testid="category-status-card">
            <CardHeader>
              <Heading size="md">Status</Heading>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <Select
                placeholder="Select category status"
                selectionMode="single"
                className="max-w-xs"
                selectedKeys={[categoryStatus]}
                onSelectionChange={(keys: SharedSelection) => {
                  setCategoryStatus(keys.currentKey as CategoryStatus)
                }}
              >
                {categoryStatusOptions.map(([key, status]) => (
                  <SelectItem key={status}>{key}</SelectItem>
                ))}
              </Select>
            </CardBody>
          </Card>
        </Flex>
        <Flex flex="fit-content" flexDir="column" gap="32px">
          <Flex flex="fit-content" display-name="general-section">
            <Card w="100%" p={{ base: 0, xl: '20px' }}>
              <CardHeader p={{ base: '8px', xl: '16px' }}>
                <Heading size="md" fontWeight="600">
                  General
                </Heading>
              </CardHeader>
              <CardBody p={{ base: '8px', xl: '16px' }}>
                <Flex flexDir="column" gap="24px">
                  <InputField
                    fieldName="name"
                    label="Category Name"
                    control={control}
                    error={errors['name'] as FieldError}
                    isRequired
                    value={name}
                    placeholder="Enter the name of the category"
                    withRoundBorders={false}
                  />
                  <TextAreaField
                    fieldName="description"
                    label="Description"
                    control={control}
                    error={errors['description'] as FieldError}
                    isRequired
                    value={description}
                    placeholder="Enter the description of the category"
                    maxLength={200}
                    showTextLength
                  />
                </Flex>
              </CardBody>
            </Card>
          </Flex>
          <Flex display-name="footer" justify="end">
            <ButtonGroup spacing="2">
              <Button variant="ghost" colorScheme="blue" onClick={() => goBackToProducts()}>
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                type="submit"
                leftIcon={loading ? <SpinnerContainer size="20px" /> : undefined}
                isDisabled={loading || generatingPresignedUrls}
                form="edit-category-form"
              >
                Save Changes
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
    </form>
  )
}
