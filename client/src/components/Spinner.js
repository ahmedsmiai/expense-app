import React from 'react'

function Spinner({ size }) {
    let spinnerSize = size ? size : 30
    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
            }}>
            <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{ fontSize: spinnerSize }}></i>
        </div>
    )
}

export { Spinner }
