import { FC, memo } from "react"

import { useDispatch, useSelector } from "react-redux"

import { selectCartItems } from "../../store/cart/cart.selector"
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action"

import {
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles"

import { CartItem } from "../../store/cart/cart.types"

type CheckoutItemProps = {
  cartItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem))
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan className="name"> {name} </BaseSpan>
      <Quantity className="quantity">
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan className="price"> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
})

export default CheckoutItem
