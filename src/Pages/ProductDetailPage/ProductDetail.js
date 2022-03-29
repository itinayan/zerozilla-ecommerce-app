import React, { useEffect, useState } from "react";
import HomePage from "../HomePage/HomePage";
import styles from "./ProductDetail.module.css";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const passedData = location?.state;
  const [productDetails, setProductDetails] = useState();
  const getProductDetails = () => {
    if (location?.state !== undefined && location?.state !== null) {
      setProductDetails(location?.state);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [passedData]);
  return (
    <HomePage>
      <div className={styles.container}>
        <h4>Product Detail</h4>
        <div className={styles.cardContainer}>
          {productDetails !== undefined && (
            <div className={styles.productCard}>
              <div className={styles.productThumb}>
                <img src={productDetails.image} alt="Product Image" />
              </div>
              <div className={styles.productDetails}>
                <span className={styles.productCatagory}>
                  {productDetails.category}
                </span>
                <h4>
                  <p>{productDetails.title}</p>
                </h4>
                <p className={styles.productDesc}>
                  {productDetails.description}
                </p>
                <div className={styles.productBottomDetails}>
                  <div className={styles.productPrice}>
                    <span>Rs.</span>
                    {productDetails.price}
                  </div>
                  <div className={styles.productLinks}>
                    Ratings: <p>{productDetails.rating.rate}</p>
                    <span>({productDetails.rating.count})</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </HomePage>
  );
};

export default ProductDetail;
