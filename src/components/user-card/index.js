import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function UserCard({ user, t }) {
  return (
    <section className="UserCard">
      <h2 className="UserCard-title">{t("profile.title")}</h2>
      <div className="UserCard-list">
        <div>
          {t("profile.name")}: <b>{user?.name}</b>
        </div>
        <div>
          {t("profile.phone")}: <b>{user?.phone}</b>
        </div>
        <div>
          {t("profile.email")}: <b>{user?.email}</b>
        </div>
      </div>
    </section>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func,
};

UserCard.defaultProps = {
  user: {},
  t: () => {},
}

export default memo(UserCard);
