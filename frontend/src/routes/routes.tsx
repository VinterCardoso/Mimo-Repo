import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "../pages/User/UserList";
import { Products } from "../pages/Product/Products";
import { DogItems } from "../pages/DogItems/DogItems"; 
import { Home } from "../pages/Home/Home";
 
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/products" element={<Products />} />
                <Route path="/dog-items" element={<DogItems/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;