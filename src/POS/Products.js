import Product from "./Product"

const Products = ({docs, onAddToCart}) => {
    return (
        <div>
            <div className='pos_products'>
                {
                    docs &&
                    docs.map((product, index) =>
                    (
                        <Product
                            onAddToCart={onAddToCart}
                            key={index}
                            product={product} />
                    )
                    )
                }</div>
        </div>
    )
}

export default Products