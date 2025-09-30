

export default function Footer (){

return (
   
// Agar aap react-router-dom use kar rahe hain toh 'Link' use karein
// import { Link } from 'react-router-dom'; 


        // Footer Wrapper
       <footer 
    className="text-center text-lg-start mt-5 pt-5 pb-3" 
    // Light background, subtle grey text color, clean border top
    style={{ backgroundColor: '#ffffff', color: '#6c757d', borderTop: '1px solid #e9ecef' }} 
>
    <div className="container p-4">
        
        {/* 1. Main Content / Links Section */}
        <section className="mb-4">
            <div className="row justify-content-center"> 
                
                {/* 1st Column: Company Info / Branding */}
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-md-start">
                    <h5 className="fw-bolder mb-3 fs-5" style={{ color: '#343a40' }}>
                        Mens'Wear Clothing
                    </h5>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                        The best quality and latest fashion in men's clothing delivered right to your doorstep.
                    </p>
                    
                    {/* Social Media Icons */}
                    <div className="mt-3 fs-5">
                         <i className="fab fa-facebook-f text-secondary me-3" style={{ cursor: 'pointer' }}></i>
                         <i className="fab fa-twitter text-secondary me-3" style={{ cursor: 'pointer' }}></i>
                         <i className="fab fa-instagram text-secondary" style={{ cursor: 'pointer' }}></i>
                    </div>
                </div>

                {/* 2nd Column: Shop Links */}
                {/* <div className="col-lg-2 col-md-6 mb-4 mb-md-0 text-md-start">
                    <h6 className="text-uppercase fw-semibold mb-3" style={{ color: '#343a40' }}>Shop</h6>
                    <ul className="list-unstyled mb-0 fs-6">
                        <li><a href="#!" className="text-secondary text-decoration-none">T-Shirts</a></li>
                        <li><a href="#!" className="text-secondary text-decoration-none">Jeans</a></li>
                        <li><a href="#!" className="text-secondary text-decoration-none">Shirts</a></li>
                        <li><a href="#!" className="text-secondary text-decoration-none">New Arrivals</a></li>
                    </ul>
                </div> */}

                {/* 3rd Column: Support Links */}
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0 text-md-start">
                    <h6 className="text-uppercase fw-semibold mb-3" style={{ color: '#343a40' }}>Support</h6>
                    <ul className="list-unstyled mb-0 fs-6">
                        {/* <li><a href="#!" className="text-secondary text-decoration-none">Contact Us</a></li> */}
                        <li><a href="#!" className="text-secondary text-decoration-none">Shipping & Returns</a></li>
                        <li><a href="#!" className="text-secondary text-decoration-none">FAQ</a></li>
                        <li><a href="#!" className="text-secondary text-decoration-none">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* 4th Column: Contact Info */}
                <div className="col-lg-2 col-md-6 mb-4 mb-md-0 text-md-start">
                    <h6 className="text-uppercase fw-semibold mb-3" style={{ color: '#343a40' }}>Contact us</h6>
                    <ul className="list-unstyled mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                        <li className="mb-2"><i className="fas fa-map-marker-alt me-3" style={{ color: '#4facfe' }}></i> New Delhi, 110001, India</li>
                        <li className="mb-2"><i className="fas fa-envelope me-3" style={{ color: '#4facfe' }}></i> info@mwclothing.com</li>
                        <li className="mb-2"><i className="fas fa-phone me-3" style={{ color: '#4facfe' }}></i> + 91 98765 43210</li>
                    </ul>
                </div>
            </div>
        </section>
        
        {/* 2. Copyright Section (Clean and subtle) */}
        <div 
            className="text-center p-3 text-muted" 
            style={{ fontSize: '0.8rem', borderTop: '1px solid #eee', marginTop: '30px' }}
        >
            © {new Date().getFullYear()} MW Clothing. All rights reserved.
        </div>
    </div>
</footer>
  

// NOTE: Agar aap isse kisi dusre component mein use kar rahe hain, 
// toh aapko is component ko export karke import karna hoga. 
// Example: <Footer />
)
}