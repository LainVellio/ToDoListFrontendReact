import { useEffect, useState } from 'react';
import serverAPI, { NewCategoryTodo } from './api/api';
import './App.css';
import styled from 'styled-components';
import Header from './components/header/header';
import ToDoCard from './components/card/card';
import NewTodoForm from './components/newTodoForm/newTodoForm';

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

const CardContainer = styled.div`
  display: grid;
  width: 1200px;
  margin: 20px auto;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

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

function App() {
  const initialTasks: Array<Category> = [
    { id: 0, title: '', todos: [{ id: 0, text: '', isCompleted: false }] },
  ];

  const [categories, setCategories] = useState<Array<Category>>(initialTasks);

  useEffect(() => {
    serverAPI.getTasks().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const createTodo = async (newCategoryTodo: NewCategoryTodo) => {
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
  };

  return (
    <div>
      <Header />
      <main>
        <CardContainer>
          {categories.map((category) => (
            <ToDoCard
              key={category.id}
              title={category.title}
              id={category.id}
              todos={category.todos}
            />
          ))}
        </CardContainer>
        <NewTodoForm createTodo={createTodo} categories={categories} />
      </main>
    </div>
  );
}

export default App;
