import css from "./GoogleBtn.module.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Button = ({ children, type = "button", onClick, ...props }) => {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const GoogleBtn = ({ context }) => {
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("/auth/google/get-oauth-url");
      const { url } = response.data.data;
      // Перенаправляем пользователя на страницу авторизации Google
      window.location.href = url;
    } catch (error) {
      console.error("Ошибка при получении URL для Google OAuth:", error);
    }
  };

  return (
    <Button className={css.google_btn} onClick={handleGoogleLogin}>
      <FcGoogle className={css.icon_google} />
      {context}
    </Button>
  );
};

// const GoogleBtn = ({ context, onClick }) => {
//   return (
//     <Button className={css.google_btn} onClick={onClick}>
//       <FcGoogle className={css.icon_google} />
//       {context}
//     </Button>
//   );
// };

export default GoogleBtn;
