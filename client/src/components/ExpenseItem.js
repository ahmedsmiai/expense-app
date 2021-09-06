import React from 'react'
import { ListGroupItem, Badge } from 'reactstrap'
import moment from 'moment'
function ExpenseItem({ item }) {
    return (
        <ListGroupItem>
            <div className="float-start">
                <span style={{ marginRight: 8 }}>{item.description ? item.description : 'No available description'}</span>
                <Badge className="bg-secondary">$ {item.amount}</Badge>
                <div className='text-muted'>
                    {moment(item.created).format('LL')}
                </div>
            </div>
            <div className="float-end">
            </div>
        </ListGroupItem>
    )
}

export { ExpenseItem }
