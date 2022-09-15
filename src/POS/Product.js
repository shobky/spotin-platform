import React from 'react'
import '../styles/pos/product.css'

const Product = ({ product, onAddToCart }) => {

    const handleAddToCart = () => {
        onAddToCart(product)
    }

    return (
        <div className='pos_product-container' onClick={handleAddToCart}>
            <img className='pos_product-img' src={product.url} alt="" />
            <div className='pos_product-destails'>
                <p className='pos_product-name'>{product.name}</p>
            </div>
        </div>
    )
}

export default Product