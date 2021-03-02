import React from 'react'
import "./Alert.css"
import CloseIcon from '@material-ui/icons/Close';

function alert({children, onSubmit}) {

    return (
        <div className="alert-component">
            <div className="faded" />
            <div className="card alert-box p-3">
                <form>
                    <button onClick={onSubmit} className="btn-close" type="button"><CloseIcon /></button>
                    {children}
                </form>
            </div>
        </div>
    )
}

export default alert
