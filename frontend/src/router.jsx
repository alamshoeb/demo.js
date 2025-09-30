import { createBrowserRouter} from 'react-router'

import About from './about'
import Login from './login'
import Signup from './signup'
import Layout from './components/layout'
import Home from './Home'
import ViewCart from './viewcart'
import Buy from './buyform'



const router = createBrowserRouter([
    {path : "/", element : <Layout><Home/></Layout>},
    {path : "/about", element : <Layout><About/></Layout>},
    {path : "/login", element : <Login/>},
    {path : "/signup" , element : <Signup/>},
    {path : "/cart" , element :  <Layout><ViewCart/></Layout>},
     {path : "/buy" , element : <Buy/>}
])

export default router