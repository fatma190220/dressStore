import Button from '../../../component/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Done({ title, text, buttonTitle, redirectTo = "/products" }) {
  const navigate = useNavigate();
  const { t } = useTranslation("result");

  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center my-5 gap-4 p-4 container"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <i className="bi bi-check-circle-fill fs main-color" style={{ fontSize: "200px" }}></i>
        <h3 className="fs-5">{title || t("done.titleDefault")}</h3>
        <p>{text || t("done.textDefault")}</p>

        <Button
          title={buttonTitle || t("done.shopNow")}
          style={{ width: '50%' }}
          onClick={() => navigate(redirectTo)}
        />
      </div>
    </div>
  );
}
