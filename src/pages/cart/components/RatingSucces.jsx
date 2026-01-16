import React from 'react';
import Done from '../../login/components/Done';
import { useTranslation } from 'react-i18next';

export default function RatingSucces() {
  const { t } = useTranslation("order"); // جلب الدالة t للترجمة

  return (
    <div>
      <Done
        title={t('ratingSuccess.title')} // استخدام مفتاح الترجمة
        text={t('ratingSuccess.text')}   // استخدام مفتاح الترجمة
      />
    </div>
  );
}
