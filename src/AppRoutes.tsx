import { Route, Routes } from 'react-router-dom'
import Product from './pages/product/product'
import Category from './pages/category/category'
import Customer from './pages/customer/customer'
import Order from './pages/order/order'

const AppRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/category" element={<Category />} />
          <Route path="/order" element={<Order/>}></Route>
          <Route path="/customer" element={<Customer/>}></Route>
          <Route path='/product' element={<Product/>}/>
        </Routes>
  )
}

export default AppRoutes