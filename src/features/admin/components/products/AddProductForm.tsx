import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chip, Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { FC, useState } from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'

import { ImageUploader } from './ImageUploader'

import { useAddProductMutation } from '../../apis/addProduct.generated'
import { useGeneratePresignedUrlsMutation } from '../../apis/generatePresignedUrls.generated'
import { allProductsForAdmin } from '../../apis/products'
import { uploadFileToS3 } from '../../apis/uploadFileToS3'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { InputField, TextAreaField, ThumbnailUpload } from '@/components/form'
import { extractImageUUID } from '@/features/admin/utils/extractImageUUID'
import { AddProductInput, Category, GenerateUrlFor, MediaFileInput, ProductStatus } from '@/types'
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
  status: z.any().optional(),
})

type CategoryType = Pick<Category, 'categoryId' | 'name'>

type AddContainerFormProps = {
  categories: Array<CategoryType>
}

export const AddProductForm: FC<AddContainerFormProps> = ({ categories }) => {
  const navigate = useNavigate()

  const productId = uuidv4()

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

  const [productCategories, setProductCategories] = useState<Array<CategoryType>>([])
  const [productStatus, setProductStatus] = useState<ProductStatus>(ProductStatus.Draft)

  const handleClose = (categoryToRemove: CategoryType) => {
    setProductCategories(
      productCategories.filter((category) => category.categoryId !== categoryToRemove.categoryId)
    )
  }

  const toast = useToast()

  const goBackToProducts = () => {
    navigate('/admin/products')
  }

  const [addProduct, { loading }] = useAddProductMutation({
    onCompleted: () => {
      toast({
        title: 'Product added successfully',
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

  const productStatusOptions = Object.entries(ProductStatus).filter((e) => e[0] !== 'All')

  const handleFormSubmit = (values: FieldValues) => {
    const { title, description, price, quantity, medias, thumbnail } = values

    const thumbnailFileType = thumbnail?.type
    const mediaFileTypes = medias ? Array.from(medias).map((file) => (file as File).type) : []
    let mediaFilesInput: Array<MediaFileInput> = []

    generatePresignedUrls({
      variables: {
        generatePresignedUrlsInput: {
          generateUrlFor: GenerateUrlFor.Product,
          id: productId,
          thumbnailFileType,
          mediaFileTypes,
        },
      },
    }).then((data) => {
      if (data.data?.generatePresignedUrls) {
        const { mediaUrls, thumbnailUrl } = data.data.generatePresignedUrls

        const mediaFileIds = mediaUrls.map((url) => extractImageUUID(url))

        mediaFilesInput = mediaFileIds.map((id, index) => ({
          uuid: id,
          fileType: mediaFileTypes[index],
        }))

        void uploadFileToS3(thumbnail as File, thumbnailUrl)

        if (medias) {
          Array.from(medias).forEach((file, index) => {
            void uploadFileToS3(file as File, mediaUrls[index])
          })
        }

        const variables: AddProductInput = {
          productId,
          title,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          categoryIds: productCategories.map((category) => category.categoryId),
          thumbnailFileType,
          mediaFiles: mediaFilesInput,
          status: productStatus,
        }

        void addProduct({
          variables: {
            addProductInput: variables,
          },
        })
      }
    })
  }

  return (
    <form
      data-testid="add-product-form"
      style={{ width: '100%' }}
      onSubmit={handleSubmit(handleFormSubmit)}
      id="add-product-form"
    >
      <Flex
        flexDir={{ base: 'column', xl: 'row' }}
        w="100%"
        gap="32px"
        data-testid="add-product-form-flex"
      >
        <Flex flexDir="column" w={{ base: '100%', xl: '20%' }} gap="24px">
          <Card variant="elevated" size="md" p="20px">
            <CardHeader>
              <Heading size="md">Thumbnail</Heading>
            </CardHeader>
            <CardBody
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
              />

              <Text fontSize="sm" color="gray.500">
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are
                accepted
              </Text>
            </CardBody>
          </Card>
          <Card variant="elevated" size="md" p="20px" data-testid="product-status-card">
            <CardHeader>
              <Heading size="md">Status</Heading>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <Select
                placeholder="Select product status"
                selectionMode="single"
                className="max-w-xs"
                selectedKeys={[productStatus]}
                onSelectionChange={(keys: SharedSelection) => {
                  setProductStatus(keys.currentKey as ProductStatus)
                }}
              >
                {productStatusOptions.map(([key, status]) => (
                  <SelectItem key={status}>{key}</SelectItem>
                ))}
              </Select>
            </CardBody>
          </Card>
          <Card variant="elevated" size="md" flex="fit-content" p="20px">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Heading size="md">Product Details</Heading>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Flex flexDir="column" gap={8}>
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
                    fieldName="title"
                    label="Product Name"
                    control={control}
                    error={errors['title'] as FieldError}
                    isRequired
                    placeholder="Enter the name of the product"
                    withRoundBorders={false}
                  />
                  <TextAreaField
                    fieldName="description"
                    label="Description"
                    control={control}
                    error={errors['description'] as FieldError}
                    isRequired
                    placeholder="Enter the description of the product"
                    maxLength={200}
                    showTextLength
                  />
                </Flex>
              </CardBody>
            </Card>
          </Flex>
          <Flex flex="fit-content" display-name="media-section">
            <Card w="100%" p={{ base: 0, xl: '20px' }}>
              <CardHeader p={{ base: '8px', xl: '16px' }}>
                <Heading size="md" fontWeight="600">
                  Media
                </Heading>
              </CardHeader>
              <CardBody p={{ base: '8px', xl: '16px' }}>
                <Flex flexDir="column" gap="8px">
                  <ImageUploader register={register} setValue={setValue} />
                  <Text fontSize="sm" color="gray.500">
                    Set the product media gallery.
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Flex>
          <Flex flex="fit-content" display-name="pricing-section">
            <Card w="100%" p={{ base: 0, xl: '20px' }}>
              <CardHeader p={{ base: '8px', xl: '16px' }}>
                <Heading size="md" fontWeight="600">
                  Pricing
                </Heading>
              </CardHeader>
              <CardBody p={{ base: '8px', xl: '16px' }}>
                <Flex flexDir="column" gap="24px">
                  <InputField
                    fieldName="price"
                    label={`Price (in ${INR_CURRENCY_SYMBOL})`}
                    control={control}
                    error={errors['price'] as FieldError}
                    isRequired
                    placeholder="Enter the price of the product"
                    withRoundBorders={false}
                  />
                  <InputField
                    fieldName="quantity"
                    label="Quantity"
                    control={control}
                    error={errors['quantity'] as FieldError}
                    isRequired
                    placeholder="Enter the quantity of the product"
                    withRoundBorders={false}
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
                form="add-product-form"
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
