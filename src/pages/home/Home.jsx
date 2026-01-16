import Header from '../../component/Header';
import Slider from './components/Slider';
import Tools from './components/Tools';
import ProductsCards from './components/productsCards';
import Section from './components/Section';
import Latestblogs from './components/Latestblogs';
import Footer from '../../component/Footer';
import { useSettings } from '../../hooks/useSettings'; // استيراد الهوك

export default function Home() {
  const { data: settings, isLoading, isError } = useSettings(); // استخدام الهوك

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError || !settings) return <p>حدث خطأ أثناء تحميل الإعدادات</p>;

  return (
    <div>
      <Header />
      <Slider />
      <div className='container d-flex flex-column flex-md-row gap-4 justify-content-center'>
        <Tools
          src="https://websitedashboard.maximcenter.com/uploads/settings/nadvwhH7jbTjdQfSjUDDt9SzWFnq17Oo7LNxYsYU.png"
          title={settings.icon_1_title}
          text={settings.icon_1_description}
        />
        <Tools
          src="https://websitedashboard.maximcenter.com/uploads/settings/Q3n58IUaHX6CKBpIAdxJH5FuALSZKB4JSwmEH5sa.png"
          title={settings.icon_2_title}
          text={settings.icon_2_description}
        />
        <Tools
          src="https://websitedashboard.maximcenter.com/uploads/settings/nadvwhH7jbTjdQfSjUDDt9SzWFnq17Oo7LNxYsYU.png"
          title={settings.icon_3_title}
          text={settings.icon_3_description}
        />
      </div>
      <ProductsCards />
      <Section />
      <Latestblogs />
      <Footer />
    </div>
  );
}
