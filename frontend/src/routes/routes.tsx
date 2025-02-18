import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "../pages/User/UserList";
import { Products } from "../pages/Product/Products";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;