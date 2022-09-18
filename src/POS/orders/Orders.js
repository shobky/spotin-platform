import React, { Suspense, useState } from 'react'
import Nav from '../Nav'
import OrdersHeader from './OrdersHeader'
import './orders.css'
import Loading from '../../components/loadingAnimaitno/Loading'
const ShowOrders = React.lazy(() => import('./ShowOrders'))
const Receipt = React.lazy(() => import('./Receipt'))

// import ShowOrders from './ShowOrders'
// import Receipt from './Receipt'


const Orders = () => {
  const [order, setOrder] = useState({})
  const [open, setOpen] = useState(false)

  const onOpenOrder = (order) => {
    setOrder(order)
    setOpen(!open)
  }
  return (
    <div>
      {
        !open ?
          <div className='orders'>
            <Nav />

            <div className='orders-content'>
              <OrdersHeader />
              <Suspense fallback={<Loading />}>
                <ShowOrders onOpenOrder={onOpenOrder} />
              </Suspense>

            </div>
          </div>

          : <Suspense fallback={<Loading />}>
            <Receipt onOpenOrder={onOpenOrder} order={order} />
          </Suspense>

      }
    </div>

  )
}

export default Orders