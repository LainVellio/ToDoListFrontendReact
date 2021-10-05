export interface ITodo {
  id: number;
  text: string;
  textColor: EColors;
  textStyle: ETextStyle;
  isCompleted: boolean;
  inArchive: boolean;
  timeCompleted?: Date | null;
}

export interface IGroupTodo extends ITodo {
  subTasks: Array<ITodo>;
}

export interface ICategory {
  id: number;
  title: string;
  colorHeader: EColors;
  todos: Array<IGroupTodo>;
}

export interface INewCategoryTodo {
  title: string;
  text: string;
}

export interface INewTodo {
  categoryId: number;
  text: string;
}

export enum ETextStyle {
  bold = '900',
  normal = '400',
}

export enum EColors {
  red = '#df0b52',
  blue = '#1976d2',
  green = 'green',
  black = 'black',
}

export type TNewTodoText = 'todoText' | 'categoryName';
