import { screen } from "@testing-library/react"

import CartDropdown from "../cart-dropdown.component"
import { renderWithProviders } from "../../../utils/test/test.utils"

describe("Cart Dropdown tests", () => {
  test("Uses preloaded state to render", () => {
    const initialCartItems = [
      { id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 1 },
    ]

    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    })

    const CartLogo = screen.getByText("Item A")
    expect(CartLogo).toBeInTheDocument()
  })
})
