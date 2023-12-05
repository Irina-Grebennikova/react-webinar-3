import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      description: '',
      madeIn: {
        title: '',
        code: ''
      },
      category: {
        title: ''
      },
      edition: '',
      price: '',
    }
  }

  async load(id) {
    const QUERY = '?fields=title,description,madeIn(title,code),category(title),edition,price,images';
    const response =
      await fetch(`/api/v1/articles/${id}${QUERY}`);
    const json = await response.json();
    this.setState(json.result, 'Загружен товар по id из АПИ');
  }
}

export default Product;
