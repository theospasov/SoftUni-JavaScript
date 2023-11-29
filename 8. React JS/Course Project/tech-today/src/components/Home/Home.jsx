import { ProductCard } from '../ProductCard/ProductCard'

import './Home.css'

export const Home = ({products}) => {
    // console.log(products);

    return (
        <>
            <h1>All products</h1>
            <div className='product-grid'>
                {products.map((product) => (
                    <ProductCard {...product} key={product._id} />
                )
            )}
            </div>

            
        </>
    )
}