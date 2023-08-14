import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { createUser, logOut, setDisplayName } from "../firebase/firebase.auth";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    // Create a new User
    createUser(email, password)
      .then((result) => {
        updateDisplayName(name);
        logOut()
          .then()
          .catch((error) => console.log(error));
        toast.success("Successfully Signed Up! Login to Continue", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/sign-in");
      })
      .catch((error) => {
        const errMessage = error.message;
        setShowError(true)
        setErrorMessage(errMessage.substring(10, 50));
        setTimeout(() => {
          setShowError(false)
        }, 5000);
      });

    // Reset the form
    form.reset();
  };

  const updateDisplayName = (name) => {
    const profile = { displayName: name };
    setDisplayName(profile)
      .then(() => {
        console.log();
      })
      .catch((error) => console.log());
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">Sign Up</h1>
      <div className="flex flex-wrap items-center justify-center px-5 lg:px-5">
        <div className="w-[67%] md:w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1609770231080-e321deccc34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlY3VyaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="lock and key"
            className="w-[90%] h-[350px] lg:h-[450px] rounded-lg"
          />
        </div>
        <div className="w-[67%] md:w-[40%] lg:w-[30%] lg:ml-12 mt-10 lg:mt-0">
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full mb-5 transition ease-in-out rounded text-gray-500"
              required
            />
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
                className="w-full mb-5 transition ease-in-out rounded text-gray-500"
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
            </div>
            {errorMessage.length > 0 && showError && (
              <div
                className="mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {errorMessage}
                </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            <button className="bg-btnColor text-white w-full py-2 rounded font-bold">
              Sign Up
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-semibold leading-6 text-[#DA4167]"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
