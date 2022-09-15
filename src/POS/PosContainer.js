
import React, { useState, Suspense } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { doc, setDoc } from "@firebase/firestore";
import { db } from '../firebase/Config';
import { useAuth } from '../contexts/AuthContext';
import Nav from './Nav';
import '../styles/pos/pos.css'
import Products from './Products';
import Loading from '../components/loadingAnimaitno/Loading';
import { TbReceiptOff, TbReceipt } from 'react-icons/tb'
const ChooseUser = React.lazy(() => import("./ChooseUser"));
const Cart = React.lazy(() => import("./cart/Cart"));

// import ChooseUser from './ChooseUser';

const PosContainer = () => {

    const AdminId = "9S1uStIw70RBSfJ8Dl5sdCDh9ND2"
    const { currentUser, cartId } = useAuth()


    const query = collection(db, `pos`)
    const [docs, loading] = useCollectionData(query)

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
                    currentUser.uid === AdminId ?
                        <>
                            {orderAnimation && <div className='orderDone-animation'><p className='orderDone-animation-txt'>Done</p></div>}


                            <div className='products_container'>
                                <div className='pos_header-container'>
                                    <div>
                                        <h1 className='pos_name'>Spot <span className='pos_name-span'>IN</span> </h1>
                                        <p className='pos_page'>Cashier System</p>
                                    </div>
                                    {
                                        <button style={{ fontSize: "35px" }} className='show-cart-btn' onClick={showCart}>
                                            {!cartShown ? <TbReceipt /> : <TbReceiptOff />}
                                        </button>

                                    }
                                    {/* <div className='pos_filtering-group'>
                                        <p className='pos_filtering-btn'>All</p>
                                        <p className='pos_filtering-btn'>Fresh</p>
                                        <p className='pos_filtering-btn'>Coffe</p>
                                    </div> */}
                                </div>
                                {/* <div className='pos_filter-border'></div> */}
                                <div>
                                    {Choosing ?
                                        <Suspense fallback={
                                            <div><Loading /></div>
                                        }>
                                            <ChooseUser
                                                showCart={showCart}
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
                        :
                        <p>You don't have the right credentials to browse this page.</p>
            }
        </div>
    )
}

export default PosContainer