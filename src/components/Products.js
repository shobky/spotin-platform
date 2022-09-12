const Products = (props) => {
    const handleAddToCart = () => {
        props.onAddToCart(props.product);
    }
    return (
        <div onClick={handleAddToCart} className='pos_products-container'>
            <div className='pos_products_product'>
                <img className='pos_img' src={props.product.url} alt="" />

            </div>
            <div className='pos_prod-details'>
                <p className='pos_name'>{props.product.name}</p>
                <p className='pos_price'>Price: {props.product.price} EGP</p>
            </div>
        </div>

    )
}

export default Products