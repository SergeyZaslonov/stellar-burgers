import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const createBurgerOrder = createAsyncThunk(
  'order/create',
  orderBurgerApi
);

type TOrderBurgerState = {
  bun: TIngredient | null;
  ingredients: Array<TConstructorIngredient>;
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
};

const initialState: TOrderBurgerState = {
  bun: null,
  ingredients: [],
  loading: false,
  order: null,
  error: undefined
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { id: nanoid(), ...ingredient }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      state.ingredients.splice(
        action.payload.toIndex,
        0,
        state.ingredients.splice(action.payload.fromIndex, 1)[0]
      );
    },
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      });
  },
  selectors: {
    getBurgerOrderLoading: (state) => state.loading,
    getBurgerOrderError: (state) => state.error,
    getBurgerOrder: (state) => state.order,
    getBurgerOrderBun: (state) => state.bun,
    getBurgerOrderIngredients: (state) => state.ingredients
  }
});

export const {
  getBurgerOrderLoading,
  getBurgerOrderError,
  getBurgerOrder,
  getBurgerOrderBun,
  getBurgerOrderIngredients
} = orderBurgerSlice.selectors;
export const { addIngredient, removeIngredient, moveIngredient, clearOrder } =
  orderBurgerSlice.actions;
