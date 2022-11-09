// import React,{ useState, useEffect } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navigatebar from "./components/layout/Navigatebar";
//page
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import HowToPaid from "./components/pages/HowToPaid";
//page admin
import Homeadmin from "./components/pages/admin/Homeadmin";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct"
import UpdateProduct from "./components/pages/admin/product/UpdateProduct"
import Order from "./components/pages/admin/Order";
//page user
import Homeuser from "./components/pages/user/Homeuser";
import CheckOut from "./components/pages/CheckOut";
import SlipForm from "./components/pages/SlipForm";
import Wishlist from "./components/pages/user/Wishlist";
import History from "./components/pages/user/History";
import Address from "./components/pages/user/Address";
import ListAddress from "./components/pages/user/ListAddress";
//function
import { currentUser } from "./components/functions/auth";
//redux
import { useDispatch } from 'react-redux';
//Routes
import UserRoute from './components/routes/UserRoute'
import AdminRoute from "./components/routes/AdminRoute";
// Drawer
import SideDrower from "./components/drawer/SideDrower";
//footer
import Footer from "./components/layout/Footer";




const MyRoute=()=>{
    const dispatch = useDispatch();
    const idtoken = localStorage.token;
    if(idtoken){
        currentUser(idtoken)
        .then(res=>{
            //code
            console.log(res.data);
            dispatch({
                type:'LOGIN',
                payload: {
                  token: idtoken,
                  username: res.data.username,
                  role: res.data.role,
                },
              });
        }).catch(err=>{
            //err
            console.log(err);
        })
    }

    return(
        <BrowserRouter>
            {/* tooltonestore Bar */}
            <Navigatebar/>
            <SideDrower/>
            <Routes>
                {/* no Authorized */}
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/howtopaid" element={<HowToPaid/>}/>


                {/* user authorized */}
                <Route 
                    path="/user/index"     
                    element={
                    <UserRoute>
                        <Homeuser/>
                    </UserRoute>
                    }
                />
                {/* sell processing */}
                <Route 
                    path="/checkout"     
                    element={
                    <UserRoute>
                        <CheckOut/>
                    </UserRoute>
                    }
                />
                <Route 
                    path="/formslip/:id"     
                    element={
                    <UserRoute>
                        <SlipForm/>
                    </UserRoute>
                    }
                />
                {/* user accout */}
                <Route 
                    path="/user/wishlist"     
                    element={
                    <UserRoute>
                        <Wishlist/>
                    </UserRoute>
                    }
                />
                <Route 
                    path="/user/history"     
                    element={
                    <UserRoute>
                        <History/>
                    </UserRoute>
                    }
                />
                <Route 
                    path="/user/address"     
                    element={
                    <UserRoute>
                        <Address/>
                    </UserRoute>
                    }
                />
                <Route 
                    path="/user/list-address"     
                    element={
                    <UserRoute>
                        <ListAddress/>
                    </UserRoute>
                    }
                />

                {/* admin */}
                <Route 
                    path="/admin/index"     
                    element={
                    <AdminRoute>
                        <Homeadmin/>
                    </AdminRoute>
                    }
                />
                <Route 
                    path="/admin/manage-admin"     
                    element={
                    <AdminRoute>
                        <ManageAdmin/>
                    </AdminRoute>
                    }
                />
                <Route 
                    path="/admin/create-category"     
                    element={
                    <AdminRoute>
                        <CreateCategory/>
                    </AdminRoute>
                    }
                />
                <Route 
                    path="/admin/update-category/:id"     
                    element={
                    <AdminRoute>
                        <UpdateCategory/>
                    </AdminRoute>
                    }
                />
                <Route 
                    path="/admin/create-product"     
                    element={
                    <AdminRoute>
                        <CreateProduct/>
                    </AdminRoute>
                    }
                />
                <Route 
                    path="/admin/update-product/:id"     
                    element={
                    <AdminRoute>
                        <UpdateProduct />
                    </AdminRoute>
                    }
                />
                <Route 
                    path="/admin/orders"     
                    element={
                    <AdminRoute>
                        <Order />
                    </AdminRoute>
                    }
                />
            </Routes>
            {/* footer */}
            {/* <Footer /> */}

        </BrowserRouter>
        
    )
}

export default MyRoute;