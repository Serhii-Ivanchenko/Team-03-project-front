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
      

    //   if (code) {
    //     try {
    //       const response = await axios.post("/auth/google/confirm-google-auth", { code });
    //       const { accessToken } = response.data.data;
    //       localStorage.setItem("accessToken", accessToken);
    //       navigate("/tracker");
    //     } catch (error) {
    //       console.error("Error logging in with Google:", error);
    //     }
    //   }
    // };
if (code) {
        try {
          const response = await axios.post("/auth/google/confirm-google-auth", { code });
          console.log('Response from server:', response);  // Log full response
          const { accessToken } = response.data.data;
          console.log('Access Token:', accessToken);  // Check accessToken

          localStorage.setItem("accessToken", accessToken);
          console.log('Token stored in localStorage');
          
          navigate("/tracker");
          console.log('Navigating to /tracker');  // Log the navigation
        } catch (error) {
          console.error("Error logging in with Google:", error);
        }
      } else {
        console.error("No code present in URL");
      }
    };

    handleGoogleLogin();
  }, [location, navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleAuthCallback;
