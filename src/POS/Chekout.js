import { useEffect, useState } from 'react';
import '../styles/pos/checkout.css'

const Chekout = ({ cart, onTotalPrice, ticketNum, onChangeTktNum }) => {
    const [totalPrice, setTotalPrice] = useState();
    const isChecked = true

    const ticketNumInput = (e) => {
        onChangeTktNum(e.target.value)
    }


    const getTotal = () => {
        let allPrices = [];
        if (isChecked) {
            cart?.map((products) =>
                allPrices.push(products.item.price * products.qty)
            )
            setTotalPrice(allPrices.reduce((a, b) => a + b, 0) + (ticketNum * 10))

        } else {
            cart?.map((products) =>
                allPrices.push(products.item.price * products.qty)
            )
            setTotalPrice(allPrices.reduce((a, b) => a + b, 0))

        }
        onTotalPrice(totalPrice, ticketNum)



    }
    useEffect(() => {
        getTotal()
    })
    return (
        <div>
            <form className='checkout_form'>
                <label className="chekcout_label">Number of Tickets :
                    <input value={ticketNum} id='tktNum' onChange={(e) => ticketNumInput(e)} className="checkout_ticket-num" type="number" />
                </label>
            </form>
            <div className='cart-recep-item'>
                {cart?.map((products) => (
                    <p >{products.qty}x {products.item.name} </p>
                ))}
                <p>{ticketNum > 0 ?
                    ticketNum > 1 ? `${ticketNum}x tickets ${ticketNum * 10}` : `${ticketNum}x ticket ${ticketNum * 10}`
                    : ""}</p>
            </div>

            <div className='checkout_total-price'>
                Total : {totalPrice} L.E
            </div>
        </div>
    )
}

export default Chekout