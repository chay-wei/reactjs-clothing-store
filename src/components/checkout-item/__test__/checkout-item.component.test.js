import { screen } from "@testing-library/react"

import CheckoutItem from "../checkout-item.component"
import { renderWithProviders } from "../../../utils/test/test.utils"

describe("Checkout Item tests", () => {
  test("Render checkout items correctly", () => {
    const mockCartItems = [
      { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 },
    ]

    renderWithProviders(<CheckoutItem cartItem={mockCartItems[0]} />, {
      preloadedState: {
        cart: {
          cartItems: [],
        },
      },
    })

    const title = screen.getByText("Item A")
    expect(title).toBeInTheDocument()
  })
})
