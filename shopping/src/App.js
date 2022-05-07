import { useRoutes } from "react-router-dom";
import Navbar from "./components/navbar";
import ProductDetail from "./components/productDetails";
import Products from "./components/products";
import Profile from "./components/profile";

function App() {
  return useRoutes([
    {
      path: "/",
      element: <Navbar/>,
      
      children: [
        { path: "products/:category", element: <Products /> },
        { path: "productDetail/:id", element: <ProductDetail /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
}

export default App;
