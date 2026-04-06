import { InputHTMLAttributes, FC } from "react"

import { FormInputLable, Input, Group } from "./form-input.styles"

type FormInputProps = {
  label: string
  otherProps: InputHTMLAttributes<HTMLInputElement>
}

const FormInput: FC<FormInputProps> = ({ label, otherProps }) => {
  const inputID = otherProps.id || otherProps.name

  return (
    <Group>
      <Input id={inputID} {...otherProps} />
      {label && (
        <FormInputLable
          htmlFor={inputID}
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        >
          {label}
        </FormInputLable>
      )}
    </Group>
  )
}

export default FormInput
