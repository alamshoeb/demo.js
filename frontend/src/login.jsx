import axios from "axios"
import { useReducer } from "react"
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
export default function Login (){

const navigate = useNavigate()

    const ival = {
        email : "",
        password : ""
    }

    const handle = (olddata , action)=>{
        if(action.type==="login"){
            return {...olddata , [action.key] : action.value}
        }

    } 

    const [newdata , dispatch] = useReducer(handle,ival)

    const loginapi = async ()=>{
      
try {

  if ( !newdata.email || !newdata.password) {
           Swal.fire( "All fields are required");
          return; // Agar koi field empty hai toh API call mat karo
      }

    const res = await axios.post("http://localhost:3020/Users/login",newdata, { headers: { "Content-Type": "application/json"}} )
if(res.status===200){
    localStorage.setItem("token",res.data.token.excesstoken)
    localStorage.setItem("userid",res.data.token.id)
    console.log(res.data.token.id , res.data.token.excesstoken);

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
  title: "login in successfully"

});
 navigate("/")
}else{
     Swal.fire({
  position: "top-center",
  icon: "failed",
  title: "login failed",
  showConfirmButton: false,
  timer: 1500
});
    // alert(res.data.message)
}
} catch (error) {
    // Axios specific error handling
    if (error.response) {
        // Server ne response diya (e.g., 400, 401, 500)
        // alert(error.response.data.message || "invalid credentialsc"); 
           Swal.fire({
  position: "top-center",
  icon: "failed",
  title: "login failed",
  showConfirmButton: false,
  timer: 1500
});
    } else {
        // Network error ya koi aur issue
        // alert(error.message); 
           Swal.fire({
  position: "top-center",
  icon: "failed",
  title: "login failed",
  showConfirmButton: false,
  timer: 1500
});
    }
}


    }


    return (
<div
  className="d-flex justify-content-center align-items-center vh-100 px-3"
//   style={{ background: "linear-gradient(135deg, #4facfe, #0052d4)" }}
>
  <div
    className="card shadow-lg p-4 rounded-4 w-100"
    style={{
      maxWidth: "500px",
      backgroundColor: "#ffffffee",
    }}
  >
    <h2 className="text-center mb-3 fw-bold" style={{ color: "#0052d4" }}>
       Login 
    </h2>
    <p className="text-center text-muted mb-4">
      Login account and start buying today
    </p>

    <form>
   
  
      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">
          Email address
        </label>
        <input
          type="email"
          className="form-control rounded-3"
          id="email"
          placeholder="Enter your email"
          onChange={(e) =>
            dispatch({
              type: "login",
              key: e.target.id,
              value: e.target.value,
            })
          }
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-semibold">
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-3"
          id="password"
          placeholder="Enter your password"
          onChange={(e) =>
            dispatch({
              type: "login",
              key: e.target.id,
              value: e.target.value,
            })
          }
        />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        className="btn w-100 py-2 fw-semibold rounded-3 mt-3"
        style={{
          background: "linear-gradient(90deg, #4facfe, #0052d4)",
          border: "none",
          color: "#fff",
          fontSize: "1.1rem",
        }}
        onClick={() => {
          loginapi();
        }}
      >
        Login
      </button>

      {/* Redirect to Login */}
      <p className="text-center mt-3">
        Already have an account?{" "}
        <a
          href="/signup"
          className="fw-semibold"
          style={{ color: "#0052d4" }}
        >
          Signup
        </a>
      </p>
    </form>
  </div>
</div>
    )
}