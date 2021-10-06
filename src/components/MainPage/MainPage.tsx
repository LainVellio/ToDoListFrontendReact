import styled from 'styled-components';

import { useAllCategories } from '../../Context';
import { TodoCard } from '../Card/TodoCard';
import { EColors, ICategory } from '../../interfaces';

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
  const [categories, setAllCategories] = useAllCategories();

  const createCard = () => {
    const newCategory = {
      title: '',
      id: Date.now(),
      todos: [],
      colorHeader: EColors.blue,
    };
    setAllCategories([...categories, { ...newCategory, isEdit: true }]);
  };
  const deleteCard = (categoryId: number) => {
    setAllCategories(
      categories.filter((category: ICategory) => category.id !== categoryId),
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
            deleteCard={deleteCard}
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
