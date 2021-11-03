type SingleProperty<T, K extends keyof T> = K extends unknown
  ? { [Prop in K]: T[Prop] }
  : null;
type UnionOfProperties<T> = { [K in keyof T]: SingleProperty<T, K> }[keyof T];

export interface ICategory {
  id: number;
  title: string;
  colorHeader: EColors;
  todos: Array<IGroupTodo>;
}
export type ICategoryProperties = UnionOfProperties<ICategory>;

export interface IGroupTodo {
  id: number;
  text: string;
  textColor: EColors;
  textStyle: ETextStyle;
  isCompleted: boolean;
  isOpen: boolean;
  inArchive: boolean;
  numberingType: ENumberingType;
  timeCompleted: number | null;
  subTodos: Array<ITodo>;
}
export type IGroupTodoProperties = UnionOfProperties<IGroupTodo>;

export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
}
export type ISubTodoProperties = UnionOfProperties<ITodo>;

export interface IContext {
  categories: ICategory[];
  saveCategories: (changeCategories: ICategory[]) => void;
  createCategory: () => void;
}
export interface UseCategory {
  category: ICategory;
  createTodo: () => void;
  setCategoryProperties: (property: ICategoryProperties) => void;
  deleteCategory: (categoryId: number) => void;
}
export interface UseTodo {
  todo: IGroupTodo;
  createSubTodo: () => void;
  setTodoProperties: (property: IGroupTodoProperties) => void;
  deleteTodo: () => void;
  backTodo: () => void;
}
export interface UseSubTodo {
  subTodo: ITodo;
  setSubTodoProperties: (property: ISubTodoProperties) => void;
  deleteSubTodo: () => void;
}

export interface ITodoEdit {
  text: string;
  textColor: EColors;
  textStyle: ETextStyle;
  numberingType: ENumberingType;
}
export interface ISubTodoEdit {
  text: string;
}

export type ITodoEditProperties = UnionOfProperties<ITodoEdit>;
export type ISubTodoEditProperties = UnionOfProperties<ISubTodoEdit>;

export enum ETextStyle {
  bold = '900',
  normal = '400',
  italic = 'italic',
}

export enum ENumberingType {
  number = 'number',
  point = 'point',
  void = 'void',
}

export type EditMenuItemType<T> = {
  letter?: string;
  value: T;
};

export enum EColors {
  red = '#df0b52',
  blue = '#1976d2',
  green = 'green',
  black = 'black',
}
