/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    const {[code]: itemToDelete, ...restItems} = this.state.cart;

    this.setState({
      ...this.state,
      // Новый объект корзины, в котором не будет удаляемого товара
      cart: restItems
    })
  };

    /**
   * Добавление товара в корзину
   * @param item
   */
  addToCart(item) {
    const quantity = this.state.cart[item.code]?.quantity + 1 || 1;

    this.setState({
      ...this.state,
      // Новый объект корзины, в который либо добавляем новый товар, либо увеличиваем количество существующего 
      cart: { ...this.state.cart, [item.code]: { ...item, quantity } }
    })
  }
}

export default Store;
