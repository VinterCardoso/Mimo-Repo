import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "../pages/User/UserList";
import { Products } from "../pages/Product/Products";
import { Home } from "../pages/Home/Home";
import { Cart } from "../pages/Cart/Cart"
import { DogItems } from "../pages/DogItems/DogItems"; 
import { ProductList } from "../pages/Product/ProductList";
import { TopbarLayout } from "../layouts/TopbarLayout";
import { ProductDetails } from "../pages/Product/ProductDetails";
 
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TopbarLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/dog-items" element={<DogItems/>} />
                </Route>
                <Route path="/user-list" element={<UserList />} />
                <Route path="/products" element={<ProductList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;