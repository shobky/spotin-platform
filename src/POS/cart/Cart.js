import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase/Config"
import { collection } from 'firebase/firestore';
import { doc, setDoc, deleteDoc } from "@firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';
import CartItem from './CartItem';
import '../../styles/pos/cart.css'
import Chekout from '../Chekout';
import { useEffect, useState } from 'react';
import User from '../User';
import { uuidv4 } from '@firebase/util';
import '../../styles/pos/cart.css'
import emptyCart from '../../assets/imgs/empty-cart.png'
import { MdDelete } from 'react-icons/md';
import '../../components/placementAnimation/orderAni.css'

const Cart = ({ isItemRemoved, onChoosingState, Choosing, showCart, startAnimation }) => {
    const { orderTaker, onSelectedUser, cartId } = useAuth()
    const query = collection(db, `carts/cart${cartId}/Products`)
    const [cart, loading] = useCollectionData(query)
    const [date, setDate] = useState('')
    const [totalPrice, setTotalPrice] = useState()
    const [tkts, setTkts] = useState()
    const [ticketNum, setTicketNum] = useState(0)
    const [loadingOrder, setLoadingOrder] = useState(false)
    const [orderId, setOrderId] = useState()
    // const [orderStatus, setOrderStatus] = useState(false)


    useEffect(() => {
        const createOrderId = () => {
            setOrderId("Order #" + uuidv4().slice(25))
        }
        createOrderId()

    }, [loadingOrder])


    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " - "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            setDate(datetime)
        }
        getdate()
    }, [date])

    const onChangeTktNum = (num) => {
        setTicketNum(num)
    }

    const clearCart = () => {
        cart?.map(async (cartItem) => {
            await deleteDoc(doc(db, `carts/cart${cartId}/Products/${cartItem.item.name}`));
        })
        setTicketNum(0)
        onSelectedUser({ name: 'Anonymos' })
    }


    const placeOrder = async () => {
        const docRef = doc(db, `open-orders`, orderId);
        if (totalPrice > 9) {
            setLoadingOrder(true)
            showCart()
            await setDoc(docRef, {
                orderPlacedAt: date,
                cart,
                totalPrice,
                TiketSold: tkts,
                user: {
                    name: orderTaker.name,
                    id: orderTaker.id ?? "anonymos"
                }
            });
            setLoadingOrder(false)
            cart?.map(async (cartItem) => {
                await deleteDoc(doc(db, `carts/cart${cartId}/Products/${cartItem.item.name}`));
            })
            startAnimation()
            setTicketNum(0)
            onSelectedUser({ name: 'Anonymos' })
            setLoadingOrder(false)

        } else {
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


            }, 450);

            // alert("put in cart")
        }

    }



    const onTotalPrice = (price, numOfTkts) => {
        setTotalPrice(price)
        setTkts(numOfTkts)
    }

    return (
        <>
            {loading ? "loading" :
                <div id='cartContainer' className=' cart-container-shown cart-container'>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2 className='cart_orderid'>{orderId}</h2>
                        <button onClick={clearCart} className=" cart_action-btn cart-item_remove-btn"><MdDelete style={{ fontSize: "25px", marginRight: "15px", color: "red" }} /></button>
                    </div>

                    <p className='cart_order-date'>{date}</p>
                    <User showCart={showCart} Choosing={Choosing} onChoosingState={onChoosingState} />
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