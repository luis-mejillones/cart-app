import React from 'react';

const formatNumber = (number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);

const Product = ({ title, price, inventory, addToCart, removeFromCart, deleteFromCart }) => (
    <div style={{ marginBottom: '1.5rem'}}>
        <p><b>{title}</b> - ${formatNumber(price)}</p>
        <div className="field is-grouped">
        <p className="control">
            <button className="tag is-warning is-medium">
            {inventory}
            </button>
        </p>
        <p className="control">
            <button className="button is-dark" onClick={addToCart}>
            <span className="icon is-small">
                <i className="fas fa-plus"></i>
            </span>
            </button>
        </p>
        <p className="control">
            <button className="button is-dark" onClick={removeFromCart}>
            <span className="icon is-small">
                <i className="fas fa-minus"></i>
            </span>
            </button>
        </p>
        <p className="control">
            <button className="button is-danger" onClick={deleteFromCart}>
            <span className="icon is-small">
                <i className="fas fa-trash"></i>
            </span>
            </button>
        </p>
        </div>
    </div>
);

export default Product;
