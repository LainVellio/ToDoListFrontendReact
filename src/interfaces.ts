type SingleProperty<T, K extends keyof T> = K extends any
  ? { [Prop in K]: T[Prop] }
  : never;
type UnionOfProperties<T> = { [K in keyof T]: SingleProperty<T, K> }[keyof T];

export interface ITodo {
  id: number;
  text: string;
  textColor: EColors;
  textStyle: ETextStyle;
  isCompleted: boolean;
}

export interface IGroupTodo extends ITodo {
  isOpen: boolean;
  inArchive: boolean;
  timeCompleted?: number | null;
  subTodos: Array<ITodo>;
}

export interface ICategory {
  id: number;
  title: string;
  colorHeader: EColors;
  todos: Array<IGroupTodo>;
}
export type ICategoryProperties = UnionOfProperties<ICategory>;
export type IGroupTodoProperties = UnionOfProperties<IGroupTodo>;

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
