import React from 'react';
import Done from '../../login/components/Done';
import { useTranslation } from 'react-i18next';

export default function PaymentSuccess() {
  const { t } = useTranslation("order"); // 🟢 الـ namespace بتاع الترجمة

  return (
    <div>
      <Done
        title={t("paymentSuccess.title")}
        text={t("paymentSuccess.text")}
        buttonTitle={t("paymentSuccess.button")}
        redirectTo="/rating"   // 🟢 هنا الصفحة اللي يروحها عند الضغط على الزر
      />
    </div>
  );
}
