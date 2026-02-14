import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllProducts } from "../features/product/productSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";
import { fetchOrders } from "../features/order/orderSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = () => {
    const dispatch = useAppDispatch();
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // 1. Luôn load sản phẩm để đảm bảo có data cho các component dùng chung
        dispatch(fetchAllProducts());


        // 2. Nếu user đã đăng nhập, tự động lấy lại wishlist và order
        if (isLoggedIn && user?.id) {
            dispatch(fetchWishlist(user.id));
            dispatch(fetchOrders(user.id));

        }
    }, [dispatch, isLoggedIn, user?.id]);



    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;