import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; // Assumes Swal is imported

const Navbar = () => {
    const navigate = useNavigate();
    
    // Simple Logout function to keep the JSX clean
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Logout!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("userid");
                
                Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
                navigate("/");
            }
        });
    };

    const isUserLoggedIn = localStorage.getItem("token");

    return (
        <div>
            {/* Navbar-expand-lg se large screens tak menu visible rahega */}
            <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm border-bottom"> 
                
                <div className="container-fluid px-4"> 
                    
                    {/* Brand Heading (Ab koi absolute positioning nahi) */}
                    {/* Brand heading ko hamesha visible rakha */}
                    <h1 className="navbar-brand m-0 fs-3 fw-bold me-auto me-lg-0">
                        <span className="text-info" style={{ fontFamily: 'Georgia, serif' }}>Men's</span> Wear Clothing
                    </h1>
                    
                    {/* Toggler Button (Brand ke baad) */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#responsiveNavbarContent" 
                        aria-controls="responsiveNavbarContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    {/* Collapsible Content (Mobile par chhup jaata hai) */}
                    {/* ms-auto se left links aur right buttons ke beech space aayega */}
                    <div className="collapse navbar-collapse" id="responsiveNavbarContent">
                        
                        {/* Left Links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-6"> 
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/about">About</Link>
                            </li>
                        </ul>
                        
                        {/* Right Buttons - ms-auto se right align honge */}
                        <div className="d-flex align-items-center ms-auto">
                            
                            {/* Cart Button */}
                            <button 
                                className="btn btn-outline-info me-2 my-2" 
                                type="button"
                                onClick={() => { navigate("/cart") }} 
                            >
                                <i className="bi bi-cart-fill me-1"></i> Cart
                            </button>

                            {/* Login/Logout Logic */}
                            {isUserLoggedIn ? (
                                <button 
                                    className="btn btn-danger my-2" 
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </button>
                            ) : (
                                <button 
                                    className="btn btn-primary my-2" 
                                    type="button"
                                    onClick={() => { navigate("/login") }}
                                >
                                    <i className="bi bi-person-circle me-2"></i>Login
                                </button>
                            )}
                        </div>
                    </div>
                    
                </div>
            </nav>
        </div>
    );
}

export default Navbar;