import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chip, Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { FC, useEffect, useState } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { useGeneratePresignedUrlsMutation } from '../../apis/generatePresignedUrls.generated'
import { allProductsForAdmin } from '../../apis/products'
import { useUpdateProductMutation } from '../../apis/updateProduct.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { InputField, TextAreaField, ThumbnailUpload } from '@/components/form'
import { uploadFileToS3 } from '@/features/admin/apis/uploadFileToS3'
import { ImageUploader } from '@/features/admin/components/products/ImageUploader'
import { Category, Product, UpdateProductInput } from '@/types'
import {
  INR_CURRENCY_SYMBOL,
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  PRODUCT_DESCRIPTION_IS_MANDATORY,
  PRODUCT_TITLE_IS_MANDATORY,
} from '@/utils/constants'

const schema = z.object({
  title: z
    .string()
    .min(1, PRODUCT_TITLE_IS_MANDATORY)
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
  price: z.string().min(1).regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
    message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  }),
  quantity: z.string().min(1).regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
    message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  }),
  thumbnail: z.any().optional(),
  medias: z.any().optional(),
})

type CategoryType = Pick<Category, 'categoryId' | 'name'>

type EditContainerFormProps = {
  categories: Array<CategoryType>
  productDetail: Omit<Product, 'id'>
}

export const EditContainerForm: FC<EditContainerFormProps> = ({ categories, productDetail }) => {
  const navigate = useNavigate()

  const { productId, title, description, price, quantity, categoryIds, thumbnailUrl } =
    productDetail
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    clearErrors,
    getValues,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const [productCategories, setProductCategories] = useState<Array<CategoryType>>([])

  const handleClose = (categoryToRemove: CategoryType) => {
    setProductCategories(
      productCategories.filter((category) => category.categoryId !== categoryToRemove.categoryId)
    )
  }

  const toast = useToast()

  const goBackToProducts = () => {
    navigate('/admin/products')
  }

  const [updateProduct, { loading }] = useUpdateProductMutation({
    onCompleted: () => {
      toast({
        title: 'Product updated successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      goBackToProducts()
    },
    refetchQueries: [
      { query: allProductsForAdmin, variables: { productFilter: {}, pageNumber: 0, pageSize: 20 } },
    ],
  })

  const [generatePresignedUrls, { loading: generatingPresignedUrls }] =
    useGeneratePresignedUrlsMutation({
      fetchPolicy: 'network-only',
    })

  useEffect(() => {
    setProductCategories(
      categoryIds.map((categoryId) => {
        const category = categories.find((category) => category.categoryId === categoryId)
        return category as CategoryType
      })
    )
  }, [categories, categoryIds, productDetail])

  const handleFormSubmit = (values: FieldValues) => {
    const { title, description, price, quantity, medias, thumbnail } = values

    const thumbnailFileType = thumbnail?.type
    const mediaFileTypes = Array.from(medias).map((file) => (file as File).type)

    generatePresignedUrls({
      variables: {
        generatePresignedUrlsInput: {
          productId,
          thumbnailFileType,
          mediaFileTypes,
        },
      },
    }).then((data) => {
      if (data.data?.generatePresignedUrls) {
        const { mediaUrls, thumbnailUrl } = data.data.generatePresignedUrls

        void uploadFileToS3(thumbnail as File, thumbnailUrl)
        Array.from(medias).forEach((file, index) => {
          void uploadFileToS3(file as File, mediaUrls[index])
        })
      }
    })

    const variables: UpdateProductInput = {
      title,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      categoryIds: productCategories.map((category) => category.categoryId),
      thumbnailFileType,
      mediaFileTypes,
    }

    void updateProduct({
      variables: {
        productId,
        updateProductInput: variables,
      },
    })
  }

  return (
    <form
      data-testid="edit-product-form"
      style={{ width: '100%' }}
      onSubmit={handleSubmit(handleFormSubmit)}
      id="edit-product-form"
    >
      <Flex flexDir={{ base: 'column-reverse', md: 'row' }} w="100%" gap="32px">
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
                thumbnailUrl={thumbnailUrl}
                // onFileAdded={() => {
                //   void generatePresignedUrls({
                //     variables: {
                //       productId,
                //       contentType: getValues('thumbnail')?.type,
                //     },
                //   })
                // }}
              />
            </CardBody>
          </Card>
          <Card variant="elevated" size="md" flex="fit-content">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Heading size="md">Product Details</Heading>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Flex flexDir="column" gap={4}>
                <Text fontSize="18px" fontWeight="600" color="#191919">
                  Categories
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {productCategories.map((category, index) => (
                    <Chip key={index} onClose={() => handleClose(category)} variant="shadow">
                      {category.name}
                    </Chip>
                  ))}
                </Flex>
                <Select
                  label="Categories"
                  placeholder="Select a category"
                  selectionMode="multiple"
                  className="max-w-xs"
                  selectedKeys={productCategories.map((category) => category.categoryId)}
                  onSelectionChange={(keys: SharedSelection) => {
                    const category = categories.find(
                      (category) => category.categoryId === keys.currentKey
                    )
                    if (category) {
                      setProductCategories([...productCategories, category])
                    }
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category.categoryId}
                      isDisabled={productCategories
                        .map((ele) => ele.categoryId)
                        .includes(category.categoryId)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
        <Flex flex="fit-content">
          <Card w="100%" p={{ base: 0, xl: '20px' }}>
            <CardHeader p={{ base: '8px', xl: '16px' }}>
              <Heading size="md" fontWeight="600">
                General
              </Heading>
            </CardHeader>
            <CardBody p={{ base: '8px', xl: '16px' }}>
              <Flex flexDir="column" gap="24px">
                <InputField
                  fieldName="title"
                  label="Full Name"
                  control={control}
                  error={errors['title'] as FieldError}
                  isRequired
                  value={title}
                  placeholder="Enter the name of the product"
                  withRoundBorders={false}
                />
                <TextAreaField
                  fieldName="description"
                  label="Description"
                  control={control}
                  error={errors['description'] as FieldError}
                  isRequired
                  value={description}
                  placeholder="Enter the description of the product"
                  maxLength={200}
                  showTextLength
                />
                <Heading size="md" fontWeight="600">
                  Pricing
                </Heading>
                <InputField
                  fieldName="price"
                  label={`Price (in ${INR_CURRENCY_SYMBOL})`}
                  control={control}
                  error={errors['price'] as FieldError}
                  isRequired
                  value={price.toString()}
                  placeholder="Enter the price of the product"
                  withRoundBorders={false}
                />
                <Flex flexDir="column">
                  <InputField
                    fieldName="quantity"
                    label="Quantity"
                    control={control}
                    error={errors['quantity'] as FieldError}
                    isRequired
                    value={quantity.toString()}
                    placeholder="Enter the quantity of the product"
                    withRoundBorders={false}
                  />
                </Flex>
                <ImageUploader register={register} setValue={setValue} />
              </Flex>
            </CardBody>
            <Divider />
            <CardFooter justify="end">
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
                  form="edit-product-form"
                >
                  Save Changes
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Flex>
      </Flex>
    </form>
  )
}
