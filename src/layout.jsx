import React from "react";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
import {Outlet} from "react-router-dom";

const Layout = () => {

    return (
        <div className="main-container">
            <div className="wrapper">
                {/*<Header />*/}
                <div>
                    <Outlet/>
                </div>
                {/*<Footer/>*/}
            </div>
        </div>
    );
};

export default Layout;