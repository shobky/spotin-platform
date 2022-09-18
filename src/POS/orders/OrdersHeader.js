import { BiSearch } from 'react-icons/bi'
import { MdOutlineAdd } from 'react-icons/md'
import {  useNavigate } from 'react-router-dom'

const OrdersHeader = () => {
    const navigate = useNavigate()
    const gotoPos = () => {
        navigate('/pos')
    }
    return (
        <div className='orders-header_container'>
            <div className='orderMenu-contaienr'>
                <h1 className='orders-header_name'>Orders</h1>
            </div>

            <ul className='orders-header_list-group'>
                <li className='orders-header_list-item'><BiSearch className='order-header_icon' /><span className='hide-for-mobile'>Search</span></li>
                <li onClick={gotoPos} className='orders-header_list-item'><MdOutlineAdd className='order-header_icon' /><span className='hide-for-mobile'>Add order</span></li>
            </ul>
        </div>
    )
}

export default OrdersHeader