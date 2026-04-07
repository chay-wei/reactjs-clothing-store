import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthErrorCodes } from "firebase/auth"

import * as userActions from "../../../store/user/user.action"
import { renderWithProviders } from "../../../utils/test/test.utils"
import SignUpForm from "../sign-up-form.component"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}))

describe("Sign Up Form Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("should alert if password do not match and NOT dispatch signUpStart", async () => {
    const user = userEvent.setup()
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {})
    const signUpStartSpy = jest.spyOn(userActions, "signUpStart")

    const initialUser = null

    renderWithProviders(<SignUpForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })
    const signUpContainer = screen
      .getByRole("heading", { name: /don't have an account/i })
      .closest("div")

    const displayNameElement =
      within(signUpContainer).getByLabelText(/display name/i)
    await user.type(displayNameElement, "Test name")

    const emailElement = within(signUpContainer).getByLabelText(/email/i)
    await user.type(emailElement, "test@test.com")

    const passwordElement = within(signUpContainer).getByLabelText("Password")
    await user.type(passwordElement, "password123")

    const passwordConfirmedElement =
      within(signUpContainer).getByLabelText(/confirm password/i)
    await user.type(passwordConfirmedElement, "different123")

    const submitElement = within(signUpContainer).getByRole("button")
    await user.click(submitElement)

    expect(alertSpy).toHaveBeenCalledWith("passwords do not match")
    expect(mockDispatch).not.toHaveBeenCalled()
    expect(signUpStartSpy).not.toHaveBeenCalled()

    alertSpy.mockRestore()
  })

  test("should dispatch signUpStart with correct data when passwords match", async () => {
    const user = userEvent.setup()
    const signUpStartSpy = jest.spyOn(userActions, "signUpStart")

    const initialUser = null

    renderWithProviders(<SignUpForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })

    const signUpContainer = screen
      .getByRole("heading", { name: /don't have an account/i })
      .closest("div")

    const displayNameElement =
      within(signUpContainer).getByLabelText(/display name/i)
    await user.type(displayNameElement, "Test name")

    const emailElement = within(signUpContainer).getByLabelText(/email/i)
    await user.type(emailElement, "test@test.com")

    const passwordElement = within(signUpContainer).getByLabelText("Password")
    await user.type(passwordElement, "password123")

    const passwordConfirmedElement =
      within(signUpContainer).getByLabelText(/confirm password/i)
    await user.type(passwordConfirmedElement, "password123")

    const submitElement = within(signUpContainer).getByRole("button")
    await user.click(submitElement)

    expect(signUpStartSpy).toHaveBeenCalledWith(
      "test@test.com",
      "password123",
      "Test name"
    )

    expect(mockDispatch).toHaveBeenCalledWith(
      mockDispatch.mock.results[0].value
    )
  })

  test("should alert 'email already in use' when Firebase returns EMAIL_EXISTS", async () => {
    const user = userEvent.setup()
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {})

    mockDispatch.mockImplementationOnce(() => {
      const error = new Error("Firebase error")
      error.code = AuthErrorCodes.EMAIL_EXISTS
      throw error
    })

    const initialUser = null

    renderWithProviders(<SignUpForm />, {
      preloadedState: {
        user: {
          currentUser: initialUser,
        },
      },
    })

    const signUpContainer = screen
      .getByRole("heading", { name: /don't have an account/i })
      .closest("div")

    const submitElement = within(signUpContainer).getByRole("button")
    await user.click(submitElement)

    expect(alertSpy).toHaveBeenCalledWith(
      "Cannot create user, email already in use"
    )

    alertSpy.mockRestore()
  })
})
