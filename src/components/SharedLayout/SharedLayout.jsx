import css from "./Layout.module.css";

export default function SharedLayout({ children }) {
  return <div className={css.appContainer}>{children}</div>;
}
