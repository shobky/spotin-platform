import { doc, setDoc, deleteDoc } from "@firebase/firestore";
import { db } from '../../firebase/Config';
import { useAuth } from '../../contexts/AuthContext';
// import { IoIosRemoveCircle } from "react-icons/io"
import { useEffect, useState } from "react"

import { RiAddCircleFill } from 'react-icons/ri'
import { AiFillMinusCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'



const CartItem = ({ products }) => {
    const [qty, setQty] = useState(1)
    const {  cartId } = useAuth()



    const removeFromCart = async () => {
        await deleteDoc(doc(db, `carts/cart${cartId}/Products/${products.item.name}`));
    }

    useEffect(() => {
        setQty(products.qty)
    }, [products])

    const updateQty = async (newQty) => {
        const docRef = doc(db, `carts/cart${cartId}/Products/${products.item.name}`);
        await setDoc(docRef, {
            item: products.item,
            qty: newQty,
        });
    }

    const updateNote = async (note) => {
        const docRef = doc(db, `carts/cart${cartId}/Products/${products.item.name}`);
        await setDoc(docRef, {
            item: products.item,
            qty: qty,
            notes: note.target.value
        });
    }



    const decreaceQty = () => {
        if (qty <= 1) {
            removeFromCart()
        } else {
            setQty(qty - 1)
            updateQty(qty - 1)
        }
    }
    const increaceQty = () => {
        setQty(qty + 1)
        updateQty(qty + 1)
    }
    return (
        <div className="cart-item">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div className="cart-item_details">
                    <p className="cart-item_name">
                        <span className="pos_qty">{qty}x </span>
                        {products.item.name}</p>
                    <p className="cart-item_price">{products.item.price} EGP</p>
                </div>
                <div className="cart_action-btns">
                    <button className=" cart_action-btn cart_qty-increase" onClick={increaceQty}><RiAddCircleFill className="cart_add-ico" /></button>
                    <button className=" cart_action-btn cart_qty-decrease" onClick={decreaceQty}><AiFillMinusCircle className="cart-decreese-ico" /></button>
                    <button className=" cart_action-btn cart-item_remove-btn" onClick={removeFromCart}><MdDelete /></button>
                </div>
            </div>

            <input onChange={(note) => updateNote(note)} type="text" placeholder="Extras & Specifications" className="cart-item_plus-input" />
        </div>

    )
}

export default CartItem