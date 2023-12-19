// Начальное состояние
export const initialState = {
  list: [],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state,  list: [], waiting: true};

    case "comments/load-success":
      return {...state, list: action.payload.list, waiting: false};

    case "comments/load-error":
      return {...state,  list: [], waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;