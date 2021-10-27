import React from 'react';
import localStorageApi from './api/localStorageAPI';
import {
  EColors,
  ETextStyle,
  ICategory,
  ICategoryProperties,
  IGroupTodo,
  IGroupTodoProperties,
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

function findItem<T extends ICategory | IGroupTodo | ITodo>(
  items: Array<T>,
  id: number,
) {
  return items.find((item: T) => item.id === id)!;
}
function getChangeItems<T extends ICategory | IGroupTodo | ITodo>(
  items: Array<T>,
  changeItem: T,
) {
  return items.map((item: T) =>
    item.id === changeItem.id ? changeItem : item,
  );
}
function getFilteredItems<T extends ICategory | IGroupTodo | ITodo>(
  items: Array<T>,
  id: number,
) {
  return items.filter((item: T) => item.id !== id);
}

export function useCategories() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  return context;
}

export function useCategory(categoryId: number) {
  const { categories, saveCategories } = useCategories();
  const category = findItem<ICategory>(categories, categoryId);
  const todos = category.todos;

  const setCategoryProperties = (property: ICategoryProperties) => {
    const changeCategory = { ...category, ...property };
    const changeCategories = getChangeItems(categories, changeCategory);
    saveCategories(changeCategories);
  };

  const createTodo = () => {
    const newTodo = {
      text: '',
      id: Date.now(),
      isCompleted: false,
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
      timeCompleted: null,
      isOpen: false,
      subTodos: [],
    };
    setCategoryProperties({ todos: [...todos, newTodo] });
  };

  return { category, createTodo, setCategoryProperties };
}

export function useTodo(categoryId: number, todoId: number) {
  const { category } = useCategory(categoryId);
  const todos = category.todos;
  const { setCategoryProperties } = useCategory(categoryId);

  const todo = findItem<IGroupTodo>(todos, todoId);
  const subTodos = todo.subTodos;

  const createSubTodo = () => {
    const newSubTodo = {
      text: '',
      id: Date.now(),
      isCompleted: false,
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
      timeCompleted: null,
    };

    setTodoProperties({
      subTodos: [...subTodos, newSubTodo],
      isOpen: true,
    });
  };

  const setTodoProperties = (property: IGroupTodoProperties) => {
    const changeTodo = { ...todo, ...property };
    setCategoryProperties({ todos: getChangeItems(todos, changeTodo) });
  };

  const deleteTodo = () => {
    setCategoryProperties({ todos: getFilteredItems(todos, todoId) });
  };

  return {
    todo,
    createSubTodo,
    setTodoProperties,
    deleteTodo,
  };
}

export function useSubTodo(
  categoryId: number,
  todoId: number,
  subTodoId: number,
) {
  const { todo, setTodoProperties } = useTodo(categoryId, todoId);
  const subTodos = todo.subTodos;
  const subTodo = findItem<ITodo>(subTodos, subTodoId);

  const setSubTodoProperties = (property: any) => {
    const changeSubTodo = { ...subTodo, ...property };
    setTodoProperties({ subTodos: getChangeItems(subTodos, changeSubTodo) });
  };

  const deleteSubTodo = () => {
    setTodoProperties({ subTodos: getFilteredItems(subTodos, subTodoId) });
  };

  return {
    subTodo,
    setSubTodoProperties,
    deleteSubTodo,
  };
}

function Provider({ children }: ProviderProps) {
  const [categories, setCategories] = React.useState<ICategory[]>(
    localStorageApi.getCategories(),
  );

  const saveCategories = (changeCategories: ICategory[]) => {
    setCategories(changeCategories);
    localStorageApi.setCategories(changeCategories);
  };

  const createCategory = () => {
    const newCategory = {
      title: '',
      id: Date.now(),
      todos: [],
      colorHeader: EColors.blue,
      isEdit: true,
    };
    saveCategories([...categories, newCategory]);
  };

  const deleteCategory = (categoryId: number) => {
    const changeCategories = getFilteredItems(categories, categoryId);
    saveCategories(changeCategories);
  };

  const value = React.useMemo(
    () => ({ categories, saveCategories, createCategory, deleteCategory }),
    [categories],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
