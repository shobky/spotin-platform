
import React, { useState, Suspense } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { doc, setDoc } from "@firebase/firestore";
import { db } from '../firebase/Config';
import { useAuth } from '../contexts/AuthContext';
import Nav from './Nav';
import '../styles/pos/pos.css'
import Products from './products/Products';
import Loading from '../components/loadingAnimaitno/Loading';
import { TbArrowBack } from 'react-icons/tb'
import { FaReceipt } from 'react-icons/fa'
import { MdOutlineShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { IoPersonAddSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { VscCheck } from 'react-icons/vsc'
const ChooseUser = React.lazy(() => import("./selectUsers/ChooseUser"));
const Cart = React.lazy(() => import("./cart/Cart"));

// import ChooseUser from './ChooseUser';

const PosContainer = () => {

    const { cartId } = useAuth()


    const query = collection(db, `pos`)
    const [docs, loading] = useCollectionData(query)


    const cartq = collection(db, `carts/cart${cartId}/Products`)
    const [cart, cartloading] = useCollectionData(cartq)

    const [Choosing, setChoosing] = useState(false)
    const [cartShown, setCartShown] = useState(false)
    const [orderAnimation, setOrderAnimation] = useState(false)


    const onChoosingState = () => {
        setChoosing(!Choosing)
    }

    const onAddToCart = async (item) => {
        const docRef = doc(db, `carts/cart${cartId}/Products`, item.name);
        await setDoc(docRef, {
            item,
            qty: 1,
        });
    }

    const cartComp = document.getElementById('pos_cart')

    const showCart = () => {
        setCartShown(!cartShown)
    }
    if (cartShown) {
        cartComp?.classList.add("showIT")
    } else {
        cartComp?.classList.remove("showIT")

    }

    const startAnimation = () => {
        setOrderAnimation(true)
        setTimeout(() => {
            setOrderAnimation(false)
        }, 3400);
    }
    return (
        <div s className='pos-parent-container'>
            <Nav />
            {
                loading ? <Loading />
                    :
                    <>
                        {orderAnimation && <div onDoubleClick={() => setOrderAnimation(false)} className='orderDone-animation'>
                            <p className='orderDone-animation-txt'>Done</p>
                            <VscCheck className='check-animation-order-placed' />
                        </div>}


                        <div className='products_container'>
                            <div className='pos_header-container'>
                                <div>
                                    <div className='pos-logoMenu-container'>
                                        <h1 className='pos_name'>Spot <span className='pos_name-span'>IN</span> </h1>
                                    </div>
                                    <p className='pos_page'>Cashier System</p>
                                </div>
                                {
                                    <div className='pos-actions-div'>
                                        <button className='open-user-in-pos' >
                                            {!cartShown ? !Choosing ? <IoPersonAddSharp onClick={() => setChoosing(true)} className='pos_mb-add-user' /> : <TbArrowBack onClick={() => setChoosing(false)} className='pos_mb-add-user' /> : ""}
                                        </button>
                                        <Link className='orders-icon-link' to="/pos/open-orders"><FaReceipt className='orders-icon' /> </Link>

                                        <button style={{ fontSize: "35px" }} className='show-cart-btn' onClick={showCart}>
                                            {!cartShown ?
                                                <div>
                                                    <MdOutlineShoppingCart />
                                                    {
                                                        !cartloading && cart?.length > 0 ?
                                                            <div className='pos_icon-item-qty'>{cart?.length}</div>
                                                            : ""
                                                    }
                                                </div>
                                                : <MdOutlineRemoveShoppingCart />}
                                        </button>
                                    </div>

                                }
                            </div>
                            <div>
                                {Choosing ?
                                    <Suspense fallback={
                                        <div><Loading /></div>
                                    }>
                                        <ChooseUser
                                            onChoosingState={onChoosingState}
                                        />
                                    </Suspense>
                                    :
                                    <Products docs={docs} onAddToCart={onAddToCart} />
                                }
                            </div>

                        </div>

                        {
                            <div id='pos_cart' className='pos_cart'>
                                <Suspense>
                                    <Cart startAnimation={startAnimation} showCart={showCart} Choosing={Choosing} onChoosingState={onChoosingState} />
                                </Suspense>
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default PosContainer