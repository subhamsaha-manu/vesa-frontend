export type UserCartContextType = {
  numberOfCartItems: number
  setNumberOfCartItems: (param: number) => void
  wishlistItems: Array<string>
  setWishlistItems: (param: Array<string>) => void
}
