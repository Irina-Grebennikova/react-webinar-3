import StoreModule from "../module";

/**
 * Информация о состоянии авторизации
 */
class AuthState extends StoreModule {

  initState() {
    return {
      token: localStorage.getItem('prefix-token') ?? '',
      username: localStorage.getItem('prefix-username') ?? '',
      userData: {},
      error: null,
      waiting: false, // признак ожидания загрузки
    }
  }

  /**
   * Авторизация пользователя
   * @param formData {Object}
   * @param formData.login {string}
   * @param formData.passford {string}
   * @return {Promise<void>}
   */
  async login({login, password}) {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.data.issues[0].message);
      }
      const token = json.result.token;
      const username = json.result.user.profile.name;

      // Авторизация прошла успешно
      this.setState({
        token,
        username,
        error: null,
        waiting: false
      }, 'Пользователь авторизован');

      localStorage.setItem('prefix-token', token);
      localStorage.setItem('prefix-username', username);

    } catch (e) {
      // Ошибка при логине
      this.setState({
        token: '',
        error: e?.message || 'Неизвестная ошибка',
        waiting: false
      });
    }
  }

  async logout() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Успешный выход из профиля
      this.setState({
        ...this.initState,
        token: '',
        username: '',
      }, 'Пользователь разлогинился');

      localStorage.setItem('prefix-token', '');
      localStorage.setItem('prefix-username', '');

    } catch (e) {
      // Ошибка при выходе из профиля
      this.setState({
        waiting: false
      });
      console.error(e);
    }
  }
}

export default AuthState;
