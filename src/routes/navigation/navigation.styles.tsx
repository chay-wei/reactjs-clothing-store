import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 10px 20px;

  @media screen and (max-width: 767px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`

export const LogoContainer = styled(Link)`
  width: 100px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 50px;
    padding: 0;
  }
`

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 767px) {
    width: 80%;
  }
`

const navStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`

export const NavLink = styled(Link)`
  ${navStyles}
`

export const NavCTA = styled.div`
  ${navStyles}
`
