import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { useProductsQuery } from '../apis/products.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { ProductTile } from './ProductTile'
import { motion } from 'framer-motion'

type CatalogueProps = {
  categoryIds?: Array<string>
}

export const Catalogue: FC<CatalogueProps> = ({ categoryIds }) => {
  const { data, loading } = useProductsQuery({
    variables: {
      productFilter: {
        categoryIds,
      },
      pageNumber: 0,
      pageSize: 100,
    },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  // Define motion variants for animation on scroll
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Flex display-name="products-dashboard-flex" w="100%" h="auto" flexDir="column">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        {data.products.products.map((product) => (
          <ProductTile product={product} key={product.id} />
        ))}
      </motion.div>
    </Flex>
  )
}
