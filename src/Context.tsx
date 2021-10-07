import React from 'react';
import localStorageApi from './api/localStorageAPI';
import {
  EColors,
  ETextStyle,
  ICategory,
  IGroupTodo,
  ITodo,
} from './interfaces';

const initialCategories = [
  {
    id: 1,
    title: '',
    colorHeader: EColors.blue,
    todos: [
      {
        id: 1,
        text: '',
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        isCompleted: false,
        inArchive: false,
        timeCompleted: null,
        isOpen: false,
        subTasks: [
          {
            id: 1,
            text: '',
            textColor: EColors.black,
            textStyle: ETextStyle.normal,
            isCompleted: false,
            inArchive: false,
            timeCompleted: null,
          },
        ],
      },
    ],
  },
];

interface ProviderProps {
  children: React.ReactNode;
}
const Context = React.createContext<any>(initialCategories);

export function useCategories() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  return context;
}
export function useAllCategories() {
  const [categories, setCategories] = useCategories();
  const setAllCategories = (changeCategories: ICategory[]) => {
    localStorageApi.setCategories(changeCategories);
    setCategories(changeCategories);
  };
  return [categories, setAllCategories];
}
export function useCategory(id: number) {
  const [categories, setCategories] = useCategories();
  const category = categories.find((category: ICategory) => category.id === id);
  const setCategory = (changeCategory: ICategory) => {
    localStorageApi.setCategory(changeCategory);
    setCategories((prev: ICategory[]) =>
      prev.map((category: ICategory) =>
        category.id === id ? changeCategory : category,
      ),
    );
  };
  return [category, setCategory];
}

export function useTodos(categoryId: number) {
  const [category, setCategory] = useCategory(categoryId);
  const setTodos = (todos: IGroupTodo[]) => {
    localStorageApi.setTodos(categoryId, todos);
    setCategory({ ...category, todos });
  };
  return [category.todos, setTodos];
}
export function useTodo(categoryId: number, todoId: number) {
  const [todos, setTodos] = useTodos(categoryId);
  const todo = todos.find((todo: IGroupTodo) => todo.id === todoId);
  const setTodo = (changeTodo: IGroupTodo) => {
    localStorageApi.setTodo(categoryId, changeTodo);
    setTodos(
      todos.map((todo: IGroupTodo) => (todo.id === todoId ? changeTodo : todo)),
    );
  };
  return [todo, setTodo];
}

export function useSubTodos(categoryId: number, todoId: number) {
  const [todo, setTodo] = useTodo(categoryId, todoId);
  const setSubTodos = (changeSubTodos: ITodo[]) => {
    localStorageApi.setTodo(categoryId, { ...todo, subTodos: changeSubTodos });
    setTodo({ ...todo, isOpen: true, subTodos: changeSubTodos });
  };
  return [todo.subTodos, setSubTodos];
}
export function useSubTodo(
  categoryId: number,
  todoId: number,
  subTodoId: number,
) {
  const [subTodos, setSubTodos] = useSubTodos(categoryId, todoId);
  const subTodo = subTodos.find((subTodo: ITodo) => subTodo.id === subTodoId);
  const setSubTodo = (changeSubTodo: ITodo) => {
    localStorageApi.setSubTodo(categoryId, todoId, changeSubTodo);
    setSubTodos(
      subTodos.map((subTodo: ITodo) =>
        subTodo.id === subTodoId ? changeSubTodo : subTodo,
      ),
    );
  };
  return [subTodo, setSubTodo];
}

function Provider({ children }: ProviderProps) {
  const [categories, setCategories] = React.useState<ICategory[]>(
    localStorageApi.getCategories(),
  );
  const value = React.useMemo(() => [categories, setCategories], [categories]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
