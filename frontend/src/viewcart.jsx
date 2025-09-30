import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'



export default function ViewCart() {
  const [newdata, setdata] = useState([]);
  const x = localStorage.getItem("userid");
 const navigate = useNavigate()


 
  const viewcartapi = async () => {

   

    try {
      const res = await axios.get(`http://localhost:3020/Cart/get/${x}`);
      if (res.status === 200) {
        setdata(res.data.data);
      } else {
         setdata([]);
      }
    } catch (error) {
      setdata([]);
    }
  };




const delcart = async (id) => {
  try {
    // confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    // agar user confirm kare
    if (result.isConfirmed) {
      const res = await axios.delete(`http://localhost:3020/Cart/del/${id}`);

      if (res.status === 200) {
        await Swal.fire({
          title: "Remove!",
          text: "Item removed from cart.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        await viewcartapi(); // cart refresh
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};



  useEffect(() => {
    viewcartapi();
  }, []);

  return (

    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 My Cart</h2>

    {
      newdata.length ?  <div className="row justify-content-center">
        {newdata.map((ele) => (
          <div className="col-md-4 mb-4" key={ele.id}>
            <div className="card shadow-lg">
              <div className="d-flex justify-content-center p-3">
                <img
                  src={`http://localhost:3020/uploads/${ele.Product.url}`} // update path as per your backend static file setup
                  className="card-img-top w-50"
                  alt={ele.Product.productName}
                />
              </div>
              <h5 className="card-header">{ele.Product.productName}</h5>
              <div className="card-body">
                <h5 className="card-title">₹{ele.Product.productPrice}.00</h5>
                <p className="card-text">{ele.Product.description}</p>
                <p className="card-text">
                  <strong>Quantity:</strong> {ele.quantity}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {ele.Product.category}
                </p>
                {/* <a href="#" className="btn btn-primary">
                  Checkout
                </a> */}'
                <button className="btn btn-primary w-25" type="button"onClick={()=>{
                  navigate("/buy", { state: { total: ele.Product.productPrice }})
                }}>Buy</button>
                 <button className="btn btn-secondary mx-2" type="button"onClick={()=>{
                  delcart(ele.id)
                 }}>Remove from Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div> :  <div className="col-12 text-center text-muted">
            No products in Cart.
          </div>
    }
     
    </div>
  );
}
