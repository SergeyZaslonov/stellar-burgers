import {
  getAllIngredients,
  ingredientsSlice,
  initialState
} from './ingredientsSlice';

describe('Проверка редьюсера feedSlice', () => {
  const ingredientsTest = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  it('Проверка getAllIngredients экшен Request', () => {
    const state = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      getAllIngredients.pending('')
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка getAllIngredients экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getAllIngredients.rejected(testError, '')
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка getAllIngredients экшен Success', () => {
    const state = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getAllIngredients.fulfilled(ingredientsTest, '')
    );
    expect(state).toEqual({
      ...initialState,
      ingredients: ingredientsTest
    });
  });
});
