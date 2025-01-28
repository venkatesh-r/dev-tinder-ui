import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Sorry something went wrong!");
      console.log(err);
    }
  };

  const signUpHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      console.log(res.data.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "SignUp"}</h2>

          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="Type your first name"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs mt-2">
                <div className="label">
                  <span className="label-text font-bold">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Type your last name"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>{" "}
            </>
          )}

          <label className="form-control w-full max-w-xs mt-2">
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
          <label className="form-control w-full max-w-xs mt-2">
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
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center mt-10">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? loginHandler : signUpHandler}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer mt-5 text-blue-400"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm
              ? "New User? Signup here"
              : "Existing User? Login here!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
