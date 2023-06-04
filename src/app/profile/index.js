import {memo, useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import ProfileInfo from "../../components/profile-info";
import {Navigate, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";

function Profile() {

  const store = useStore();
  const {t} = useTranslate();
  const navigate = useNavigate();



  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogin: state.login.isLogin
  }));

  useEffect(() => {
    if (!select.isLogin) {
      navigate("/login");
    } else {
      store.actions.profile.getUser();
    }
  }, [select.isLogin]);



  return (
    <PageLayout>
      <Auth/>
      <Head title={t("title")}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo user={select.user} t={t}/>
    </PageLayout>
  );
}

export default memo(Profile);