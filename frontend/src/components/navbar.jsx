
import Swal from 'sweetalert2'
import { Link, } from "react-router";
import { useNavigate } from 'react-router'



export default function Navbar (){
     
const navigate = useNavigate()

    return (

// **********************************************
// NOTE: Make sure aapke component mein `useNavigate` aur `Link` imported hain.
// **********************************************

// **********************************************
// NOTE: Make sure aapke component mein `useNavigate` aur `Link` imported hain.
// **********************************************

<div>
    {/* Use container-fluid for full width, aur custom style se padding 0 kiya */}
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm border-bottom" style={{ padding: '0 1rem' }}> 
        
        {/* Container-fluid is for full width */}
        <div className="container-fluid px-4"> 
            
            {/* Left Section (Home & About Links) */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                    <li className="nav-item">
                        {/* mx-3 se links ke beech ki spacing maintain hogi */}
                        <Link className="nav-link  fw-small mx-3 my-3" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link  fw-small mx-3 my-3" to="/about">About</Link>
                    </li>
                </ul>
            </div>
            
            {/* Center Section (Brand Heading) */}
            {/* fs-3 se size theek kiya */}
            <h1 className="navbar-brand m-0 fs-3 fw-bold mx-auto" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <span className="text-info"style={{ fontFamily: 'Georgia, serif' }}>Men's</span > Wear Clothing
            </h1>
            
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            
            {/* Right Section (Cart & Auth Buttons) */}
            <div className="d-flex align-items-center ms-lg-auto">
                
                {/* Cart Button */}
                <button 
                    className="btn btn-outline-info me-2" 
                    type="button"
                    onClick={() => { navigate("/cart") }} // Assumes 'navigate' is available
                >
                    <i className="bi bi-cart-fill me-1"></i> Cart
                </button>

              {localStorage.getItem("token") ? (
    <button 
        className="btn btn-danger" 
        type="button"
        onClick={() => {
            // FIX START: Swal Confirmation
            Swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out from your account!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33', // Red color for danger action
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Logout!',
                reverseButtons: true
            }).then((result) => {
                // Agar user 'Yes, Logout!' press karta hai
                if (result.isConfirmed) {
                    // Actual Logout Logic
                    localStorage.removeItem("token");
                    localStorage.removeItem("userid"); // NOTE: Aapne pichle code mein 'user_id' use kiya tha. Maine yahan 'userid' kar diya hai, jaisa aapke Login component mein tha. Ek naam use karein.
                    
                    // Success message (Optional, kyunki page navigate ho jaega)
                    Swal.fire(
                        'Logged Out!',
                        'You have been successfully logged out.',
                        'success'
                    )
                    
                    // Page ko Home par redirect kiya
                    navigate("/");
                }
            });
            // FIX END
        }}
    >
        <i className="bi bi-box-arrow-right me-2"></i>Logout
    </button>
) : (
    // ... (Login button same rahega) ...
    <button 
        className="btn btn-primary" 
        type="button"
        onClick={() => { navigate("/login") }}
    >
        <i className="bi bi-person-circle me-2"></i>Login
    </button>
                )}
            </div>
        </div>
    </nav>
</div>
      
    )
}