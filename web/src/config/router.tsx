import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { componentProps } from "../objects.model";
import HomeScreen from "../screens/homeScreen";
import NavbarComponent from "../components/navbarComponent";
import NotFoundPage from "../screens/notFoundScreen";
import FooterComponent from "../components/footerComponent";
import CreateProduct from "../screens/createProduct";
import CreateUser from "../screens/createUser";
import ServicesComponent from "../components/servicesComponent";
import ProductsComponent from "../components/productsComponent";
import LoginScreen from "../screens/loginScreen";
import DashboardComponent from "../components/dashboardComponent";
import { auth } from "../config/firebase.config";


type ProtectedRouteProps = componentProps['protectedRouteProps']



export default function RouterComponent() {
    const [products, setProducts] = useState<componentProps['productsProps'][]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return children;
    }
    return (
        <div className="flex flex-col min-h-screen">
            <BrowserRouter>
                <NavbarComponent isAuthenticated={isAuthenticated} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomeScreen products={products} setProducts={setProducts} />} />
                        <Route path="/createProduct" element={<CreateProduct products={products} setProducts={setProducts} />} />
                        <Route path="/products" element={<ProductsComponent products={products} setProducts={setProducts} showShopLink={false} />} />
                        <Route path="/signup" element={<CreateUser />} />
                        <Route path="/services" element={<ServicesComponent />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <DashboardComponent />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}
