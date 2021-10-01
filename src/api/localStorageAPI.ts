import {
  EColors,
  ETextStyle,
  ICategory,
  IGroupTodo,
  ITodo,
} from '../interfaces';

export const getCategories = (): Array<ICategory> => {
  return JSON.parse(localStorage.getItem('categories') || '[]');
};
const setCategories = (categories: Array<ICategory>) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};
export const getCategory = (categoryId: number) => {
  return getCategories().find((category) => category.id === categoryId)!;
};
const setCategory = (changeCategory: ICategory) => {
  const categories = getCategories().map((category) =>
    category.id === changeCategory.id ? changeCategory : category,
  );
  setCategories(categories);
};
const getTodo = (categoryId: number, todoId: number): IGroupTodo => {
  return getCategory(categoryId)!.todos.find((todo) => todo.id === todoId)!;
};
const getSubTodo = (
  categoryId: number,
  todoId: number,
  subTodoId: number,
): ITodo => {
  const todo = getTodo(categoryId, todoId);
  return todo.subTasks.find((todo) => todo.id === subTodoId)!;
};
const setTodo = (categoryId: number, changeTodo: IGroupTodo) => {
  const category = getCategory(categoryId)!;
  const changeCategory = {
    ...category,
    todos: category.todos.map((todo) =>
      todo.id === changeTodo.id ? changeTodo : todo,
    ),
  };
  setCategory(changeCategory);
};
const setSubTodo = (
  categoryId: number,
  todoId: number,
  changeSubTodo: ITodo,
) => {
  const todo = getTodo(categoryId, todoId);
  const changeTodo = {
    ...todo,
    subTasks: todo.subTasks.map((subTodo) =>
      subTodo.id === changeSubTodo.id ? changeSubTodo : subTodo,
    ),
  };
  setTodo(categoryId, changeTodo);
};

const localStorageApi = {
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
  postTodo(categoryId: number) {
    const newTodo = {
      text: '',
      id: Date.now(),
      isCompleted: false,
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
      timeCompleted: null,
      subTasks: [],
    };
    const category = getCategory(categoryId)!;
    setCategory({ ...category, todos: [...category.todos, newTodo] });
    return getTodo(categoryId, newTodo.id);
  },
  postSubTodo(categoryId: number, todoId: number) {
    const newSubTodo = {
      text: '',
      id: Date.now(),
      isCompleted: false,
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
      timeCompleted: null,
    };
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, subTasks: [...todo.subTasks, newSubTodo] });
    return getSubTodo(categoryId, todoId, newSubTodo.id);
  },

  setOrderedTodos(categoryId: number, todos: IGroupTodo[]): void {
    const category = getCategory(categoryId);
    setCategory({ ...category, todos: todos });
  },

  checkedTodo(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    const timeCompleted = todo.isCompleted === false ? new Date() : null;
    setTodo(categoryId, {
      ...todo,
      isCompleted: !todo!.isCompleted,
      timeCompleted: timeCompleted,
    });
  },
  checkedSubTodo(categoryId: number, todoId: number, subTodoId: number) {
    const subTodo = getSubTodo(categoryId, todoId, subTodoId);
    const timeCompleted = subTodo.isCompleted === false ? new Date() : null;
    setSubTodo(categoryId, todoId, {
      ...subTodo,
      isCompleted: !subTodo!.isCompleted,
      timeCompleted: timeCompleted,
    });
  },

  changeTitleCategory(categoryId: number, title: string) {
    const category = getCategory(categoryId);
    setCategory({ ...category, title: title });
  },
  changeTextTodo(categoryId: number, todoId: number, text: string) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, text: text });
  },
  changeTextSubTodo(
    categoryId: number,
    todoId: number,
    subTodoId: number,
    text: string,
  ) {
    const subTodo = getSubTodo(categoryId, todoId, subTodoId);
    setSubTodo(categoryId, todoId, { ...subTodo, text: text });
  },

  changeColorHeaderCategory(categoryId: number, colorHeader: EColors) {
    const category = getCategory(categoryId);
    setCategory({ ...category, colorHeader: colorHeader });
  },
  changeTextColor(categoryId: number, todoId: number, textColor: EColors) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, textColor: textColor });
  },
  changeTextColorSubTodo(
    categoryId: number,
    todoId: number,
    subTodoId: number,
    textColor: EColors,
  ) {
    const subTodo = getSubTodo(categoryId, todoId, subTodoId);
    setSubTodo(categoryId, todoId, { ...subTodo, textColor: textColor });
  },

  changeTextStyle(categoryId: number, todoId: number, textStyle: ETextStyle) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, textStyle: textStyle });
  },
  changeTextStyleSubTodo(
    categoryId: number,
    todoId: number,
    subTodoId: number,
    textStyle: ETextStyle,
  ) {
    const subTodo = getSubTodo(categoryId, todoId, subTodoId);
    setSubTodo(categoryId, todoId, { ...subTodo, textStyle: textStyle });
  },

  getCategoriesInArchive() {
    const categories = getCategories().map((category) => {
      return {
        ...category,
        todos: category.todos.filter((todo) => todo.inArchive),
      };
    });
    return categories.filter((category) => category.todos.length !== 0);
  },
  sendTodoInArchive(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, inArchive: true });
  },
  backTodoInMainPage(categoryId: number, todoId: number) {
    const todo = getTodo(categoryId, todoId);
    setTodo(categoryId, { ...todo, inArchive: false });
  },

  deleteCategory(categoryId: number) {
    const categories = getCategories();
    setCategories(categories.filter((category) => category.id !== categoryId));
  },
  deleteTodo(categoryId: number, todoId: number) {
    const category = getCategory(categoryId)!;
    setCategory({
      ...category,
      todos: category.todos.filter((todo) => todo.id !== todoId),
    });
  },
  deleteSubTodo(categoryId: number, todoId: number, subTodoId: number) {
    const todo = getTodo(categoryId, todoId)!;
    setTodo(categoryId, {
      ...todo,
      subTasks: todo.subTasks.filter((subTodo) => subTodo.id !== subTodoId),
    });
  },
};

export default localStorageApi;
