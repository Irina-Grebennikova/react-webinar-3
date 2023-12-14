import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import HeaderTop from "../../components/header-top";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";

function UserBar() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    username: state.auth.username,
    isWaiting: state.auth.waiting,
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  const content = select.username ? (
    <>
      <Link to={"/profile"}>{select.username}</Link>
      <button onClick={callbacks.logout} disabled={select.isWaiting}>
        {t("signOut")}
      </button>
    </>
  ) : (
    <Link to={"/login"}>
      <button>{t("signIn")}</button>
    </Link>
  );

  return <HeaderTop>{content}</HeaderTop>;
}

export default memo(UserBar);
