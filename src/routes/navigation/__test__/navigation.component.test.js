import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import * as userActions from "../../../store/user/user.action"

import Navigation from "../navigation.component"
import { renderWithProviders } from "../../../utils/test/test.utils"

const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}))

describe("Navigation tests", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("It should render a Sign In link and not a Sign out link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    })

    const signInLinkElement = screen.getByText(/sign in/i)
    expect(signInLinkElement).toBeInTheDocument()

    const signOutLinkElement = screen.queryByText(/sign out/i)
    expect(signOutLinkElement).not.toBeInTheDocument()
  })

  test("It should render Sign Out link and not Sign in link if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    })

    const signOutLinkElement = screen.getByText(/sign out/i)
    expect(signOutLinkElement).toBeInTheDocument()

    const signInLinkElement = screen.queryByText(/sign in/i)
    expect(signInLinkElement).not.toBeInTheDocument()
  })

  test("It should render cart dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    })

    expect(
      screen.getByRole("button", { name: /go to checkout/i })
    ).toBeInTheDocument()
  })

  test("It should dispatch SignOutStart action when clicking on the Sign Out link", async () => {
    // jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch)
    // jest.spyOn attempts to modify the reactRedux object. However, modern JavaScript modules often mark their exports as read-only.

    const signOutStartSpy = jest.spyOn(userActions, "signOutStart")
    // console.log("signOutStartSpy", signOutStartSpy)

    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: { id: 1, email: "test@test.com" },
        },
      },
    })

    const signOutLinkElement = screen.getByText(/sign out/i)
    expect(signOutLinkElement).toBeInTheDocument()

    await userEvent.click(signOutLinkElement)
    // expect(mockDispatch).toHaveBeenCalled()
    expect(signOutStartSpy).toHaveBeenCalled()
    // console.log(signOutStartSpy.mock.results[0].value)

    // const signOutAction = signOutStart()
    // expect(mockDispatch).toHaveBeenCalledWith(signOutAction)
    expect(mockDispatch).toHaveBeenCalledWith(
      signOutStartSpy.mock.results[0].value
    )
  })
})
