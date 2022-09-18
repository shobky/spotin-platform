import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase/Config"
import { collection } from 'firebase/firestore';
import { doc, setDoc, deleteDoc } from "@firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import CartItem from './CartItem';
import '../../styles/pos/cart.css'
import Chekout from '../Chekout';
import { useEffect, useState } from 'react';
import User from '../selectUsers/User';
import '../../styles/pos/cart.css'
import emptyCart from '../../assets/imgs/empty-cart.png'
import { MdDelete } from 'react-icons/md';
import '../../components/placementAnimation/orderAni.css'

const Cart = ({ isItemRemoved, onChoosingState, Choosing, showCart, startAnimation }) => {
    const { orderTaker, onSelectedUser, cartId } = useAuth()
    const query = collection(db, `carts/cart${cartId}/Products`)
    const [cart, loading] = useCollectionData(query)
    const orderQue = collection(db, `open-orders`)
    const [openOrders, orderLoadign] = useCollectionData(orderQue)
    const closedOrderQ = collection(db, `closed-orders`)
    const [ClosedOrders] = useCollectionData(closedOrderQ)
    const [date, setDate] = useState('')
    const [time, setTime] = useState([])
    const [fullDate, setFullDate] = useState('')
    const [totalPrice, setTotalPrice] = useState()
    const [tkts, setTkts] = useState()
    const [ticketNum, setTicketNum] = useState(0)
    const [loadingOrder, setLoadingOrder] = useState(false)
    const [orderId, setOrderId] = useState(`order #1`)
    const [orderName, setOrderName] = useState("")

    // const [orderStatus, setOrderStatus] = useState(false)


    useEffect(() => {
        const createOrderId = () => {
            if (!orderLoadign) {
                setOrderId(`Order #${(openOrders?.length + 1) + (ClosedOrders?.length > 0 ? ClosedOrders?.length + 1 : ClosedOrders?.length)}`)
            }
        }
        createOrderId()
    }, [loadingOrder, orderLoadign])



    useEffect(() => {
        const getFullDate = () => {
            const currentdate = new Date();
            let fullDate = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + (currentdate.getFullYear()) + '-'
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ':'
                + currentdate.getSeconds()
            setFullDate(fullDate)
        }
        const getdate = () => {
            const currentdate = new Date();
            let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1)
            setDate(datetime)
        }

        const getTime = () => {
            const currentdate = new Date();
            let time =
                [currentdate.getHours(),
                currentdate.getMinutes()]
            setTime(time)

        }
        getTime()
        getdate()
        getFullDate()
    }, [])

    const onChangeTktNum = (num) => {
        setTicketNum(num)
    }

    const getOrderName = (name) => {
        setOrderName(name)
    }

    const clearCart = () => {
        cart?.map(async (cartItem) => {
            await deleteDoc(doc(db, `carts/cart${cartId}/Products/${cartItem.item.name}`));
        })
        setTicketNum(0)
        onSelectedUser({})
    }

    const onTotalPrice = (price, numOfTkts) => {
        setTotalPrice(price)
        setTkts(numOfTkts)
    }

    console.log()
    const placeOrder = async () => {
        setLoadingOrder(true)
        const docRef = doc(db, `open-orders`, orderId);
        if ((
            (orderTaker.name || orderName)
            &&
            (totalPrice || ticketNum)
        )) {
            showCart()
            await setDoc(docRef, {
                id: orderId,
                status: "open",
                fullDate: fullDate,
                date: date,
                time: time,
                cart,
                totalPrice,
                TiketSold: tkts,
                user: {
                    name: orderTaker.name ?? orderName,
                    id: orderTaker.uid ?? ""
                }
            });
            cart?.map(async (cartItem) => {
                await deleteDoc(doc(db, `carts/cart${cartId}/Products/${cartItem.item.name}`));
            })
            setLoadingOrder(false)
            startAnimation()
            setTicketNum(0)
            onSelectedUser({})
            document.getElementById("add-name-form").reset()
            setOrderName("")


        } else {
            setLoadingOrder(false)
            const emptyCartImg = document.getElementById("emptyCartImg");
            const emptyCartTxt = document.getElementById("emptyCartTxt");

            emptyCartImg.style.width = 110
            emptyCartImg.style.transition = "ease-in-out 1s"
            emptyCartImg.style.transform = "rotate(360deg)"


            emptyCartTxt.style.fontSize = 32


            setTimeout(() => {
                emptyCartImg.style.width = 105
                emptyCartTxt.style.fontSize = 30
                emptyCartImg.style.opacity = "100%"

            }, 250);

            setTimeout(() => {
                emptyCartImg.style.transform = "rotate(0)"
                emptyCartImg.style.opacity = "20%"


            }, 350);

        }

    }




    return (
        <>
            {loading ? "loading" :
                <div id='cartContainer' className=' cart-container-shown cart-container'>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2 className='cart_orderid'>{orderId}</h2>
                        <button onClick={clearCart} className=" cart_action-btn cart-item_remove-btn"><MdDelete style={{ fontSize: "30px", marginRight: "35px", marginTop: "14px", color: "black" }} /></button>
                    </div>

                    <p className='cart_order-date'>{fullDate}</p>
                    <User getOrderName={getOrderName} showCart={showCart} Choosing={Choosing} onChoosingState={onChoosingState} />
                    <div className='cart_cart-item-contaienr'>
                        {
                            cart.length > 0 ?
                                cart.map((products, index) => (
                                    <div key={index}>
                                        <CartItem isItemRemoved={isItemRemoved} products={products} />
                                    </div>
                                ))
                                :
                                <div className='empty-cart-group'>
                                    <img id='emptyCartImg' src={emptyCart} alt="" className='empty-cart-img' />
                                    <p id='emptyCartTxt' className='empty-cart-txt'>Empty</p>
                                </div>
                        }
                    </div>
                    <Chekout onChangeTktNum={onChangeTktNum} ticketNum={ticketNum} onTotalPrice={onTotalPrice} cart={cart} />
                    <div className='cart_btn-container'>
                        <button disabled={loadingOrder} onClick={placeOrder} className='cart_place-btn'>place order</button>
                    </div>
                </div>
            }

        </>

    )
}

export default Cart