import React from 'react'
import "./SideNavButton.css"

function SideNavButton({children}) {
    return (
        <button className="btn-sidenav my-1">
            {children}
        </button>
    )
}

export default SideNavButton
