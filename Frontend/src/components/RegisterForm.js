// import React from "react";
// import "./RegisterStyles.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";

// const RegisterForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     console.log(data);
//     axios.post("http://localhost:8080/users", data)
//       .then(res => {
//         alert(res.data.message);
//         console.log(res);
//         navigate("/login");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="register">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <h1>Registration</h1>
//         </div><br/>

//         <div>
//           <label className="label">UserName</label>
//           <br />
//           <input
//             type="text"
//             name="userName"
//             placeholder="Enter Your Name"
//             {...register("userName", { required: true })}
//           />
//           <p className="error">{errors.userName?.type === "required" && "UserName is required."}</p>
//         </div>

//         <div>
//           <label className="label">Email Address</label>
//           <br />
//           <input
//             type="text"
//             name="email"
//             placeholder="Enter Your Email"
//             {...register("email", {
//               required: true,
//               pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//             })}
//           />
//           <p className="error">
//             {errors.email?.type === "required" && "Email is required."}
//             {errors.email?.type === "pattern" && "This is not a valid email format!"}
//           </p>
//         </div>

//         <div>
//           <label className="label">Mobile Number</label>
//           <br />
//           <input
//             type="number"
//             name="mobNumber"
//             placeholder="Enter Your Mobile Number"
//             {...register("mobNumber", { minLength: 10, maxLength: 10 })}
//           />
//           <p className="error">
//             {errors.mobNumber?.type === "minLength" && "Mobile number should be 10 digits"}
//             {errors.mobNumber?.type === "maxLength" && "Mobile number should be 10 digits"}
//           </p>
//         </div>

//         <div>
//           <label className="label">Password</label>
//           <br />
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Your Password"
//             {...register("password", { required: true })}
//           />
//           <p className="error">{errors.password?.type === "required" && "Password is required."}</p>
//         </div>

//         <div>
//           <label className="label">Date of Birth</label>
//           <br />
//           <input
//             type="date"
//             name="dob"
//             {...register("dob")}
//           />
//         </div>

//         <div>
//           <label className="label">Street</label>
//           <br />
//           <input
//             type="text"
//             name="street"
//             placeholder="Enter Your Street"
//             {...register("street")}
//           />
//         </div>

//         <div>
//           <label className="label">City</label>
//           <br />
//           <input
//             type="text"
//             name="city"
//             placeholder="Enter Your City"
//             {...register("city")}
//           />
//         </div>

//         <div>
//           <label className="label">PinCode</label>
//           <br />
//           <input
//             type="text"
//             name="pincode"
//             placeholder="Enter Your Pincode"
//             {...register("pincode")}
//           />
//         </div>

//         <div>
//           <button className="button">Register</button><br />
//         </div><br /><br/>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;


import React from "react";
import "./RegisterStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:8080/users", data)
      .then(res => {
        alert(res.data.userName+" registered successfully ! ,Now you can login .");
        console.log(res);
        navigate("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Registration</h1>
        </div><br />

        <div>
          <label className="label">UserName</label>
          <br />
          <input
            type="text"
            name="userName"
            placeholder="Enter Your Name"
            {...register("userName", {
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters long" },
              pattern: {
                value: /^[^\d].*$/,
                message: "Username cannot start with a digit"
              }
            })}
          />
          <p className="error">{errors.userName && errors.userName.message}</p>
        </div>

        <div>
          <label className="label">Email Address</label>
          <br />
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <p className="error">
            {errors.email?.type === "required" && "Email is required."}
            {errors.email?.type === "pattern" && "This is not a valid email format!"}
          </p>
        </div>

        <div>
          <label className="label">Mobile Number</label>
          <br />
          <input
            type="number"
            name="mobNumber"
            placeholder="Enter Your Mobile Number"
            {...register("mobNumber", { minLength: 10, maxLength: 10 })}
          />
          <p className="error">
            {errors.mobNumber?.type === "minLength" && "Mobile number should be 10 digits"}
            {errors.mobNumber?.type === "maxLength" && "Mobile number should be 10 digits"}
          </p>
        </div>

        <div>
          <label className="label">Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" },
              maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
            })}
          />
          <p className="error">{errors.password && errors.password.message}</p>
        </div>

        <div>
          <label className="label">Date of Birth</label>
          <br />
          <input
            type="date"
            name="dob"
            {...register("dob", {
              required: "Date of birth is required",
              validate: {
                isDateBeforeToday: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  return selectedDate < today || "Date of birth must be before today";
                }
              }
            })}
          />
          <p className="error">{errors.dob && errors.dob.message}</p>
        </div>

        <div>
          <label className="label">Street</label>
          <br />
          <input
            type="text"
            name="street"
            placeholder="Enter Your Street"
            {...register("street")}
          />
        </div>

        <div>
          <label className="label">City</label>
          <br />
          <input
            type="text"
            name="city"
            placeholder="Enter Your City"
            {...register("city", {
              required: "City is required",
              pattern: {
                value: /^[^0-9]*$/,
                message: "City must not contain numbers"
              }
            })}
          />
          <p className="error">{errors.city && errors.city.message}</p>

        </div>

        <div>
          <label className="label">PinCode</label>
          <br />
          <input
            type="text"
            name="pincode"
            placeholder="Enter Your Pincode"
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Pincode must contain only digits"
              }
            })}
          />
          <p className="error">{errors.pincode && errors.pincode.message}</p>

        </div>

        <div>
          <button className="button">Register</button><br />
        </div><br /><br />
      </form>
    </div>
  );
};

export default RegisterForm;