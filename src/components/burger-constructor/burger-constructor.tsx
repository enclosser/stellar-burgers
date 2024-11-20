import { FC, useMemo, useCallback } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { clearConstructor } from '../../services/slices/burger-constructor';
import { newOrderThunk, clearOrder } from '../../services/slices/new-order';
import { getUser } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { orderRequest, order } = useSelector((state) => state.newOrder);
  const user = useSelector(getUser);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, { price }: TConstructorIngredient) => sum + price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = useCallback(() => {
    if (!bun || orderRequest || !ingredients.length) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const dataToOrder = [
      bun._id,
      ...ingredients.map(({ _id }) => _id),
      bun._id
    ];
    dispatch(newOrderThunk(dataToOrder));
  }, [bun, ingredients, user, orderRequest, dispatch, navigate]);

  const closeOrderModal = useCallback(() => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
