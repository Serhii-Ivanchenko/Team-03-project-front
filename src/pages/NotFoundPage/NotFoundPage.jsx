import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div>
      <p>{t("not_found.title")}</p>
      <Link to="/">{t("not_found.linkText")}</Link>
    </div>
  );
}
