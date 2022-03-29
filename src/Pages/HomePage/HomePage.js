import React, { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation, useNavigate } from "react-router-dom";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_PROD_BY_CATEGORY,
} from "../../API/apiEndPoints";

const HomePage = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [productsByCategory, setProductsByCategory] = useState([]);
  const optionsRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const getAllCategories = () => {
    fetch(GET_ALL_CATEGORIES, { credentials: "omit" })
      .then((response) => response.json())
      .then((data) => {
        setAllCategories(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getProductsByCategory = (category) => {
    fetch(GET_ALL_PROD_BY_CATEGORY + category, { credentials: "omit" })
      .then((response) => response.json())
      .then((data) => {
        setProductsByCategory((prevState) => {
          prevState = data;
          return prevState;
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onSelectingCategory = (event) => {
    event.preventDefault();
    const category = event.target.value;
    getProductsByCategory(category);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    if (
      optionsRef?.current?.value !== null &&
      optionsRef?.current?.value !== undefined
    ) {
      const category = optionsRef.current.value;
      getProductsByCategory(category);
    }
  }, [allCategories]);

  return (
    <div>
      <nav className={styles.header}>
        <div className={styles.imageContainer}>
          <img
            // src="./zz-logo.png"
            src="./logo.jpg"
            alt="company logo"
            className={styles.logo}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        {/* <div className={styles.searchContainer}> */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Products Here..."
        />
        {/* </div> */}
        <div className={styles.cart_User_Container}>
          <span
            className={styles.cart}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
          <span
            className={styles.user}
            onClick={() => {
              navigate("/myprofile");
            }}
          >
            <FontAwesomeIcon icon={faCircleUser} />
          </span>
        </div>
      </nav>
      <div className={styles.container}>{children}</div>
      {location.pathname === "/" && (
        <>
          <div className={styles.allCategory}>
            <h3>All Categories</h3>
            <div className={styles.catContainer}>
              {allCategories.length > 0 && (
                <select
                  selected={allCategories}
                  className={styles.categories}
                  onChange={onSelectingCategory}
                  ref={optionsRef}
                >
                  {allCategories.length > 0 &&
                    allCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                </select>
              )}
            </div>
          </div>
          <div className={styles.cardContainer}>
            {productsByCategory?.length > 0 &&
              productsByCategory?.map((product) => {
                return (
                  <div className={styles.productCard} key={product.id}>
                    <div className={styles.productThumb}>
                      <img src={product.image} alt="Product Image" />
                    </div>
                    <div className={styles.productDetails}>
                      <span className={styles.productCatagory}>
                        {product.category}
                      </span>
                      <h4
                        onClick={() => {
                          navigate("/productdetail", { state: product });
                        }}
                      >
                        {product.title}
                      </h4>
                      <p className={styles.productDesc}>
                        {product.description.slice(0, 150)}...
                      </p>
                      <div className={styles.productBottomDetails}>
                        <div className={styles.productPrice}>
                          <span>Rs.</span>
                          {product.price}
                        </div>
                        <div className={styles.productLinks}>
                          Ratings: <p>{product.rating.rate}</p>
                          <span>({product.rating.count})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
