type SingleProperty<T, K extends keyof T> = K extends any
  ? { [Prop in K]: T[Prop] }
  : null;
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
  timeCompleted: number | null;
  subTodos: Array<ITodo>;
}

export interface UseCategory {
  category: ICategory;
  createTodo: () => void;
  setCategoryProperties: (property: ICategoryProperties) => void;
}
export interface UseTodo {
  todo: IGroupTodo;
  createSubTodo: () => void;
  setTodoProperties: (property: IGroupTodoProperties) => void;
  deleteTodo: () => void;
}

export interface ICategory {
  id: number;
  title: string;
  colorHeader: EColors;
  todos: Array<IGroupTodo>;
}
export interface UseSubTodo {
  subTodo: ITodo;
  setSubTodoProperties: (property: ISubTodoProperties) => void;
  deleteSubTodo: () => void;
}

export type ICategoryProperties = UnionOfProperties<ICategory>;
export type IGroupTodoProperties = UnionOfProperties<IGroupTodo>;
export type ISubTodoProperties = UnionOfProperties<ITodo>;

// export interface INewCategoryTodo {
//   title: string | null;
//   text: string | null;
// }

// export interface INewTodo {
//   categoryId: number | null;
//   text: string | null;
// }

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

// export type TNewTodoText = 'todoText' | 'categoryName';
