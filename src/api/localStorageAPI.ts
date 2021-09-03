import { ICategory, ITodo } from '../interfaces';

export const getCategories = (): Array<ICategory> => {
  return JSON.parse(localStorage.getItem('categories') || '[]');
};
const setCategories = (categories: Array<ICategory>) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};
const getCategory = (categoryId: number) => {
  return getCategories().find((category) => category.id === categoryId);
};
const setCategory = (changeCategory: ICategory) => {
  const categories = getCategories().map((category) =>
    category.id === changeCategory.id ? changeCategory : category,
  );
  setCategories(categories);
};
const getTodo = (categoryId: number, todoId: number): ITodo => {
  return getCategory(categoryId)!.todos.find((todo) => todo.id === todoId)!;
};
const setTodo = (categoryId: number, changeTodo: ITodo) => {
  const category = getCategory(categoryId)!;
  const changeCategory = {
    ...category,
    todos: category.todos.map((todo) =>
      todo.id === changeTodo.id ? changeTodo : todo,
    ),
  };
  setCategory(changeCategory);
};

const localStorageApi = {
  postTodo(categoryId: number, text: string) {
    const newTodo = {
      text: text,
      id: Date.now(),
      isCompleted: false,
    };
    const category = getCategory(categoryId)!;
    setCategory({ ...category, todos: [...category.todos, newTodo] });
    return newTodo;
  },

  checkedTodo(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    const checkedTodo = { ...todo, isCompleted: !todo!.isCompleted };
    setTodo(categoryId, checkedTodo);
  },

  changeTextTodo(categoryId: number, todoId: number, text: string) {
    const todo = getTodo(categoryId, todoId);
    const changedTodo = { ...todo, text: text };
    setTodo(categoryId, changedTodo);
  },

  deleteTodo(categoryId: number, todoId: number) {
    const category = getCategory(categoryId)!;
    setCategory({
      ...category,
      todos: category.todos.filter((todo) => todo.id !== todoId),
    });
  },
};

export default localStorageApi;
