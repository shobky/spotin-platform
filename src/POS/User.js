import { IoPersonAddSharp } from 'react-icons/io5'
import { TbArrowBack } from 'react-icons/tb'
import { useAuth } from "../contexts/AuthContext"

const User = ({ onChoosingState, Choosing, showCart }) => {

    const orderTaker = useAuth()

    return (
        <div className="cart_user-select-container">
            {/* <img /> */}
            <div>
                <p className="cart_order-for">{orderTaker.orderTaker.id}</p>
                <p className="cart_order-for">{orderTaker.orderTaker.name}</p>
            </div>
            <p onClick={() => onChoosingState()} className="cart_change-user">
                {
                    !Choosing ?
                        <IoPersonAddSharp onClick={() => showCart()} /> :
                        <TbArrowBack onClick={() => showCart()} style={{transform:"scale(-1) rotatex(180deg)"}} />
                }
            </p>
        </div>
    )
}

export default User