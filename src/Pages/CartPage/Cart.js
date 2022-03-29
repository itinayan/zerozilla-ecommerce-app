import React from 'react';
import HomePage from '../HomePage/HomePage';
import styles from './Cart.module.css';

const Cart = () => {
  return (
    <HomePage>
    <div className={styles.container}>
    <h4>My Cart</h4>
    <div className={styles.cartContainer}></div>
    </div>
    </HomePage>
  )
}

export default Cart