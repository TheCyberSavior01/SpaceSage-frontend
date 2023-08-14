import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../firebase/firebase.auth";
import { useStateValue } from "../provider/StateProvider";
import { actionType } from "../provider/reducer";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [{loading}, dispatch] = useStateValue();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("Logged In Successfully!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      })
      .catch((error) => {
        setShowError(true);
        const errMessage = error.message;
        setErrorMessage(errMessage.substring(10, 50));
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      });

    form.reset();
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">Sign In</h1>
      <div className="flex flex-wrap items-center justify-center px-5 lg:px-10">
        <div className="w-[67%] md:w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1609770231080-e321deccc34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlY3VyaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="lock and key"
            className="w-[90%] h-[350px] lg:h-[450px] rounded-lg"
          />
        </div>
        <div className="w-[67%] md:w-[40%] lg:w-[30%] lg:ml-12 mt-10 lg:mt-0">
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="w-full mb-5 transition ease-in-out rounded text-gray-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full mb-5 transition ease-in-out rounded text-gray-500 "
                required
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute top-3 right-3 cursor-pointer text-xl"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="absolute top-3 right-3 cursor-pointer text-xl"
                  onClick={() => setShowPassword(true)}
                />
              )}
              <Link>
                <p className="text-sm absolute text-[#DA4167] font-semibold right-0 top-12 hover:underline">
                  Forgot Password ?
                </p>
              </Link>
            </div>
            {errorMessage.length > 0 && showError && (
              <span className="block sm:inline text-red-700">
                {errorMessage}
              </span>
            )}
            <button className="bg-btnColor text-white w-full py-2 rounded font-bold mt-5 hover:bg-hoverBtnColor transition duration-300 ease-in-out">
              Sign In
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold leading-6 text-[#DA4167]"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
