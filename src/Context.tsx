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

export function useCategories() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  return context;
}

export function useCategory(category: ICategory) {
  const { categories, saveCategories } = useCategories();
  const setCategoryProperty = (property: ICategoryProperties) => {
    const changeCategory = { ...category, ...property };
    const changeCategories = categories.map((category: ICategory) =>
      category.id === changeCategory.id ? changeCategory : category,
    );
    saveCategories(changeCategories);
  };
  return { setCategoryProperty };
}

export function useTodos(category: ICategory) {
  const { setCategoryProperty } = useCategory(category);
  const setTodos = (todos: IGroupTodo[]) => {
    setCategoryProperty({ todos });
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
    setCategoryProperty({ todos: [...category.todos, newTodo] });
  };
  return { setTodos, createTodo };
}

export function useTodo(categoryId: number, todo: IGroupTodo) {
  const { categories } = useCategories();
  const category = categories.find(
    (category: ICategory) => category.id === categoryId,
  );
  const { setTodos } = useTodos(category);

  const setTodoProperties = (property: IGroupTodoProperties) => {
    const changeTodo = { ...todo, ...property };
    const changeTodos = category.todos.map((todo: IGroupTodo) =>
      todo.id === changeTodo.id ? changeTodo : todo,
    );
    setTodos(changeTodos);
  };

  const deleteTodo = () => {
    setTodos(category.todos.filter((t: IGroupTodo) => t.id !== todo.id));
  };

  return { setTodoProperties, deleteTodo };
}

export function useSubTodos(categoryId: number, todo: IGroupTodo) {
  const { setTodoProperties } = useTodo(categoryId, todo);
  const setSubTodos = (subTodos: ITodo[]) => {
    setTodoProperties({ isOpen: true, subTodos });
  };
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
      subTodos: [...todo.subTodos, newSubTodo],
      isOpen: true,
    });
  };
  return { setSubTodos, createSubTodo };
}

export function useSubTodo(categoryId: number, todoId: number, subTodo: ITodo) {
  const { categories } = useCategories();
  const todo = categories
    .find((c: ICategory) => c.id === categoryId)
    .todos.find((t: IGroupTodo) => t.id === todoId);
  const { setSubTodos } = useSubTodos(categoryId, todo);
  const setSubTodoProperties = (property: any) => {
    const changeSubTodo = { ...subTodo, ...property };
    const changeSubTodos = todo.subTodos.map((subTodo: IGroupTodo) =>
      subTodo.id === changeSubTodo.id ? changeSubTodo : subTodo,
    );
    setSubTodos(changeSubTodos);
  };
  const deleteSubTodo = () => {
    setSubTodos(todo.subTodos.filter((s: ITodo) => s.id !== subTodo.id));
  };
  return { setSubTodoProperties, deleteSubTodo };
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
    const changeCategories = categories.filter(
      (category: ICategory) => category.id !== categoryId,
    );
    saveCategories(changeCategories);
  };
  const value = React.useMemo(
    () => ({ categories, saveCategories, createCategory, deleteCategory }),
    [categories],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
