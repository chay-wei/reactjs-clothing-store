import { useSelector } from "react-redux"

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import PaymentFrom from "../../components/payment-form/payment-form.component"

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles"

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>TOTAL: ${cartTotal}</Total>
      <PaymentFrom />
    </CheckoutContainer>
  )
}

export default Checkout
