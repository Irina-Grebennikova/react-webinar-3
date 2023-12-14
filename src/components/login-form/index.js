import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from "../../hooks/use-translate";
import './style.css';

function LoginForm(props) {
  const cn = bem('Login');
  const {t} = useTranslate();

  return (
    <section className={cn()}>
      <h2 className={cn('title')}>{t('signIn')}</h2>
      <form className={cn('form')} onSubmit={props.handleSubmit}>
        <label>
          <div>{t('login')}</div>
          <input name="login" autoComplete="username"/>
        </label>
        <label>
          <div>{t('password')}</div>
          <input type="password" name="password" autoComplete="password"/>
        </label>
        {props.error && <p className={cn('error')}>{props.error}</p>}
        <button type="submit" disabled={props.isSubmitting}>{t('signInButton')}</button>
      </form>
    </section>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

LoginForm.defaultProps = {
  handleSubmit: (e) => {},
}

export default memo(LoginForm);