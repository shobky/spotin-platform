import '../styles/pos/nav.css'
import { IoHome } from "react-icons/io5"
// import logo from '../assets/imgs/logo.png'

const Nav = () => {
    return (
        <div className='pos_nav'>
            <div className='pos_home-btn-contain'>
                <p className='pos_home-link'><IoHome /></p>
            </div>
            <div className='pos_link-group'>
                <p className='pos_NavLink'>Put</p>
                <p className='pos_NavLink'>Get</p>
                <p className='pos_NavLink'>Add</p>
            </div>
        </div>
    )
}

export default Nav