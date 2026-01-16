import React from 'react'
import Button from '../../../component/Button'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'; 

export default function Section() {
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  return (
    <div id='section'>
      <div id='section-content'>
        <h1 className='mb-5'>
          <span className='main-color'>{t("section.highlight")}</span>
          {t("section.title").replace(t("section.highlight"), "")}
        </h1>
        <p>{t("section.description")}</p>
        <Button title={t("buttons.ourProducts")} onClick={() => navigate("/products")} />
      </div>
    </div>
  )
}
