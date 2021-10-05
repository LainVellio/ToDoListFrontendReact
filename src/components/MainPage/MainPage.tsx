import { useState } from 'react';
import styled from 'styled-components';

import { ICategory } from '../../interfaces';
import localStorageApi from '../../api/localStorageAPI';
import { TodoCard } from '../Card/TodoCard';

import AddIcon from '@material-ui/icons/Add';

const CardsContainer = styled.div`
  display: grid;
  width: 1200px;
  margin: 20px auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media screen and (max-width: 1200px) {
    width: 800px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 800px) {
    width: 400px;
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
  @media screen and (max-width: 400px) {
    width: 320px;
    grid-template-columns: 1fr;
  }
`;

const NewCardButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  width: 100%;
  .button {
    display: flex;
    align-items: center;
    color: #1976d2;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 20px;
    border: none;
    background-color: white;
    cursor: pointer;
  }
  .button:hover {
    color: #3f51b5;
  }
  .addIcon {
    margin-right: 5px;
  }
`;

export const MainPage = () => {
  const [categories, setCategories] = useState<Array<ICategory>>(
    localStorageApi.getCategories(),
  );

  const createCard = () => {
    const newCategory = localStorageApi.postCategory('');
    setCategories((prev) => [...prev, { ...newCategory, isEdit: true }]);
  };
  const closeCard = (categoryId: number) => {
    localStorageApi.deleteCategory(categoryId);
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const editCard = (categoryId: number) => (key: string, value: unknown) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, [key]: value } : category,
      ),
    );
  };

  return (
    <main>
      <CardsContainer>
        {categories.map((category) => (
          <TodoCard
            data-testid="toDoCard"
            key={category.id}
            id={category.id}
            title={category.title}
            colorHeader={category.colorHeader}
            todos={category.todos}
            editCard={editCard(category.id)}
            closeCard={closeCard}
          />
        ))}
        <NewCardButton>
          <button onClick={createCard} className="button">
            <AddIcon className="addIcon" />
            Добавить новую категорию
          </button>
        </NewCardButton>
      </CardsContainer>
    </main>
  );
};
