import { Route, Routes } from 'react-router-dom'
import Customers from './pages/customer/customer'
import Product from './pages/product/product'
import Category from './pages/category/category'

const AppRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/category" element={<Category />} />
          <Route path="/orders" element={<></>}></Route>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path='/product' element={<Product/>}/>
        </Routes>
  )
}

export default AppRoutes