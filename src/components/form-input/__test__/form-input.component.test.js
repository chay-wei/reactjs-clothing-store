import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import FormInput from "../form-input.component"

describe("Form Input Tests", () => {
  const mockProps = {
    label: "Email",
    otherProps: {
      onChange: jest.fn(),
      value: "",
      name: "email",
    },
  }

  test("Should render the label text correctly", () => {
    render(<FormInput {...mockProps} />)

    const labelElement = screen.getByText("Email")
    expect(labelElement).toBeInTheDocument()
  })

  test("Should NOT have shrink styles when value is empty and not focused", () => {
    render(<FormInput {...mockProps} />)

    const labelElement = screen.getByText("Email")
    expect(labelElement).toHaveStyle("font-size: 16px")
  })

  test("Should apply shrink styles when value is present", () => {
    const mockPropsWithValue = {
      ...mockProps,
      otherProps: {
        ...mockProps.otherProps,
        value: "test@test.com",
      },
    }

    render(<FormInput {...mockPropsWithValue} />)

    const labelElement = screen.getByText("Email")
    expect(labelElement).toHaveStyle("font-size: 12px")
  })

  test("should call onChange when user types", async () => {
    const user = userEvent.setup()

    render(<FormInput {...mockProps} />)

    const inputElement = screen.getByRole("textbox")
    await user.type(inputElement, "new value")

    expect(mockProps.otherProps.onChange).toHaveBeenCalled()
  })
})
