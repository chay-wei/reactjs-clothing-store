import { InputHTMLAttributes, FC } from "react"

import { FormInputLable, Input, Group } from "./form-input.styles"

type FormInputProps = {
  label: string
  otherProps: InputHTMLAttributes<HTMLInputElement>
}

const FormInput: FC<FormInputProps> = ({ label, otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLable
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
