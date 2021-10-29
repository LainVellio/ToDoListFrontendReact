import React from 'react';

import { ICategory } from '../../interfaces';
import { useCategories } from '../../Context';
import { TodoCard } from '../Card/TodoCard';

import { CardsContainer, NewCardButton } from './MainPage.style';
import AddIcon from '@material-ui/icons/Add';

export const MainPage: React.FC = () => {
  const { categories, createCategory } = useCategories();
  return (
    <main>
      <CardsContainer>
        {categories.map((category: ICategory) => (
          <TodoCard
            data-testid="toDoCard"
            categoryId={category.id}
            key={category.id}
          />
        ))}

        <NewCardButton>
          <button onClick={createCategory} className="button">
            <AddIcon className="addIcon" />
            Добавить новую категорию
          </button>
        </NewCardButton>
      </CardsContainer>
    </main>
  );
};
