import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "../pages/User/UserList";
import { DogItems } from "../pages/DogItems/DogItems"; 
import { Home } from "../pages/Home/Home";
import { ProductList } from "../pages/Product/ProductList";
 
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/dog-items" element={<DogItems/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;