import { collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IoBagCheckOutline } from 'react-icons/io5'
import { db } from '../../firebase/Config'
import SingleOrder from './SingleOrder'
import { ImSad } from 'react-icons/im'
import Loading from '../../components/loadingAnimaitno/Loading'
import { RiDeleteBin7Fill } from 'react-icons/ri'
const ShowOrders = ({ onOpenOrder }) => {
    const [orderStatus, setOrderStatus] = useState('open-orders')

    const query = collection(db, orderStatus)
    const [orders, ordersLoading] = useCollectionData(query)

    const [revenue, setRevenue] = useState(0)

    const handleRevenue = () => {

        const orderPrices = []

        orders?.map((order) =>
            orderPrices.push(order.totalPrice)
        )
        setRevenue(orderPrices.reduce((a, b) => a + b, 0))
    }
    useEffect(() => {
        handleRevenue()
    },[orders])

    return (
        <div>
            <ul className='show-order_nav'>
                <li id="open" className={`show-order_nav-btn ${orderStatus === "open-orders" ? "currentTab" : ""}`} onClick={() => setOrderStatus("open-orders")}>Open</li>
                <li id="colsed" className={`show-order_nav-btn ${orderStatus === "closed-orders" ? "currentTab" : ""}`} onClick={() => setOrderStatus("closed-orders")}>Closed</li>
                <li id="deleted" className={`show-order_nav-btn ${orderStatus === "deleted-orders" ? "currentTab" : ""}`} onClick={() => setOrderStatus("deleted-orders")}>Deleted</li>
                <span className='show-order_nav-number'>{orders?.length}</span>
                <span className='show-order_nav-total'>{revenue} L.E</span>

            </ul>
            <div className='show-order-grid show-order-titles'>
                <div className='grid-header'>
                    <p className=' grid-bold-mobile grid-item grid-item-title'>ID</p>
                    <p className=' grid-bold-mobile  grid-space grid-item grid-item-title'>Date</p>
                    <p className=' grid-bold-mobile  grid-space grid-item grid-item-title'>Name</p>
                    <p className=' grid-bold-mobile  grid-space grid-item grid-item-hidded grid-item-title'>Items</p>
                    <p className=' grid-bold-mobile  grid-item grid-item-title grid-item-hidded'>Tickets</p>
                    <p className=' grid-bold-mobile   hide-cost grid-item grid-item-title'>Cost</p>
                    <p className=' grid-bold-mobile  grid-item grid-item-title'>
                        {
                            orderStatus === "open-orders" ?
                                <IoBagCheckOutline className='grid-open-icon' />
                                : orderStatus === "closed-orders" ? <RiDeleteBin7Fill className='grid-open-icon-delete' /> : ""
                        }
                    </p>


                </div>
                <div >
                    {
                        ordersLoading && <Loading className="ordersLoading" />
                    }
                    {
                        orders?.length > 0 ? orders?.map((order, index) =>

                            <SingleOrder onOpenOrder={onOpenOrder} key={index} order={order} />
                        ) : <div className='no_orders-msg'>
                            <p className='text'>No orders at the moment</p>
                            <ImSad className='icon' />
                        </div>

                    }
                </div>
            </div>

        </div>
    )
}

export default ShowOrders