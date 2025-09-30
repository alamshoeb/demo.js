// src/components/Layout.js (Updated)

import Navbar from './navbar'; 
import Footer from './footer'; // <--- Naya Footer component import kiya

function Layout({ children }) { 
    return (
        <div>
            <Navbar/> 
            
            <main style={{ minHeight: 'calc(100vh - 150px)' }}> {/* Height adjust kiya taaki footer bottom mein rahe */}
                {children}
            </main>
            
            <Footer /> {/* <--- Footer ko yahan laga diya */}
        </div>
    );
}
// ...

export default Layout