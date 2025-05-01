import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Customers from './pages/customer/customer'
import Product from './pages/product/product'

const AppRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/inventory" element={<></>}></Route>
          <Route path="/orders" element={<></>}></Route>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path='/product' element={<Product/>}/>
        </Routes>
  )
}

export default AppRoutes