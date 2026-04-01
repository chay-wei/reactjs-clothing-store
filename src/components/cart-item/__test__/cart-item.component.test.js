import { render, screen } from "@testing-library/react"

import CartItem from "../cart-item.component"

describe("Cart Item Tests", () => {
  test("Render cart item details correctly", () => {
    const mockCartItems = [
      { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 },
    ]

    render(<CartItem cartItem={mockCartItems[0]} />)
    const nameElement = screen.getByText("Item A")
    expect(nameElement).toBeInTheDocument()

    const priceElement = screen.getByText(/1 x \$10/)
    expect(priceElement).toBeInTheDocument()
  })
})
