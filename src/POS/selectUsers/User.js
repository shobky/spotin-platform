import { IoPersonAddSharp } from 'react-icons/io5'
import { TbArrowBack } from 'react-icons/tb'
import { useAuth } from "../../contexts/AuthContext"

const User = ({ onChoosingState, Choosing, showCart, getOrderName }) => {

    const { orderTaker } = useAuth()

    const putOrderName = (e) => {
        getOrderName(e.target.value)
    }
    const submitInput = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div>
                <p onClick={() => onChoosingState()} className="cart_change-user">
                    {
                        !Choosing ?
                            <IoPersonAddSharp onClick={() => showCart()} /> :
                            <TbArrowBack onClick={() => showCart()} style={{ transform: "scale(-1) rotatex(180deg)" }} />
                    }
                </p>
                {
                    orderTaker?.name ? (
                        <div className="cart_user-select-container">
                            <p className="cart_order-for">{orderTaker.name}</p>
                            <p className="cart_order-for">#{orderTaker.uid}</p>
                        </div>
                    ) : <form onSubmit={(e) => submitInput(e)} id='add-name-form'>
                        <input id="orderName_input" onChange={(e) => putOrderName(e)} className='cart_user-name-input' type="text" placeholder='order name' />
                    </form>
                }
            </div>


        </>

    )
}

export default User