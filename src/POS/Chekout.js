import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pos/checkout.css'

const Chekout = ({ cart, onTotalPrice, ticketNum, onChangeTktNum }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [isChecked, setIsChecked] = useState(false);


    const ticketNumInput = (e) => {
        setIsChecked(true)
        onChangeTktNum(e.target.value)
    }

    const getTotal = () => {
        let allPrices = [];
        cart?.map((products) =>
            allPrices.push(products.item.price * products.qty)
        )
        setTotalPrice(allPrices.reduce((a, b) => a + b, 0) + ticketNum * 10)

        onTotalPrice(totalPrice, ticketNum)
    }

    useEffect(() => {
        getTotal()
    }, [cart, totalPrice])


    return (
        <div>
            <div className='checkout_form'>
                <label className="chekcout_label">Number of Tickets :
                    <input value={ticketNum} id='tktNum' onChange={(e) => ticketNumInput(e)} className="checkout_ticket-num" type="number" />
                </label>
            </div>
            <div className='cart-recep-item'>
                {cart?.map((products, index) => (
                    <p key={index} >{products.qty}x {products.item.name} </p>
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