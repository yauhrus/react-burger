import { FC } from 'react';
import styles from './home-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

interface IHomePageProps {
  openModal: () => void
}

const HomePage: FC<IHomePageProps> = ({ openModal }) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor openModal={openModal} />
    </main>
  );
}

export default HomePage;