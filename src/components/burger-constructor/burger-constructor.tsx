import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  createBurgerOrder,
  getBurgerOrderBun,
  getBurgerOrderIngredients,
  getBurgerOrder,
  getBurgerOrderLoading
} from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector(getBurgerOrderBun),
    ingredients: useSelector(getBurgerOrderIngredients)
  };
  const orderRequest = useSelector(getBurgerOrderLoading);
  const orderModalData = useSelector(getBurgerOrder);
  const user = useSelector(getUserInfo);

  const onOrderClick = () => {
    if (!user) navigate('/login');
    if (!constructorItems.bun || orderRequest) return;
    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createBurgerOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
