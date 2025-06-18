import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { signOutStart } from "../../store/user/user.action"

import { ReactComponent as CrwLogo } from "../../assets/logo.svg"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  NavCTA,
} from "./navigation.styles"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch()

  const signOutHandler = () => dispatch(signOutStart())

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavCTA onClick={signOutHandler}>SIGN OUT</NavCTA>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
