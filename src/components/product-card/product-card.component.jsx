import { useContext } from "react"

import { CartContext } from "../../contexts/cart.context"

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"

import { ProductCartContainer, Footer } from "./product-card.styles"

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product)

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  )
}

export default ProductCard
