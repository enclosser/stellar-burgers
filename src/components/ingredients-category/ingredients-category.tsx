import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '@ui';
import { useSelector } from '../../services/store';
import { getConstructorState } from '../../services/slices/burger-constructor';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } =
    useSelector(getConstructorState);

  const ingredientsCounters = useMemo(() => {
    const counters = constructorIngredients.reduce(
      (acc, { _id }) => {
        acc[_id] = (acc[_id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    if (bun) counters[bun._id] = 2;

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
