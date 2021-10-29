import React, { ReactElement } from 'react';
import localStorageApi from './api/localStorageAPI';
import {
  EColors,
  ETextStyle,
  ICategory,
  ICategoryProperties,
  IGroupTodo,
  IGroupTodoProperties,
  ISubTodoProperties,
  ITodo,
  UseCategory,
  UseSubTodo,
  UseTodo,
  IContext,
} from './interfaces';

const initialContext = {
  categories: [
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
          subTodos: [
            {
              id: 1,
              text: '',
              textColor: EColors.black,
              textStyle: ETextStyle.normal,
              isCompleted: false,
            },
          ],
        },
      ],
    },
  ],
  saveCategories: () => {
    return;
  },
  deleteCategory: () => {
    return;
  },
  createCategory: () => {
    return;
  },
};

interface ProviderProps {
  children: React.ReactNode;
}
const Context = React.createContext<IContext>(initialContext);

function getChangeItems<T extends ICategory | IGroupTodo | ITodo>(
  items: T[],
  changeItem: T,
): T[] {
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

export function useCategories(): IContext {
  return React.useContext(Context);
}

export function useCategory(categoryId: number): UseCategory {
  const { categories, saveCategories } = useCategories();
  const category =
    categories.find((category: ICategory) => category.id === categoryId) ||
    initialContext.categories[0];
  const todos = category.todos;

  const setCategoryProperties = (properties: ICategoryProperties) => {
    const changeCategory = { ...category, ...properties };
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
  const deleteCategory = (categoryId: number) => {
    const changeCategories = getFilteredItems(categories, categoryId);
    saveCategories(changeCategories);
  };

  return { category, createTodo, setCategoryProperties, deleteCategory };
}

export function useTodo(categoryId: number, todoId: number): UseTodo {
  const { category } = useCategory(categoryId);
  const todos = category.todos;
  const { setCategoryProperties } = useCategory(categoryId);

  const todo =
    todos.find((todo: IGroupTodo) => todo.id === todoId) ||
    initialContext.categories[0].todos[0];
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
  const setTodoProperties = (properties: IGroupTodoProperties) => {
    const changeTodo = { ...todo, ...properties };
    setCategoryProperties({ todos: getChangeItems(todos, changeTodo) });
  };
  const deleteTodo = () => {
    setCategoryProperties({ todos: getFilteredItems(todos, todoId) });
  };
  const backTodo = () => {
    setTodoProperties({ inArchive: false });
  };
  return {
    todo,
    createSubTodo,
    setTodoProperties,
    deleteTodo,
    backTodo,
  };
}

export function useSubTodo(
  categoryId: number,
  todoId: number,
  subTodoId: number,
): UseSubTodo {
  const { todo, setTodoProperties } = useTodo(categoryId, todoId);
  const subTodos = todo.subTodos;
  const subTodo =
    subTodos.find((subTodo: ITodo) => subTodo.id === subTodoId) ||
    initialContext.categories[0].todos[0].subTodos[0];

  const setSubTodoProperties = (properties: ISubTodoProperties) => {
    const changeSubTodo = { ...subTodo, ...properties };
    setTodoProperties({
      subTodos: getChangeItems(subTodos, changeSubTodo),
    });
  };
  const deleteSubTodo = () => {
    setTodoProperties({
      subTodos: getFilteredItems(subTodos, subTodoId),
    });
  };
  return {
    subTodo,
    setSubTodoProperties,
    deleteSubTodo,
  };
}

function Provider({ children }: ProviderProps): ReactElement<IContext> {
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

  const value = React.useMemo(
    () => ({ categories, createCategory, saveCategories }),
    [categories],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
