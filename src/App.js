import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Cart from './Pages/CartPage/Cart';
import ProductDetail from './Pages/ProductDetailPage/ProductDetail';
import MyProfile from './Pages/MyProfilePage/MyProfile';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="/cart" exact element={<Cart/>}/>
      <Route path="/productdetail" exact element={<ProductDetail/>}/>
      <Route path="/myprofile" exact element={<MyProfile/>}/>
    </Routes>
    </Router>
  )
}

export default App