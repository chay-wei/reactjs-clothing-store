import { FC, memo } from "react"

import { CartItemContainer, ItemDetails } from "./cart-item.styles"

import { CartItem as TCartItem } from "../../store/cart/cart.types"

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  )
})

export default CartItem
