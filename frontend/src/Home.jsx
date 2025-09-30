

import './Home.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useReducer } from 'react'
import { Link, } from "react-router";
import { useNavigate } from 'react-router'
import Navbar from './components/navbar';
import Footer from './components/footer';
import Swal from 'sweetalert2'

function Home() {

const navigate = useNavigate()

const initialval = {
  product : [],
  search : "",

}

const handleval = (olddata , action)=>{
  if(action.type==="array"){
return {
  ...olddata , product : action.value
}
  }
  if(action.type==="search"){
    return {
      ...olddata , search : action.value
    }
  }
}

  const [newdata , dispatch] = useReducer(handleval,initialval)

        const productapi = async ()=>{
    try {
       const res = await axios.get("http://localhost:3020/Products/hello",)
    if(res.status===200){
      
      dispatch({
        type : "array",
        value : res.data.data
      })

 
    }else{
      alert(res.message)
    }
    } catch (error) {
      alert(error.message)
    }
   
  }

  useEffect(()=>{

productapi()
  },[])



  const searchapi = async ()=>{

    const res = await axios.get(`http://localhost:3020/Products/search?q=${newdata.search}`, { headers: { "Content-Type": "application/json"}})
    if(res.status===200){
      dispatch({
        type : "array",
        value : res.data.data
      })


    }
  }






const addcartapi = async (productid)=>{
  try {
    const x = localStorage.getItem("userid")
    const token = localStorage.getItem("token")
  console.log(token);
  
    const payload = {
    userid : x,
    ProductId : productid,
    quantity : 1
  }
  
  const res = await  axios.post("http://localhost:3020/Cart/cart",payload ,{  headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },})
  if(res.status===200){
     const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Add to card successfully"
    
    });
  }else {
    alert(res.data.message)
  }
  } catch (error) {
    alert(error.message)
  }

}


  return (
    
    
  <div className="container py-2">
     
    {/* <Navbar/> */}



          <form className="d-flex mx-auto my-2 my-lg-0 w-50">
  
              <input className="form-control me-2 mt-4" type="search" placeholder="Search products..." aria-label="Search"onChange={(e)=>{
               
                if(e.target.value === ""){
                
               productapi()
                }else{ dispatch({
                  type : "search",
                  value : e.target.value
                })
              }}}
               />
              <button className="btn btn-outline-success mt-4" type="button"onClick={(e)=>{
                   e.preventDefault(); 
                searchapi()
              }} >Search</button>
              
            </form>


      <h1 className="text-center mb-4"></h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {newdata.product.length > 0 ? (
          newdata.product.map((ele) => (
            <div key={ele.id} className="col">
              <div className="card h-100 shadow-sm rounded-3">
                <div className="text-center p-3">
                  <img
                    src={`http://localhost:3020/uploads/${ele.url}`}
                    className="card-img-top w-75 mx-auto"
                    alt={ele.productName}
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
                <h5 className="card-header text-center">
                  {ele.productName}
                </h5>
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title text-primary">{`Price : ₹${ele.productPrice}`}</h5>
                  <p className="card-text text-muted">{ele.category}</p>
                   <p className="card-text text-muted">Rating 4.5</p>
                  {/* <a href="#" className="btn btn-primary mt-auto">
                    Add to cart
                  </a> */}
                  <button type="button" className='btn btn-primary mt-auto'onClick={()=>{
                    addcartapi(ele.id)
                  }}>Add to cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            No products found.
          </div>
        )}
      </div>

{/* <Footer/> */}


    </div>
  )
}

export default Home
