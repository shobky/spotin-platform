import '../styles/pos/nav.css'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5"
// import logo from '../assets/imgs/logo.png'

const Nav = () => {
    return (
        <div className='pos_nav'>
            <div className='pos_home-btn-contain'>
                <p className='pos_home-link'><IoHome /></p>
            </div>
            <div className='pos_link-group'>
                <Link to="/pos" className='pos_NavLink'>Put</Link>
                <Link to="/pos/open-orders" className='pos_NavLink'>Get</Link>
                <p className='pos_NavLink'>Add</p>
            </div>
        </div>
    )
}

export default Nav