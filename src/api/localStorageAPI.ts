import { ICategory, ITodo } from '../interfaces';

export const getCategories = (): Array<ICategory> => {
  return JSON.parse(localStorage.getItem('categories') || '[]');
};
const setCategories = (categories: Array<ICategory>) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};
const getCategory = (categoryId: number) => {
  return getCategories().find((category) => category.id === categoryId)!;
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
  postCategory(title: string) {
    const newCategory = {
      title: title,
      id: Date.now(),
      todos: [],
    };
    setCategories([...getCategories(), newCategory]);
    return newCategory;
  },

  setOrderedTodos(categoryId: number, todos: ITodo[]): void {
    const category = getCategory(categoryId);
    const changedCategory = { ...category, todos: todos };
    setCategory(changedCategory);
  },

  checkedTodo(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    const checkedTodo = { ...todo, isCompleted: !todo!.isCompleted };
    setTodo(categoryId, checkedTodo);
  },

  changeTitleCategory(categoryId: number, title: string) {
    const category = getCategory(categoryId);
    const changedCategory = { ...category, title: title };
    setCategory(changedCategory);
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
  deleteCategory(categoryId: number) {
    const categories = getCategories();
    setCategories(categories.filter((category) => category.id !== categoryId));
  },
};

export default localStorageApi;
