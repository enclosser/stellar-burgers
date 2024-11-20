import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeConstructorItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveConstructorItem: (
      state,
      {
        payload: { index, move }
      }: PayloadAction<{ index: number; move: 'up' | 'down' }>
    ) => {
      const swap = (i: number, j: number) => {
        [state.ingredients[i], state.ingredients[j]] = [
          state.ingredients[j],
          state.ingredients[i]
        ];
      };
      if (move === 'up' && index > 0) swap(index, index - 1);
      if (move === 'down' && index < state.ingredients.length - 1)
        swap(index, index + 1);
    },
    clearConstructor: (state) => {
      Object.assign(state, initialState);
    }
  }
});

const selectors = {
  getConstructorState: (state: TConstructorState) => state
};

export const constructorReducer = burgerConstructor.reducer;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem,
  clearConstructor
} = burgerConstructor.actions;
export const getConstructorState = (state: {
  burgerConstructor: TConstructorState;
}) => state.burgerConstructor;
