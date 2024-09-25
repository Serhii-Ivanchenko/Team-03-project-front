import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logInWithGoogle } from "../../redux/user/operations.js";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const GoogleAuthCallback = () => {
  const { t } = useTranslation();
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

  return <div>{t("logging_in_google")}</div>;
};

export default GoogleAuthCallback;
