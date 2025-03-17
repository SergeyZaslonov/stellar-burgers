import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  setIsAuthChecked,
  initialState,
  updateUser,
  userSlice
} from './userSlice';

describe('Проверка аутентификации и слайса пользователя', () => {
  const userTest = {
    email: 'user100@mail.ru',
    name: 'user100'
  };

  const userResponseTest = {
    success: true,
    user: {
      email: 'user100@mail.ru',
      name: 'user100'
    }
  };

  const registerDataTest = {
    email: 'user100@mail.ru',
    name: 'user100',
    password: 'password'
  };

  const loginDataTest = {
    email: 'user100@mail.ru',
    password: 'password'
  };

  it('Проверка выполнения аутентификации', () => {
    const state = userSlice.reducer(initialState, setIsAuthChecked(true));
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  it('Проверка getUser экшен Request', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      getUser.pending('')
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка getUser экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getUser.rejected(testError, '')
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка getUser экшен Success', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getUser.fulfilled(userResponseTest, '')
    );
    expect(state).toEqual({
      ...initialState,
      user: userResponseTest.user
    });
  });

  it('Проверка loginUser экшен Request', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      loginUser.pending('', loginDataTest)
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка loginUser экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      loginUser.rejected(testError, '', loginDataTest)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка loginUser экшен Success', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      loginUser.fulfilled(userTest, '', loginDataTest)
    );
    expect(state).toEqual({
      ...initialState,
      user: userTest
    });
  });

  it('Проверка updateUser экшен Request', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      updateUser.pending('', userTest)
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка updateUser экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      updateUser.rejected(testError, '', userTest)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка updateUser экшен Success', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      updateUser.fulfilled(userResponseTest, '', userTest)
    );
    expect(state).toEqual({
      ...initialState,
      user: userTest
    });
  });

  it('Проверка registerUser экшен Request', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      registerUser.pending('', registerDataTest)
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка registerUser экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      registerUser.rejected(testError, '', registerDataTest)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка registerUser экшен Success', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      registerUser.fulfilled(userTest, '', registerDataTest)
    );
    expect(state).toEqual({
      ...initialState,
      user: userTest
    });
  });

  it('Проверка logoutUser экшен Request', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      logoutUser.pending('')
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка logoutUser экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = userSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      logoutUser.rejected(testError, '')
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка logoutUser экшен Success', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        user: userTest,
        loading: true
      },
      logoutUser.fulfilled(userResponseTest, '')
    );
    expect(state).toEqual(initialState);
  });
});
