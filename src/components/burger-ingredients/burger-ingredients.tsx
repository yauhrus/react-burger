import { FC, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.css';
import { RootState } from '../../services/types';
import { TIngredient } from '../../services/types/data';

const BurgerIngredients: FC = () => {
  const tabs = [
    {
      name: 'bun',
      title: 'Булки',
    },
    {
      name: 'sauce',
      title: 'Соусы',
    },
    {
      name: 'main',
      title: 'Начинки',
    },
  ]
  
  const [current, setCurrent] = useState<string>(tabs[0].name);
  const scrollContainerRef = useRef<any>(null);
  const bunRef = useRef<any>(null);
  const sauceRef = useRef<any>(null);
  const mainRef = useRef<any>(null);
  const apiData  = useSelector((store: RootState) => store.burger.ingredients);

  const handleScroll = () => {
    const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect()
      .top;
    
    const bunHeaderPosition = bunRef.current.getBoundingClientRect().top;
    const sauceHeaderPosition = sauceRef.current.getBoundingClientRect().top;
    const mainHeaderPosition = mainRef.current.getBoundingClientRect().top;

    const bunDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
    const sauceDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
    const maindDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

    if(bunDiff < sauceDiff) {
      setCurrent('bun');
    } else if (sauceDiff < maindDiff) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  return (
    <section className={`${styles.root} mr-10`}>
      <h1 className={`${styles.title} text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className={`mb-8`}>
        {
          tabs.map((item) => (
            <Tab 
              value={item.name} 
              active={current === item.name} 
              onClick={setCurrent} 
              key={item.name}
            >
              {item.title}
            </Tab>)
          )
        }
      </div>
      <div 
        className={styles.ingredients}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        { 
          tabs.map(item => (
            <div key={item.name}>
              <h2 
                className={`${styles.sectionTitle} text_type_main-medium mt-2 mb-6`}
                ref={item.name === 'bun' ? bunRef : item.name === 'sauce' ? sauceRef : mainRef} 
              >{item.title}</h2>
              <ul className={`${styles.cardContainer} pl-4 pr-2`}>
              {
                apiData.filter((el: TIngredient) => el.type === item.name ).map((ingredient: TIngredient) => (
                  <BurgerIngredientsItem 
                    key={ingredient.name} 
                    data={ingredient}
                  />
                ))
              }
              </ul>
            </div>
            )
          )
        }
      </div>
    </section>
  );
}

export default BurgerIngredients;