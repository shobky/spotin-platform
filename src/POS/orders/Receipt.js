import React, { useEffect, useState } from 'react'
import './receipt.css'
import { MdKeyboardBackspace } from 'react-icons/md'
import moment from 'moment/moment'
import { db } from "../../firebase/Config"
import { doc, setDoc, deleteDoc } from "@firebase/firestore";

const Receipt = ({ onOpenOrder, order }) => {
    const [timeSpent, setTimeSpent] = useState()

    useEffect(() => {
        const getFullDate = () => {
            const currentdate = new Date();
            const fullDate =
                `  ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds}
                `
            let startTime = moment(`${order.time[0]}:${order.time[1]}:00`, 'HH:mm:ss a');
            let endTime = moment(fullDate, 'HH:mm:ss a');

            // calculate total duration
            let duration = moment.duration(endTime.diff(startTime));

            // duration in hours
            let hours = parseInt(duration.asHours());

            // duration in minutes
            let minutes = parseInt(duration.asMinutes()) % 60;

            // console.log(hours + ' hour and ' + minutes + ' minutes.');

            setTimeSpent(
                `${hours}hour and ${minutes} minutes.`
            )

        }
        getFullDate()
    }, [order?.time])


    const checkout = async () => {
        const docRef = doc(db, `closed-orders`, order.id);
        await setDoc(docRef, {
            id: order.id,
            status: "closed",
            fullDate: order.fullDate,
            date: order.date,
            time: order.time,
            cart: order.cart,
            totalPrice: order.totalPrice,
            TiketSold: order.TiketSold,
            user: {
                name: order.user.name ?? "noname",
                id: order.user.uid ?? ""
            }
        });
        console.log("moved")
        onOpenOrder()
        await deleteDoc(doc(db, `open-orders/${order.id}`));
        console.log("deleted")

    }
    const deleteOrder = async () => {
        const docRef = doc(db, `deleted-orders`, order.id);
        await setDoc(docRef, {
            id: order.id,
            status: "deleted",
            fullDate: order.fullDate,
            date: order.date,
            time: order.time,
            cart: order.cart,
            totalPrice: order.totalPrice,
            TiketSold: order.TiketSold,
            user: {
                name: order.user.name ?? "noname",
                id: order.user.uid ?? ""
            }
        });
        console.log("moved")
        onOpenOrder()
        await deleteDoc(doc(db, `closed-orders/${order.id}`));
        console.log("deleted")

    }

    const reOpenOrder = async () => {
        const docRef = doc(db, `open-orders`, order.id);
        await setDoc(docRef, {
            id: order.id,
            status: "open",
            fullDate: order.fullDate,
            date: order.date,
            time: order.time,
            cart: order.cart,
            totalPrice: order.totalPrice,
            TiketSold: order.TiketSold,
            user: {
                name: order.user.name ?? "noname",
                id: order.user.uid ?? ""
            }
        });
        console.log("moved")
        onOpenOrder()
        await deleteDoc(doc(db, `closed-orders/${order.id}`));
        console.log("deleted")
    }

    return (
        <div>
            <div className='recep-header'>
                <button onClick={() => onOpenOrder()} className='recep_back-icon' >
                    <MdKeyboardBackspace />
                </button>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {
                        order?.status === 'open' ?
                            <div className='open-recep'></div>
                            :
                            <div className='closed-recep'></div>

                    }
                    <h1 className='recep_name'>

                        {`Receipt ${order?.id.slice(-3)}`}</h1>
                </div>
            </div>
            <div className='recep_user'>
                <p><strong>Name:</strong> {order?.user.name ? order?.user.name : "Unkown"}</p>
                <p><strong>ID:</strong> {order?.user.id ? `#${order?.user.id}` : "Unkown"}</p>
                <br />

                <p><strong>Date:</strong> {order?.date}</p>
                <p><strong>Time:</strong> {order?.time[0]}:{order?.time[1]}</p>
                <br />


                <p><strong>Tickets:</strong> {order?.TiketSold ? order.TiketSold : 'none'}</p>
                <p><strong>Checked in at:</strong> {order?.time[0]}:{order?.time[1]}</p>
                <p><strong>Time in the space:</strong> {timeSpent}</p>

                {
                    timeSpent &&
                    <div>
                        <p><strong>Ticket type:</strong> {timeSpent[0] >= 2 ? "Full Day" : "Half Day"}</p>
                        <p> {order?.TiketSold}x<strong>Ticket Price:  {timeSpent[0] >= 2 ? 25 * order?.TiketSold : 10 * order?.TiketSold}L.e</strong></p>
                        <p><strong>Subtotal:  {timeSpent[0] > 2 ? (order?.totalPrice + 15) : order.totalPrice}L.e</strong></p>
                    </div>

                }
            </div>
            <br />


            <div className='recep_cart'>
                <p><strong>Items:</strong></p>
                <div className='recep_item-container'>
                    {
                        order?.cart.length > 0 ? order?.cart.map((item) => (
                            <div>
                                <p>
                                    <span className='item-qty'>{item?.qty}x </span>
                                    <span className='item-name'>{item?.item.name} </span>
                                    <span className='item-price'><strong>{item?.item.price}L.e</strong></span>
                                </p>
                            </div>
                        )) : "no items"
                    }
                    <br />
                </div>
            </div>
            <div className='recep-checkout'>
                {
                    timeSpent &&
                    <p className='recep_checkout_total-price'><strong>{timeSpent[0] > 2 ? (order?.totalPrice + 15) : order.totalPrice} L.E</strong></p>
                }
            </div>

            <div className='recep_call-to-action-btns'>
                {
                    order?.status === "open" ?
                        <button onClick={checkout} className='recep_checkout-btn'>Checkout</button>
                        :
                        <>
                            <button onClick={deleteOrder} className='recep_cancel-btn'>Delete</button>
                            <button onClick={reOpenOrder} className='recep_reopen-btn'>Reopen</button>
                        </>
                }
            </div>

        </div>
    )
}

export default Receipt