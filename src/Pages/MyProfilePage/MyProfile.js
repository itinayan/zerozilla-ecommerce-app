import React from 'react';
import HomePage from '../HomePage/HomePage';
import styles from './MyProfile.module.css';

const MyProfile = () => {
  return (
    <HomePage>
    <div className={styles.container}>
    <h4>My Profile</h4>
    <div className={styles.cartContainer}></div>
    </div>
    </HomePage>
  )
}

export default MyProfile