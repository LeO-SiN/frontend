import React from 'react'

const Alert = (props) => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"></svg>
            <div>
                {props.message}
            </div>
        </div>
    )
}

export default Alert