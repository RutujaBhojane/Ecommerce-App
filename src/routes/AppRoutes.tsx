import { Routes, Route } from 'react-router-dom';
import Dashboard from "../features/dashboard/Dashboard"
import ProductList from "../features/products/ProductList"
import OrderList from "../features/orders/OrderList"
import CustomerList from "../features/customers/CustomerList"

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/customers" element={<CustomerList />} />
        </Routes>
    )
}

export default AppRoutes;