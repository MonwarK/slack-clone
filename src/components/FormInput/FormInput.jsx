import React from 'react'

function FormInput({inputType, placeholder, ...otherProps}) {
    return (
        <input className="form-control my-3" {...otherProps} type={inputType} placeholder={placeholder}/>
    )
}

export default FormInput
