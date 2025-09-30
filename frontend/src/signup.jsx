import axios from "axios"
import { useReducer } from "react"
import { useNavigate } from "react-router"
import Swal from 'sweetalert2'

export default function  Signup (){

    const navigate = useNavigate()

    const ival = {
        UserName : "",
        email : "",
        password : "",
        isActive : true
        }

        const handle = (olddata , action)=>{
            if(action.type==="signup"){
                return {...olddata , [action.key] : action.value}
            }
        }

    const  [newdata , dispatch] = useReducer(handle , ival)



    const signupapi = async ()=>{
        console.log(newdata);
        
        try {  if (!newdata.UserName || !newdata.email || !newdata.password) {
         Swal.fire( "All fields are required");
        return; // Agar koi field empty hai toh API call mat karo
    }
                const res = await axios.post("http://localhost:3020/Users/signup",newdata, { headers: { "Content-Type": "application/json"}})
        if(res.status===201){
           localStorage.setItem("token",res.data.data.excesstoken)
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
            title: "signup successfully"
          
          });
            navigate("/")
        }else {
          Swal.fire("Error", res.data.message, "error");
        }
        } catch (error) {
         
            Swal.fire("Error", error.message, "error");
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
      Signup 
    </h2>
    <p className="text-center text-muted mb-4">
      Create your account and start buying today
    </p>

    <form>
      {/* Username */}
      <div className="mb-3">
        <label htmlFor="UserName" className="form-label fw-semibold">
          Username
        </label>
        <input
          type="text"
          className="form-control rounded-3"
          id="UserName"
          placeholder="Enter your username"
          onChange={(e) =>
            dispatch({
              type: "signup",
              key: e.target.id,
              value: e.target.value,
            })
          }
        />
      </div>

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
              type: "signup",
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
              type: "signup",
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
          signupapi();
        }}
      >
        Signup
      </button>

      {/* Redirect to Login */}
      <p className="text-center mt-3">
        Already have an account?{" "}
        <a
          href="/login"
          className="fw-semibold"
          style={{ color: "#0052d4" }}
        >
          Login
        </a>
      </p>
    </form>
  </div>
</div>

    )
}