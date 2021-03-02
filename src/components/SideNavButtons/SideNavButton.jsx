import React from 'react'
import "./SideNavButton.css"

function SideNavButton({children, link}) {
    return (
        <button className="btn-sidenav my-1" onClick={link}>
            {children}
        </button>
    )
}

export default SideNavButton
