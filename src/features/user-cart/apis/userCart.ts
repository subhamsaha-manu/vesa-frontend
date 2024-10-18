import gql from 'graphql-tag'

export const userCart = gql`
  query userCart {
    userCart {
      productId
      title
      price
      imageUrl
      quantity
    }
  }
`
