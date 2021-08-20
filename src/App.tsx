import { useEffect, useState } from 'react';
import serverAPI from './api/api';
import './App.css';
import styled from 'styled-components';
import Header from './components/header/header';
import ToDoCard from './components/card/card';

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
      </main>
    </div>
  );
}

export default App;
