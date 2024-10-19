import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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

import { allProductsForAdmin } from '../../apis/products'
import { useUpdateProductMutation } from '../../apis/updateProduct.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { InputField, TextAreaField } from '@/components/form'
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
  quantity: z.number().min(1).max(50),
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
    control,
    setValue,
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

  useEffect(() => {
    setProductCategories(
      categoryIds.map((categoryId) => {
        const category = categories.find((category) => category.categoryId === categoryId)
        return category as CategoryType
      })
    )
  }, [categories, categoryIds, productDetail])

  console.info({ errors })

  const handleFormSubmit = (values: FieldValues) => {
    console.info({ values })
    const { title, description, price, quantity } = values
    const variables: UpdateProductInput = {
      title,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      categoryIds: productCategories.map((category) => category.categoryId),
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
            <CardBody style={{ display: 'flex', justifyContent: 'center' }}>
              <Flex
                boxShadow="#00000013 0px 6.5px 19.5px 6.5px"
                borderRadius="8px"
                border="3px solid white"
                height="200px"
                width="200px"
                backgroundImage={`url(${thumbnailUrl})`}
                padding={0}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                justifyContent="center"
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
                  <FormLabel>
                    <Flex display-name="field-wrapper-form-label-flex" align="center" gap={1}>
                      <Flex display-name="field-wrapper-label">
                        <Text fontSize="14px" fontWeight="500" color="#191919">
                          Quantity
                        </Text>
                      </Flex>
                      <Flex display-name="field-wrapper-required-indicator" color="red">
                        *
                      </Flex>
                    </Flex>
                  </FormLabel>
                  <NumberInput
                    defaultValue={quantity}
                    onChange={(_, valueAsNumber) => {
                      setValue('quantity', valueAsNumber)
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
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
                  isDisabled={loading}
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
