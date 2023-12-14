import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import UserBar from '../../containers/user-bar';
import UserCard from '../../components/user-card';

/**
 * Профиль пользователя
 */
function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.auth.token,
    userData: state.auth.userData,
    waiting: state.auth.waiting,
  }));

  useEffect(() => {
    select.token ? store.actions.auth.loadUser() : navigate('/login');
  }, [select.token]);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting ?? false}>
        <UserCard user={select.userData} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
