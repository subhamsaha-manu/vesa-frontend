export type UserWishlistCartContextType = {
  numberOfCartItems: number
  setNumberOfCartItems: (param: number) => void
  wishlistItems: Array<string>
  setWishlistItems: (param: Array<string>) => void
}
