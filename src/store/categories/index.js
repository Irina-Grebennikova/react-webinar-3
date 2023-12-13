import StoreModule from "../module";

/**
 * Список категорий для фильтров на странице каталога
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка списка категорий
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего списка категорий и установка признака ожидания загрузки
    this.setState({
      list: [],
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();

      // Категории загружены успешно
      this.setState({
        ...this.getState(),
        list: json.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        list: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;