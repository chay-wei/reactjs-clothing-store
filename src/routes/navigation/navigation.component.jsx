import { useContext, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwLogo } from "../../assets/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"

import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.scss"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)
  // console.log(currentUser)
  const signOutHandler = async (params) => {
    await signOutUser()
  }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
