/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import { signInFailure, signInSuccess } from "../../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure());
        return;
      }
      dispatch(signInSuccess(data));
      navigate(location.state?.from || "/");
    } catch (error) {
      console.log("Couldn't connect to Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90 "
    >
      Continue with google
    </button>
  );
}
