import styled, { css } from "styled-components"

import { SpinnerContainer } from "../spinner/spinner.styles"

import { BUTTON_VARIANT } from "./button.component"

const baseButtonStyles = css`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  text-transform: uppercase;
  font-family: "Open Sans";
  font-weight: bolder;
  font-size: 15px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const googleStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`

const invertedStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`

const getButtonStyles = (variant = BUTTON_VARIANT.base) => {
  switch (variant) {
    case BUTTON_VARIANT.google:
      return googleStyles
    case BUTTON_VARIANT.inverted:
      return invertedStyles

    default:
      return css`
        background-color: black;
        color: white;

        &:hover {
          background-color: white;
          color: black;
          border: 1px solid black;
        }
      `
  }
}

export const StyledButton = styled.button<{ variant?: BUTTON_VARIANT }>`
  ${baseButtonStyles}
  ${({ variant }) => getButtonStyles(variant)}
`

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`
