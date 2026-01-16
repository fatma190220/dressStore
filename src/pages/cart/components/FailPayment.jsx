import React from 'react';
import Stepper from './Stepper';
import Button from '../../../component/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FailPayment() {
  const navigate = useNavigate();
  const { t } = useTranslation("order"); // نفس الـ namespace

  return (
    <div>
      <Stepper />
      <div
        className="d-flex flex-column justify-content-center align-items-center my-5 gap-4 p-4 container"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <img src="/assets/Group.jpg" className="rounded-circle" alt="failed payment" />
        <h3 className="fs-5">{t("paymentFail.title")}</h3>
        <p>{t("paymentFail.text")}</p>
        <Button
          title={t("paymentFail.button")}
          style={{ width: '50%' }}
          onClick={() => navigate('/paymethod')}  // عدلنا هنا عشان يرجع لصفحة اختيار طريقة الدفع
        />
      </div>
    </div>
  );
}
