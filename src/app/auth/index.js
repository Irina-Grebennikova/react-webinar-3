import {memo, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import UserBar from '../../containers/user-bar';

/**
 * Страница авторизации
 */
function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    token: state.auth.token,
    error: state.auth.error,
    waiting: state.auth.waiting,
  }));

  useEffect(() => {
    if (select.token) {
      navigate('/');
    }
  }, [select.token]);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const userData = {
      login: formData.get('login'),
      password: formData.get('password'),
    }
    await store.actions.auth.login(userData);
  }

  return (
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm handleSubmit={handleSubmit} error={select.error} isSubmitting={select.waiting}/>
    </PageLayout>
  );
}

export default memo(Auth);
