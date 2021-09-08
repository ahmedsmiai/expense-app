import React from 'react'
import { ListGroupItem, Badge, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
function ExpenseItem({ item, onDelete }) {
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
                <Link to={{
                    pathname: '/edit',
                    state: { item } 
                }}
                className='btn btn-secondary btn-sm'>
                    Edit
                </Link>
                &nbsp;
                <Button className='btn btn-danger btn-sm' onClick={onDelete} data-id={item._id}>
                    Delete
                </Button>
            </div>
        </ListGroupItem>
    )
}

export { ExpenseItem }
