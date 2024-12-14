import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveConstructorItem,
  removeConstructorItem
} from '../../services/slices/burger-constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMove = useCallback(
      (direction: 'up' | 'down') => {
        dispatch(moveConstructorItem({ index, move: direction }));
      },
      [dispatch, index]
    );

    const handleClose = useCallback(() => {
      dispatch(removeConstructorItem(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMove('up')}
        handleMoveDown={() => handleMove('down')}
        handleClose={handleClose}
      />
    );
  }
);
