import StoreModule from "../module";

/**
 * Информация о состоянии авторизации
 */
class AuthState extends StoreModule {

  initState() {
    return {
      token: localStorage.getItem('prefix-token') ?? null,
      userName: '',
      userData: {},
      error: null,
      successMessage: null,
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

      // Авторизация прошла успешно
      this.setState({
        token: json.result.token,
        name: json.result.user.profile.name,
        error: null,
        waiting: false
      }, 'Пользователь авторизован');

      localStorage.setItem('prefix-token', json.result.token);

    } catch (e) {
      // Ошибка при логине
      this.setState({
        token: null,
        error: e?.message || 'Неизвестная ошибка',
        waiting: false
      });
    }
  }
}

export default AuthState;
