import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");

      console.log('cod from url', code);
      

      if (code) {
        try {
          const response = await axios.post("/auth/google/confirm-google-auth", { code });
          const { accessToken } = response.data.data;
          localStorage.setItem("accessToken", accessToken);
          navigate("/");
        } catch (error) {
          console.error("Error logging in with Google:", error);
        }
      }
    };

    handleGoogleLogin();
  }, [location, navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleAuthCallback;
