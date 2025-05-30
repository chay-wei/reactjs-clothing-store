import { useDispatch, useSelector } from "react-redux"

import { selectIsCartOpen, selectCartCount } from "../../store/cart/cart.selector"
import { setIsCartOpen } from "../../store/cart/cart.action"

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles"

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const cartIsOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!cartIsOpen))
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon></ShoppingIcon>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
