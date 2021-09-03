export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface ICategory {
  id: number;
  title: string;
  todos: Array<ITodo>;
}

export interface INewCategoryTodo {
  title: string;
  text: string;
}

export interface INewTodo {
  categoryId: number;
  text: string;
}

export enum EColors {
  red = '#df0b52',
  blue = '#1976d2',
  green = 'green',
  black = 'black',
}

export type TNewTodoText = 'todoText' | 'categoryName';
