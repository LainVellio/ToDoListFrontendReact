import { EColors, ETextStyle, ICategory, ITodo } from '../interfaces';

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
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
    };
    const category = getCategory(categoryId)!;
    setCategory({ ...category, todos: [...category.todos, newTodo] });
    return newTodo;
  },
  setOrderedTodos(categoryId: number, todos: ITodo[]): void {
    const category = getCategory(categoryId);
    setCategory({ ...category, todos: todos });
  },
  checkedTodo(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, isCompleted: !todo!.isCompleted });
  },
  changeTextTodo(categoryId: number, todoId: number, text: string) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, text: text });
  },
  changeTextColor(categoryId: number, todoId: number, textColor: EColors) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, textColor: textColor });
  },
  changeTextStyle(categoryId: number, todoId: number, textStyle: ETextStyle) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, textStyle: textStyle });
  },
  sendTodoInArchive(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, inArchive: true });
  },
  deleteTodo(categoryId: number, todoId: number) {
    const category = getCategory(categoryId)!;
    setCategory({
      ...category,
      todos: category.todos.filter((todo) => todo.id !== todoId),
    });
  },
  postCategory(title: string) {
    const newCategory = {
      title: title,
      id: Date.now(),
      todos: [],
      colorHeader: EColors.blue,
    };
    setCategories([...getCategories(), newCategory]);
    return newCategory;
  },

  changeTitleCategory(categoryId: number, title: string) {
    const category = getCategory(categoryId);
    setCategory({ ...category, title: title });
  },

  changeColorHeaderCategory(categoryId: number, colorHeader: EColors) {
    const category = getCategory(categoryId);
    setCategory({ ...category, colorHeader: colorHeader });
  },

  deleteCategory(categoryId: number) {
    const categories = getCategories();
    setCategories(categories.filter((category) => category.id !== categoryId));
  },
};

export default localStorageApi;
