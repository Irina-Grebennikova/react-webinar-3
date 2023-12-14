import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      userData: {},
      waiting: false, // признак ожидания загрузки
    };
  }

  async loadUser(token) {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Данные пользователя получены
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          userData: {
            ...json.result.profile,
            email: json.result.email,
          },
        },
        "Данные пользователя получены"
      );
    } catch (e) {
      // Ошибка при запросе данных пользователя
      this.setState({
        waiting: false,
      });
      console.error(e);
    }
  }
}

export default UserState;
