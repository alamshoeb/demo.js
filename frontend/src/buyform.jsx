import axios from "axios"
import { useReducer } from "react"
import { useLocation } from "react-router-dom"; // 
import Swal from 'sweetalert2'
import { useNavigate } from "react-router";

export default function Buy(){

  const navigate = useNavigate()

    const location = useLocation();
//  const fetchedTotal = location.state ? location.state.total : 0;
const fetchedTotal = location.state.total
    const ival = {
        userId : "",
        name : "",
        address : "",
        paymentMode : "",
        phoneNumber : "",
        totalAmount : fetchedTotal
    }

const handle = (olddata , action)=>{
    if(action.type==="form")
    {
        return {
            ...olddata , [action.key] : action.value , userId : localStorage.getItem("userid")
        }
    }
  
}

const [newdata , dispatch] = useReducer(handle,ival)

const senddetails = async ()=>{
    try {console.log(newdata);
      
        if ( !newdata.name || !newdata.address || !newdata.phoneNumber || !newdata.paymentMode ) {
                 Swal.fire( "All fields are required");
                return; // Agar koi field empty hai toh API call mat karo
            }
    
         const res = await axios.post("http://localhost:3020/Order/add",newdata, { headers: { "Content-Type": "application/json"}})
    if(res.status==200){
  const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "success",
  title: "Order placed successfully"

});
  navigate("/")
    }else{
    
        Swal("Error", res.data.message, "error")
    }
    } catch (error) {
      
        Swal("Error", error.message, "error")
    }
   
}







    return (
  <div style={{width : "30vw"}} className="container my-5 ">
  <h2 className="text-center mb-4 fw-bold" style={{ color: "#0052d4" }}>
    Buy Product
  </h2>

  <form className="p-4 border rounded shadow-lg bg-white " style={{ borderRadius: "15px" }}>
    {/* Full Name */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        className="form-control"
        onChange={(e) =>
          dispatch({
            type: "form",
            key: e.target.name,
            value: e.target.value,
          })
        }
        required
      />
    </div>

    {/* Address */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Address</label>
      <input
        type="text"
        name="address"
        placeholder="Enter delivery address"
        className="form-control"
        onChange={(e) =>
          dispatch({
            type: "form",
            key: e.target.name,
            value: e.target.value,
          })
        }
      />
    </div>

    {/* Phone Number */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Phone Number</label>
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Enter your phone number"
        className="form-control"
        onChange={(e) =>
          dispatch({
            type: "form",
            key: e.target.name,
            value: e.target.value,
          })
        }
      />
    </div>

    {/* Total Amount */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Total Amount</label>
      <input
        type="number"
        name="totalAmount"
        placeholder="Enter total amount"
        className="form-control"
        value={newdata.totalAmount}
        // onChange={(e) =>
        //   dispatch({
        //     type: "form",
        //     key: e.target.name,
        //     value: e.target.value,
        //   })
        // }
      />
    </div>

    {/* Payment Mode Dropdown */}
    <div className="mb-4">
      <label className="form-label fw-semibold">Payment Mode</label>
      <select
        name="paymentMode"
        className="form-select"
        onChange={(e) =>
          dispatch({
            type: "form",
            key: e.target.name,
            value: e.target.value,
          })
        }
      >
        <option value=""> Select Payment Mode </option>
        <option value="cod">Cash on Delivery</option>
        <option value="upi">UPI</option>
        <option value="card">Credit / Debit Card</option>
        <option value="netbanking">Net Banking</option>
      </select>
    </div>

    {/* Submit Button */}
    <button
      type="button"
      className="btn btn-success w-100 py-2 fw-bold"
      onClick={() => {
        senddetails();
      }}
    >
      ✅ Confirm Order
    </button>
  </form>
</div>

    )
}