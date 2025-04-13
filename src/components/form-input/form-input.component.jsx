import "./form-input.styles.scss"

const FormInput = ({ label, otherProps }) => {
  return (
    <div className="group">
      {label && <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>{label}</label>}
      <input {...otherProps} className="form-input" />
    </div>
  )
}

export default FormInput
