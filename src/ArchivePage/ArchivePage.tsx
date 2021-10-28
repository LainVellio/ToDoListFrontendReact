import React from 'react';
import styled from 'styled-components';

import { useCategories } from '../Context';
import { ICategory } from '../interfaces';
import { TodoArchive } from './TodoArchive';

import { Paper } from '@material-ui/core';

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
    margin: 10px 0 10px 15px;
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
  const { categories } = useCategories();
  const categoriesInArchive = categories.filter((category: ICategory) =>
    category.todos.some((todo) => todo.inArchive),
  );

  return (
    <ArchivePageWrapper>
      <h1 className="header">Archive</h1>
      {categoriesInArchive.length !== 0 ? (
        <Paper className="paper">
          {categoriesInArchive.map((category: ICategory, index: number) => (
            <div key={category.id}>
              <h2 className="categoryTitle">{category.title}</h2>
              {category.todos.map(
                (todo) =>
                  todo.inArchive && (
                    <TodoArchive
                      key={todo.id}
                      categoryId={category.id}
                      todoId={todo.id}
                    />
                  ),
              )}
              {index + 1 < categoriesInArchive.length && (
                <div className="divider" />
              )}
            </div>
          ))}
        </Paper>
      ) : (
        <div className="noTodos">No Todos</div>
      )}
    </ArchivePageWrapper>
  );
};
