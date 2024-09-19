import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logInWithGoogle } from "../../redux/user/operations.js";

import { useDispatch } from "react-redux";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleLogin = () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      if (code) {
        dispatch(logInWithGoogle(code)).then(() => {
          navigate("/tracker");
        });
      }
    };

    handleGoogleLogin();
  }, [location, navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleAuthCallback;
