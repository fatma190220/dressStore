import React from 'react'
import Done from '../../login/components/Done'
import { useTranslation } from 'react-i18next'

export default function SavedChanges() {
  const { t } = useTranslation("profile");

  return (
    <div>
        <Done title={t("profile.savedChanges.title")} />
    </div>
  )
}
