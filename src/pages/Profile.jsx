import React, { useState } from "react";
import { logOut, setDisplayName, setEmail } from "../firebase/firebase.auth.js";
import { useStateValue } from "../provider/StateProvider";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const [{ user }] = useStateValue();
  const { displayName, email } = user;
  const [userData, setUserData] = useState({
    userName: displayName,
    userEmail: email,
  });
  const [showSaveChanges, setShowSaveChanges] = useState(false);
  const [disabledInput, setDisabledInput] = useState(true);

  const handleEditProfile = () => {
    setShowSaveChanges(true);
    setDisabledInput(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  const handleConfirm = () => {
    setShowSaveChanges(false);
    setDisabledInput(true);

    if (userData.userName !== displayName && userData.userEmail !== email) {
      updateName(userData.userName);
      updateEmail(userData.userEmail);
      toast.success("Name and Email Updated!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (userData.userName !== displayName) {
      updateName(userData.userName);
      toast.success("Name Updated!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (userData.userEmail !== email) {
      updateEmail(userData.userEmail);
      toast.success("Email Updated!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const updateName = (name) => {
    const profile = {
      displayName: name,
    };
    setDisplayName(profile)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const updateEmail = (email) => {
    setEmail(email)
      .then(() => {})
      .then((error) => console.log(error));
  };

  const handleCancel = () => {
    setDisabledInput(true);
    setShowSaveChanges(false);
    setUserData({
      userName: user.displayName,
      userEmail: user.email,
    });
  };

  const handleSignOut = () => {
    logOut()
      .then(navigate("/"))
      .catch((error) => console.log(error));
  };
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mt-10">My Profile</h1>
      <div className="w-full md:w-[50%] px-5 mt-10 flex flex-col gap-3">
        <input
          name="userName"
          id="name"
          value={userData.userName}
          className="text-base rounded text-gray-400 border border-gray-400"
          disabled={disabledInput}
          onChange={handleInputChange}
        />
        <input
          name="userEmail"
          id="email"
          value={userData.userEmail}
          className="text-base rounded text-gray-400 border border-gray-400"
          disabled={disabledInput}
          onChange={handleInputChange}
        />
        <div className="flex items-center justify-between">
          {!showSaveChanges ? (
            <p
              onClick={handleEditProfile}
              className="cursor-pointer text-btnColor hover:text-hoverBtnColor transition duration-300 ease-in-out underline"
            >
              Edit Profile
            </p>
          ) : (
            <div className="flex items-center justify-evenly gap-5">
              <p className="text-[#3D2645] font-semibold">Save Changes: </p>
              <div className="flex items-center">
                <TiTick className="text-[#16a34a] text-xl" />
                <p
                  onClick={handleConfirm}
                  className="text-[#16a34a] hover:underline cursor-pointer"
                >
                  Confirm
                </p>
              </div>
              <div className="flex items-center">
                <GiCrossMark className="text-red-600 text-xl" />
                <p
                  onClick={handleCancel}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Cancel
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="bg-btnColor text-white px-3 py-1 rounded-lg sm:px-4 sm:py-2 hover:bg-hoverBtnColor transition duration-300 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
