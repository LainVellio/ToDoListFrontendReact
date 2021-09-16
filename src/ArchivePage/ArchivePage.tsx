import { useEffect, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../api/localStorageAPI';
import { ICategory } from '../interfaces';

import { Paper } from '@material-ui/core';
import { TodoArchive } from './TodoArchive';

const ArchivePageWrapper = styled.div`
  width: 500px;
  margin: 20px auto;
  .header {
    text-align: center;
  }
  .paper {
    padding: 20px;
  }
  .categoryTitle {
    margin: 10px 0;
  }
  .noTodos {
    text-align: center;
  }
  .divider {
    color: #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
  }
`;

export const ArchivePage = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  useEffect(() => {
    const categories = localStorageApi.getCategoriesInArchive();
    setCategories(categories);
  }, []);

  const filterTodos = (todoId: number) => {
    const filteredCategories = categories.map((category) => {
      return {
        ...category,
        todos: category.todos.filter((todo) => todo.id !== todoId),
      };
    });
    return filteredCategories.filter((category) => category.todos.length !== 0);
  };

  const backTodo = (categoryId: number, todoId: number) => {
    localStorageApi.backTodoInMainPage(categoryId, todoId);
    setCategories(filterTodos(todoId));
  };

  const deleteTodo = (categoryId: number, todoId: number) => {
    localStorageApi.deleteTodo(categoryId, todoId);
    setCategories(filterTodos(todoId));
  };

  return (
    <ArchivePageWrapper>
      <h1 className="header">Archive</h1>
      {categories.length !== 0 ? (
        <Paper className="paper">
          {categories.map((category, index) => (
            <div key={category.id}>
              <h2 className="categoryTitle">{category.title}</h2>
              {category.todos.map((todo) => (
                <TodoArchive
                  key={todo.id}
                  id={todo.id}
                  categoryId={category.id}
                  text={todo.text}
                  backTodo={backTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
              {index + 1 < categories.length && <div className="divider" />}
            </div>
          ))}
        </Paper>
      ) : (
        <div className="noTodos">No Todos</div>
      )}
    </ArchivePageWrapper>
  );
};
