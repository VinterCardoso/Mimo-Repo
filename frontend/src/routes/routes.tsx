import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "../pages/User/UserList";
import { Products } from "../pages/Product/Products";
import { Home } from "../pages/Home/Home";
import { Cart } from "../pages/Cart/Cart"
import { DogItems } from "../pages/DogItems/DogItems"; 
import { ProductList } from "../pages/Product/ProductList";
 
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/dog-items" element={<DogItems/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;