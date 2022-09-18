import React from 'react'
import { IoBagCheckOutline } from 'react-icons/io5'

import { RiDeleteBin7Fill } from 'react-icons/ri'

const SingleOrder = ({ order, onOpenOrder }) => {
    const handleOpenOrder = () => {
        onOpenOrder(order)
    }


    return (
        <div className='grid-header'>
            <p className='grid-bold-mobile grid-item grid-bold'>{order?.id.slice(-3)}</p>
            <p className='grid-space grid-item'> {order?.time[0]}:{order?.time[1]}"{order?.date}</p>
            <p className='grid-space grid-item grid-bold grid-orde-name'>{order?.user.name.length > 0 ? order?.user.name : "anonymos"}</p>
            <p className='grid-space grid-item grid-item-hidded'>{`${order?.cart[0]?.qty ?? 0}x ${order?.cart[0]?.item?.name ?? "none"} ${order?.cart[0]?.item?.price ?? 0} ...`}</p>
            <p className='grid-item grid-item-hidded'>X{order?.TiketSold}</p>
            <p className='hide-cost grid-item grid-bold'>{order?.totalPrice}L.e</p>
            <p onClick={handleOpenOrder} className='grid-item'>
                {
                    order.status === "open" ?
                        <IoBagCheckOutline className='grid-open-icon' />
                        : order.status === "closed" ? <RiDeleteBin7Fill className='grid-open-icon-delete' /> : order?.status === "deleted" ? "" : ""
                }
            </p>

        </div>

    )
}

export default SingleOrder