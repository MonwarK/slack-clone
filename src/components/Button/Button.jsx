import React from 'react'

function Button({children, btnColour, btnSize, ...otherProps}) {
    return (
        <button {...otherProps} className={`btn my-2 ${btnColour} ${btnSize}`}>{children}</button>
    )
}

export default Button
