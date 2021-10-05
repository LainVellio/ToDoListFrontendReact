import styled from 'styled-components';

import { useCategories } from '../../Context';
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
  const [categories, setCategories] = useCategories();

  const createCard = () => {
    const newCategory = localStorageApi.postCategory('');
    setCategories([...categories, { ...newCategory, isEdit: true }]);
  };
  const closeCard = (categoryId: number) => {
    localStorageApi.deleteCategory(categoryId);
    setCategories(categories.filter((c: any) => c.id !== categoryId));
  };
  const editCard = (categoryId: number) => (key: string, value: unknown) => {
    setCategories(
      categories.map((category: any) =>
        category.id === categoryId ? { ...category, [key]: value } : category,
      ),
    );
  };

  return (
    <main>
      <CardsContainer>
        {categories.map((category: any) => (
          <TodoCard
            data-testid="toDoCard"
            id={category.id}
            key={category.id}
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
