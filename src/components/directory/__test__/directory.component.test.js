import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import Directory from "../directory.component"

describe("Directory tests", () => {
  test("render all 5 default category items", () => {
    render(
      <BrowserRouter>
        <Directory />
      </BrowserRouter>
    )

    const categoryFirst = screen.getByText("hats")
    expect(categoryFirst).toBeInTheDocument()

    const categoryFifth = screen.getByText("mens")
    expect(categoryFifth).toBeInTheDocument()

    const shopNows = screen.getAllByText(/shop now/i)
    expect(shopNows.length).toBe(5)
  })
})
