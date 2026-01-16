import React from "react";
import Aboutsection from './components/Aboutsection';
import Tools from '../home/components/Tools';
import Team from './components/team';
import { useSettings } from "../../hooks/useSettings"; // استيراد الهوك

export default function Aboutus() {
  const { data: settings, isLoading, isError } = useSettings();

  if (isLoading) return <p>جاري تحميل البيانات...</p>;
  if (isError) return <p>حدث خطأ في تحميل البيانات</p>;

  return (
    <div>
      <Aboutsection />

      <div className='container d-flex flex-column flex-md-row gap-4 justify-content-center'>
        <Tools
          src="https://websitedashboard.maximcenter.com/uploads/settings/nadvwhH7jbTjdQfSjUDDt9SzWFnq17Oo7LNxYsYU.png"
          title={settings.icon_4_title}
          text={settings.icon_4_description}
        />
        <Tools
          src="https://websitedashboard.maximcenter.com/uploads/settings/nadvwhH7jbTjdQfSjUDDt9SzWFnq17Oo7LNxYsYU.png"
          title={settings.icon_5_title}
          text={settings.icon_5_description}
        />
      </div>

      <Team />
    </div>
  );
}
