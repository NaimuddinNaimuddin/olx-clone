import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
