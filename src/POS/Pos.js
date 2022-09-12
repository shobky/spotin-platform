import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { db } from '../firebase/Config';
import { useAuth } from '../contexts/AuthContext'
import "../styles/pos.css"
import { collection, getDocs, addDoc } from "firebase/firestore";
import Products from '../components/Products';
const Pos = () => {
    const AdminId = "9S1uStIw70RBSfJ8Dl5sdCDh9ND2"
    const { currentUser, getUserInfo } = useAuth()
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    const uid = currentUser.uid



    useEffect(() => {

        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "pos"));
            const procutsArr = []
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.ID = doc.id;
                procutsArr.push({
                    ...data
                })
                if (procutsArr.length === querySnapshot.docs.length) {
                    setProducts(procutsArr)
                }
            })
        }
        fetchProducts();
    }, [])

    let Product;

    const onAddToCart = async (product) => {

        if (uid !== null) {

            Product = product;
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            setCart(cart => [...cart, product])
            console.log(cart)
        } else {
            navigate('/login')
        }
    }


    return (
        <div>
            {
                currentUser.uid === AdminId ?
                    <div className='pos_container'>
                        {
                            products.map((product, index) => (
                                <Products key={index} onAddToCart={onAddToCart} product={product} />
                            ))
                        }
                        <div>
                            <h1>
                                {cart.map((item, index) => (
                                    <div>
                                        <p key={index}>{item.name}</p>
                                        <p>{item.price}</p>
                                        <img src={item.url} alt="" style={{width:"50px"}}/>

                                    </div>

                                ))}
                            </h1>
                        </div>
                    </div>
                    :
                    <p>You don't have the right credentials to browse this page.</p>
            }
        </div>
    )
}

export default Pos