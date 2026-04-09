import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import * as userActions from "../../../store/user/user.action"
import { renderWithProviders } from "../../../utils/test/test.utils"
import { AuthErrorCodes } from "firebase/auth"

import SignInForm from "../sign-in-form.component"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}))

describe("Sign In From Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("Should update input values on change", async () => {
    const user = userEvent.setup()
    const initialUser = null

    renderWithProviders(<SignInForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })

    const signInContainer = screen
      .getByRole("heading", { name: /already have an account/i })
      .closest("div")

    const inputElement = within(signInContainer).getByLabelText(/email/i)
    await user.type(inputElement, "signin@test.com")

    expect(inputElement.value).toBe("signin@test.com")
  })

  test("should dispatch emailSignInStart when form is submitted", async () => {
    const user = userEvent.setup()
    const initialUser = null

    renderWithProviders(<SignInForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })

    const emailSignInStartSpy = jest.spyOn(userActions, "emailSignInStart")

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: "Sign In" })

    // Use userEvent for more realistic simulation
    await user.type(emailInput, "test@example.com")
    await user.type(passwordInput, "password123")
    await user.click(submitButton)

    expect(emailSignInStartSpy).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    )
    expect(mockDispatch).toHaveBeenCalledWith(
      emailSignInStartSpy.mock.results[0].value
    )
  })

  test("should dispatch googleSignInStart when Google button is clicked", async () => {
    const user = userEvent.setup()
    const initialUser = null

    renderWithProviders(<SignInForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })

    const googleSignInStartSpy = jest.spyOn(userActions, "googleSignInStart")

    const googleButton = screen.getByRole("button", { name: /google sign in/i })

    await user.click(googleButton)

    expect(googleSignInStartSpy).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(
      googleSignInStartSpy.mock.results[0].value
    )
  })

  test("Should show an alert when the password is incorrect", async () => {
    const user = userEvent.setup()
    // Spy on window.alert
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {})

    // Mock dispatch to throw an error object with the Firebase Code
    mockDispatch.mockImplementationOnce(() => {
      const error = new Error("Firebase Error")
      error.code = AuthErrorCodes.INVALID_PASSWORD
      throw error
    })

    const initialUser = null

    renderWithProviders(<SignInForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: "Sign In" })

    await user.type(emailInput, "test@test.com")
    await user.type(passwordInput, "wrong-password")
    await user.click(submitButton)

    // Verify the catch block logic handled the constant correctly
    expect(alertSpy).toHaveBeenCalledWith("incorrect password for email")

    // Clean up the spy
    alertSpy.mockRestore()
  })
})
