import { Card, Flex, Group, Heading, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { FC, useState } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import { useAddCategoryMutation } from '../../apis/addCategory.generated'
import { useGeneratePresignedUrlsMutation } from '../../apis/generatePresignedUrls.generated'
import { uploadFileToS3 } from '../../apis/uploadFileToS3'

import { InputField, TextAreaField, ThumbnailUpload } from '@/components/form'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { allCategoriesForAdmin } from '@/features/admin/apis/categories'
import { AddCategoryInput, CategoryStatus, GenerateUrlFor } from '@/types'
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

export const AddCategoryForm: FC = () => {
  const navigate = useNavigate()

  const categoryId = uuidv4()

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

  const [categoryStatus, setCategoryStatus] = useState<CategoryStatus>(CategoryStatus.Draft)

  const goBackToCategories = () => {
    navigate('/admin/categories')
  }

  const [addCategory, { loading }] = useAddCategoryMutation({
    onCompleted: () => {
      toaster.create({
        title: 'Category added successfully',
        type: 'success',
        duration: 2000,
      })
      goBackToCategories()
    },
    refetchQueries: [{ query: allCategoriesForAdmin, variables: { categoryFilter: {} } }],
  })

  const [generatePresignedUrls, { loading: generatingPresignedUrls }] =
    useGeneratePresignedUrlsMutation({
      fetchPolicy: 'network-only',
    })

  const categoryStatusOptions = Object.entries(CategoryStatus)

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

        const variables: AddCategoryInput = {
          categoryId,
          name,
          description,
          imageUrlType: imageFileType,
          status: categoryStatus,
        }

        void addCategory({
          variables: {
            addCategoriesInput: variables,
          },
        })
      }
    })
  }

  return (
    <form
      data-testid="add-category-form"
      style={{ width: '100%' }}
      onSubmit={handleSubmit(handleFormSubmit)}
      id="add-category-form"
    >
      <Flex
        flexDir={{ base: 'column', xl: 'row' }}
        w="100%"
        gap="32px"
        data-testid="add-category-form-flex"
      >
        <Flex flexDir="column" w={{ base: '100%', xl: '20%' }} gap="24px">
          <Card.Root variant="elevated" size="md" p="20px">
            <Card.Header>
              <Heading size="md">Thumbnail</Heading>
            </Card.Header>
            <Card.Body
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <ThumbnailUpload
                errors={errors}
                register={register}
                setError={setError}
                setValue={setValue}
                clearErrors={clearErrors}
                thumbnailUrl=""
                fieldName="image"
              />

              <Text fontSize="sm" color="gray.500">
                Set the category thumbnail image. Only *.png, *.jpg and *.jpeg image files are
                accepted
              </Text>
            </Card.Body>
          </Card.Root>
          <Card.Root variant="elevated" size="md" p="20px" data-testid="category-status-card">
            <Card.Header>
              <Heading size="md">Status</Heading>
            </Card.Header>
            <Card.Body style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
            </Card.Body>
          </Card.Root>
        </Flex>
        <Flex flex="fit-content" flexDir="column" gap="32px">
          <Flex flex="fit-content" display-name="general-section">
            <Card.Root w="100%" p={{ base: 0, xl: '20px' }}>
              <Card.Header p={{ base: '8px', xl: '16px' }}>
                <Heading size="md" fontWeight="600">
                  General
                </Heading>
              </Card.Header>
              <Card.Body p={{ base: '8px', xl: '16px' }}>
                <Flex flexDir="column" gap="24px">
                  <InputField
                    fieldName="name"
                    label="Category Name"
                    control={control}
                    error={errors['name'] as FieldError}
                    isRequired
                    placeholder="Enter the name of the category"
                    withRoundBorders={false}
                  />
                  <TextAreaField
                    fieldName="description"
                    label="Description"
                    control={control}
                    error={errors['description'] as FieldError}
                    isRequired
                    placeholder="Enter the description of the category"
                    maxLength={200}
                    showTextLength
                  />
                </Flex>
              </Card.Body>
            </Card.Root>
          </Flex>
          <Flex display-name="footer" justify="end">
            <Group attached>
              <Button variant="ghost" colorScheme="blue" onClick={() => goBackToCategories()}>
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                type="submit"
                loading={loading}
                loadingText="Saving..."
                disabled={loading || generatingPresignedUrls}
                form="add-category-form"
              >
                Save Changes
              </Button>
            </Group>
          </Flex>
        </Flex>
      </Flex>
    </form>
  )
}
