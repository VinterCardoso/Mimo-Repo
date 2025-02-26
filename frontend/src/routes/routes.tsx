import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "../pages/User/UserList";
import { Home } from "../pages/Home/Home";
import { Checkout } from "../pages/Checkout/Checkout"
import { DogItems } from "../pages/DogItems/DogItems"; 
import { ProductList } from "../pages/Product/ProductList";
import { TopbarLayout } from "../layouts/TopbarLayout";
import { ProductDetails } from "../pages/Product/ProductDetails";
import { UserPublic } from "../pages/User/UserPublic";
import { PageInConstruction } from "../pages/PageInConstruction/PageInConstruction";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TopbarLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/checkout" element={<Checkout/>} />
                    <Route path="/dog-items" element={<DogItems/>} />
                    <Route path="/user" element={<UserPublic />} />
                    <Route path="/more" element={<PageInConstruction/>} />
                </Route>
                <Route path="/user-list" element={<UserList />} />
                <Route path="/products" element={<ProductList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;