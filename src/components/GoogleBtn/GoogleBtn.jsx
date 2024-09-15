import css from "./GoogleBtn.module.css";
import { FcGoogle } from "react-icons/fc";

const Button = ({ children, type = "button", onClick, ...props }) => {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const GoogleBtn = ({ context, onClick }) => {
  return (
    <Button className={css.google_btn} onClick={onClick}>
      <FcGoogle className={css.icon_google} />
      {context}
    </Button>
  );
};

export default GoogleBtn;
