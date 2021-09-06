import React from 'react'
import moment from 'moment'

const MONTHS = moment.months()

function MonthSelector(props) {
    const { onSelectMonth } = props

    function handleChange(e) {
        var selected = e.target.value
        onSelectMonth(selected)
    }
    return (
        <div style={{ marginBottom: 20 }}>
            <span>Select month </span>
            <select value={props.selected} onChange={handleChange}>
                {MONTHS.map((month, index) => {
                    return (<option value={index} key={index}> {month} </option>)
                }
                )}

            </select>
        </div>
    )
}

export { MonthSelector }