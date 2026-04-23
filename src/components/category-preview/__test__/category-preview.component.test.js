import { screen } from "@testing-library/react"

import { renderWithProviders } from "../../../utils/test/test.utils"
import CategoryPreview from "../category-preview.component"

describe("Categories Preview tests", () => {
  const mockTitle = "jackets"
  const mockProducts = [
    { id: 1, name: "Item A", imageUrl: "test", price: 10 },
    { id: 2, name: "Item B", imageUrl: "test", price: 20 },
    { id: 3, name: "Item C", imageUrl: "test", price: 30 },
    { id: 4, name: "Item D", imageUrl: "test", price: 40 },
    { id: 5, name: "Item E", imageUrl: "test", price: 50 },
  ]

  test("Render the title correctly and uppercase", () => {
    renderWithProviders(
      <CategoryPreview title={mockTitle} products={mockProducts} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    )

    const titleElement = screen.getByText("JACKETS")
    expect(titleElement).toBeInTheDocument()
  })

  test("renders only the first 4 products", () => {
    renderWithProviders(
      <CategoryPreview title={mockTitle} products={mockProducts} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    )

    // Positive check: Verify the 4th item exists
    const titleD = screen.getByText("Item D")
    expect(titleD).toBeInTheDocument()

    // Negative check: Verify the 5th item does NOT exist
    const titleE = screen.queryByText("Item E")
    expect(titleE).not.toBeInTheDocument()
  })
})
