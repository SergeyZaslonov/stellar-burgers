import {
  addIngredient,
  clearOrder,
  moveIngredient,
  orderBurgerSlice,
  removeIngredient,
  TOrderBurgerState
} from './burgerConstructorSlice';

describe('Проверка редьюсера orderBurgerSlice', () => {
  const initialState: TOrderBurgerState = {
    bun: null,
    ingredients: [],
    loading: false,
    order: null,
    error: undefined
  };

  const bun = {
    id: '111111',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
};

  const main = {
    id: '222222',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const sauce = {
    id: '333333',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  };

  const filledState: TOrderBurgerState = {
    bun: bun,
    ingredients: [main, sauce],
    loading: false,
    order: null,
    error: undefined
  };

  it('Добавление булки addIngredient()', () => {
    const newState = orderBurgerSlice.reducer(initialState, addIngredient(bun));
    expect(newState.bun).toEqual(bun);
  });

  it('Добавление начинки addIngredient()', () => {
    const newState = orderBurgerSlice.reducer(
      initialState,
      addIngredient(main)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState).toEqual({ ...initialState, ingredients: [main] });
  });

  it('Удаление начинки removeIngredient()', () => {
    let newState = orderBurgerSlice.reducer(
      filledState,
      removeIngredient(sauce)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients).toEqual([main]);
    newState = orderBurgerSlice.reducer(newState, removeIngredient(main));
    expect(newState.ingredients).toHaveLength(0);
  });

  it('Изменение порядка ингредиентов moveIngredient()', () => {
    let newState = orderBurgerSlice.reducer(
      filledState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(newState.ingredients[0]).toEqual(sauce);
    expect(newState.ingredients[1]).toEqual(main);
    newState = orderBurgerSlice.reducer(
      newState,
      moveIngredient({ fromIndex: 1, toIndex: 0 })
    );
    expect(newState.ingredients[0]).toEqual(main);
    expect(newState.ingredients[1]).toEqual(sauce);
  });

  it('Очистка конструктора clearOrder()', () => {
    const newState = orderBurgerSlice.reducer(filledState, clearOrder());
    expect(newState).toEqual(initialState);
  });
});
