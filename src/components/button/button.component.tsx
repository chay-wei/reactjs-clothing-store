import { FC, ButtonHTMLAttributes } from "react"

import { StyledButton, ButtonSpinner } from "./button.styles"

export enum BUTTON_VARIANT {
  base = "base",
  google = "google",
  inverted = "inverted",
}

export type ButtonProps = {
  variant?: BUTTON_VARIANT
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
  children,
  variant,
  isLoading = false,
  ...otherProps
}) => {
  return (
    <StyledButton variant={variant} disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </StyledButton>
  )
}

export default Button
