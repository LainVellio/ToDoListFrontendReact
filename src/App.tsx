import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCategories } from './api/localStorageAPI';
import { ICategory } from './interfaces';
import { Header } from './components/header/Header';
import { ToDoCard } from './components/card/Card';

import AddIcon from '@material-ui/icons/Add';
import './App.css';

interface Card extends ICategory {
  isEdit?: boolean;
}

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

const App: React.FC = () => {
  const [categories, setCategories] = useState<Array<Card>>([]);
  const [isFormEnabled, setIsFormEnabled] = useState<boolean>(false);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const closeCategory = () => {};
  const addNewCard = () => {};

  const toggleForm = () => {
    setIsFormEnabled(!isFormEnabled);
  };

  return (
    <>
      <Header toggleForm={toggleForm} />
      <main>
        <CardsContainer>
          {categories.map((category) => (
            <ToDoCard
              key={category.id}
              title={category.title}
              closeCategory={closeCategory}
              id={category.id}
              todos={category.todos}
              isEdit={category.isEdit}
            />
          ))}
          <NewCardButton>
            <button onClick={addNewCard} className="button">
              <AddIcon className="addIcon" />
              Добавить новую категорию
            </button>
          </NewCardButton>
        </CardsContainer>
      </main>
    </>
  );
};

export default App;
