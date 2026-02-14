import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import Policy from "../pages/Policy";
import OrderDetail from "../pages/OrderDetail";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../auth/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {/* ===== AUTH (KHÔNG LAYOUT) ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ===== MAIN LAYOUT ===== */}
            <Route path="/" element={<MainLayout />}>
                {/* PUBLIC */}
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="policy" element={<Policy />} />

                {/* PROTECTED */}
                <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>

                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                <Route
                path="profile/orders/:id"
                element={
                    <ProtectedRoute>
                        <OrderDetail />
                    </ProtectedRoute>
                }
                />


            </Route>
        </Routes>
    );
};

export default AppRoutes;
