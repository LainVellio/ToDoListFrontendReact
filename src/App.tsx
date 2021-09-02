import { useEffect, useState } from 'react';
import serverAPI, { NewCategoryTodo } from './api/api';
import './App.css';
import styled from 'styled-components';
import Header from './components/header/header';
import ToDoCard from './components/card/card';
import NewTodoForm from './components/newTodoForm/newTodoForm';
import AddIcon from '@material-ui/icons/Add';

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface Category {
  id: number;
  title: string;
  todos: Array<Todo>;
}

interface Card extends Category {
  isEdit?: boolean;
}

const CardContainer = styled.div`
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

function App() {
  const [categories, setCategories] = useState<Array<Card>>([]);
  const [isFormEnabled, setIsFormEnabled] = useState<boolean>(false);

  useEffect(() => {
    try {
      serverAPI.getTasks().then((response) => {
        setCategories(response.data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const createTodo = async (newCategoryTodo: NewCategoryTodo) => {
    try {
      const response = await serverAPI.postTodo(newCategoryTodo);
      categories.find((category) => category.title === newCategoryTodo.title)
        ? setCategories(
            categories.map((category) =>
              category.title === newCategoryTodo.title
                ? {
                    ...category,
                    todos: [...category.todos, ...response.data.todos],
                  }
                : category,
            ),
          )
        : setCategories([...categories, response.data]);
    } catch (error) {
      alert(error);
    }
  };

  const closeCategory = async (categoryId: number) => {
    await serverAPI.deleteCategory(categoryId);
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  const toggleForm = () => {
    setIsFormEnabled(!isFormEnabled);
  };
  const addNewCard = async () => {
    const newCard = await serverAPI.postTodo({
      title: 'Новая категория',
      text: 'Новая задача',
    });
    setCategories([...categories, { ...newCard.data, isEdit: true }]);
  };

  return (
    <div>
      <Header toggleForm={toggleForm} />
      <main>
        <CardContainer>
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
        </CardContainer>
        {isFormEnabled && (
          <NewTodoForm
            toggleForm={toggleForm}
            createTodo={createTodo}
            categories={categories}
          />
        )}
      </main>
    </div>
  );
}

export default App;
