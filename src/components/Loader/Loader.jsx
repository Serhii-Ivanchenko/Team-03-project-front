import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";
import { useTranslation } from "react-i18next";

export default function Loader() {
  const { t } = useTranslation();
  return (
    <div className={css.loader}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#fff"
        secondaryColor="#9BE1A0"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>{t('loading_message')}</p>
    </div>
  );
}
