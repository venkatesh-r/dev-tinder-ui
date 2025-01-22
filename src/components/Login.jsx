import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("venky@gmail.com");
  const [password, setPassword] = useState("Venkat@123");

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">E-Mail</span>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Type your email"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text font-bold">Password</span>
            </div>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div className="card-actions justify-center mt-10">
            <button className="btn btn-primary" onClick={loginHandler}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
