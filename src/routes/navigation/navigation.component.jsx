import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwLogo } from "../../assets/crown.svg"

import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.scss"

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
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
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
