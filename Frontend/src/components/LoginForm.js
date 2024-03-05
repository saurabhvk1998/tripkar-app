// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import "./LoginFormStyles.css"
// import { useNavigate } from "react-router-dom"
// import { updateId } from "../app/idSlice";
// import { useDispatch } from 'react-redux';

// const LoginForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:8080/users/validate", data);
//       console.log(response.data.id);
//       dispatch(updateId(response.data.id));
      
//       alert("Welcome "+response.data.userName+" , you have logged in successfully !")

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="custom-login">
//       <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <h1>Login</h1>
//         </div><br/>
//         <div>
//           <label className='label'>Email</label>
//           <br />
//           <input
//             type="text"
//             {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
//           />
//           {errors.email && <span className="error">{errors.email.message}</span>}
//         </div>

//         <div>
//           <label className='label'>Password</label><br />
//           <input
//             type="password"
//             {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
//           />
//           {errors.password && <span className="error">{errors.password.message}</span>}
//         </div>

//         <div className="div">
//           <button type="submit">Login</button>
//           <div><h4>or</h4></div>
//           <div>
//             <button onClick={() => navigate("/register")}>Register</button>
//           </div>
//         </div>
//         <br/>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;







import { useForm } from 'react-hook-form';
import axios from 'axios';
import "./LoginFormStyles.css"
import { useNavigate } from "react-router-dom"
import { updateId } from "../app/idSlice";
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios.post("http://localhost:8080/users/validate", data);
  //     console.log(response.data.id);
  //     dispatch(updateId(response.data.id));
      
  //     alert("Welcome "+response.data.userName+" , you have logged in successfully !")

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/users/validate", data);
      console.log(response.data.id);
      dispatch(updateId(response.data.id));
      console.log(response.data.email)
      if (response.data.email === "admin@gmail.com") {
        navigate("/createtour");
      } else {
        navigate("/");
      }
  
      alert("Welcome " + response.data.userName + ", you have logged in successfully !");
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="custom-login">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Login</h1>
        </div><br/>
        <div>
          <label className='label'>Email</label>
          <br />
          <input
            type="text"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div>
          <label className='label'>Password</label><br />
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="div">
          <button type="submit">Login</button>
          <div><h4>or</h4></div>
          <div>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
        <br/>
      </form>
    </div>
  );
};

export default LoginForm;