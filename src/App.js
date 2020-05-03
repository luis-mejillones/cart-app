import React, { Fragment, Component } from 'react';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';

const formatNumber = (number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);

const initialProducts = [
  { id: 1, title: 'iPhone Xs', inventory: 4, price: 10.0 },
  { id: 2, title: 'Galaxy S9', inventory: 5, price: 20.0 },
  { id: 3, title: 'Huawei Mate', inventory: 2, price: 30.0 },
  { id: 4, title: 'Google Pixel 3', inventory: 3, price: 40.0 },
  { id: 5, title: 'Motorola G6', inventory: 6, price: 50.0 },
];

class App extends Component {
  state = {
    products: initialProducts,
    myCart: []
  };

  addToCart = (id) => {
    const { products, myCart } = this.state;
    const product = products.find(prod => prod.id === id);
    const available = product.inventory - (myCart.find(p => p.id === product.id) ? myCart.find(p => p.id === product.id).quantity : 0);
    if (product && available > 0) {
      const prod = myCart.find(p => p.id === id);
      if (prod) {
        prod.quantity += 1;
        let foundIndex = myCart.findIndex(p => p.id === id);
        myCart[foundIndex] = prod; 
      } else {
        const prod = {
          id: product.id,
          price: product.price,
          quantity: 1
        }
        myCart.push(prod);
      }

      this.setState({ myCart: myCart });
    }

  };

  removeFromCart = (id) => {
    const { myCart } = this.state;

    const prod = myCart.find(p => p.id === id);
    if (prod) {
      if (prod.quantity > 0) {
        prod.quantity -= 1;
        let foundIndex = myCart.findIndex(p => p.id === id);
        myCart[foundIndex] = prod; 
      } 
      if (prod.quantity === 0) {
        let foundIndex = myCart.findIndex(p => p.id === id);
        myCart.splice(foundIndex, 1);
      }

      this.setState({ myCart: myCart });
    }
  };

  deleteFromCart = (id) => {
    const { myCart } = this.state;
    const prod = myCart.find(p => p.id === id);
    if (prod) {
      let foundIndex = myCart.findIndex(p => p.id === id);
      myCart.splice(foundIndex, 1);

      this.setState({ myCart: myCart });
    }
  };

  getAvailable = (products, quantityById, myCart) => {
    return products.reduce(
      (res, product) => ({
        ...res,
        [product.id]: product.inventory - (myCart.find(p => p.id === product.id) ? myCart.find(p => p.id === product.id).quantity : 0)
      }),
      {}
    );
  };

  getTotal = (products, addedIds, quantityById, myCart) => {
    return myCart.reduce(
      (res, prod) => res + prod.price * prod.quantity,
      0
    )
  };

  render() {
    const { products, quantityById, addedIds, myCart } = this.state;
    const available = this.getAvailable(products, quantityById, myCart);
    const total = this.getTotal(products, addedIds, quantityById, myCart);
    return (
      <Fragment>
        <NavBar total={formatNumber(total)}/>
        <ProductList
          available={available}
          products={initialProducts} 
          addToCart={this.addToCart} 
          removeFromCart={this.removeFromCart}
          deleteFromCart={this.deleteFromCart}
        />
      </Fragment>
    );
  }
}

export default App;
