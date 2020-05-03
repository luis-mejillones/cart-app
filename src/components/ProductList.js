import React from 'react';
import Product from './Product';

const ProductList = ({ available, products, addToCart, removeFromCart, deleteFromCart }) => (
    <div className="container">
        <div className="columns is-centered">
          <div className="column is-narrow">
            {products.map(p => 
                <Product
                    key={p.id} 
                    title={p.title} 
                    price={p.price} 
                    inventory={available[p.id]}
                    addToCart={() => addToCart(p.id)}
                    removeFromCart={() => removeFromCart(p.id)}
                    deleteFromCart={() => deleteFromCart(p.id)}
                />
              )}
          </div>
        </div>
      </div>
);

export default ProductList;
