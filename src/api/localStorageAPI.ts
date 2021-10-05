import {
  EColors,
  ETextStyle,
  ICategory,
  IGroupTodo,
  ITodo,
} from '../interfaces';

const localStorageApi = {
  getCategories(): Array<ICategory> {
    return JSON.parse(localStorage.getItem('categories') || '[]');
  },
  setCategories(categories: Array<ICategory>) {
    localStorage.setItem('categories', JSON.stringify(categories));
  },

  getCategory(categoryId: number) {
    return this.getCategories().find((category) => category.id === categoryId)!;
  },
  setCategory(changeCategory: ICategory) {
    console.log(changeCategory);
    const categories = this.getCategories().map((category) =>
      category.id === changeCategory.id ? changeCategory : category,
    );
    this.setCategories(categories);
  },
  postCategory(title: string) {
    const newCategory = {
      title: title,
      id: Date.now(),
      todos: [],
      colorHeader: EColors.blue,
    };
    this.setCategories([...this.getCategories(), newCategory]);
    return newCategory;
  },
  patchCategory<T>(categoryId: number, key: string, value: T) {
    const category = this.getCategory(categoryId);
    this.setCategory({ ...category, [key]: value });
  },
  getCategoriesInArchive() {
    const categories = this.getCategories().map((category) => {
      return {
        ...category,
        todos: category.todos.filter((todo) => todo.inArchive),
      };
    });
    return categories.filter((category) => category.todos.length !== 0);
  },
  deleteCategory(categoryId: number) {
    const categories = this.getCategories();
    this.setCategories(
      categories.filter((category) => category.id !== categoryId),
    );
  },

  getTodo(categoryId: number, todoId: number): IGroupTodo {
    return this.getCategory(categoryId)!.todos.find(
      (todo) => todo.id === todoId,
    )!;
  },
  setTodo(categoryId: number, changeTodo: IGroupTodo) {
    const category = this.getCategory(categoryId)!;
    const changeCategory = {
      ...category,
      todos: category.todos.map((todo) =>
        todo.id === changeTodo.id ? changeTodo : todo,
      ),
    };
    this.setCategory(changeCategory);
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
    const category = this.getCategory(categoryId)!;
    this.setCategory({ ...category, todos: [...category.todos, newTodo] });
    return this.getTodo(categoryId, newTodo.id);
  },
  patchTodo<T>(categoryId: number, todoId: number, key: string, value: T) {
    const todo = this.getTodo(categoryId, todoId);
    this.setTodo(categoryId, { ...todo, [key]: value });
  },
  checkedTodo(categoryId: number, todoId: number) {
    const todo = this.getTodo(categoryId, todoId);
    const timeCompleted = todo.isCompleted === false ? new Date() : null;
    this.setTodo(categoryId, {
      ...todo,
      isCompleted: !todo!.isCompleted,
      timeCompleted: timeCompleted,
    });
  },
  deleteTodo(categoryId: number, todoId: number) {
    const category = this.getCategory(categoryId)!;
    this.setCategory({
      ...category,
      todos: category.todos.filter((todo) => todo.id !== todoId),
    });
  },

  getSubTodo(categoryId: number, todoId: number, subTodoId: number): ITodo {
    const todo = this.getTodo(categoryId, todoId);
    return todo.subTasks.find((todo) => todo.id === subTodoId)!;
  },
  setSubTodo(categoryId: number, todoId: number, changeSubTodo: ITodo) {
    const todo = this.getTodo(categoryId, todoId);
    const changeTodo = {
      ...todo,
      subTasks: todo.subTasks.map((subTodo) =>
        subTodo.id === changeSubTodo.id ? changeSubTodo : subTodo,
      ),
    };
    this.setTodo(categoryId, changeTodo);
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
    const todo = this.getTodo(categoryId, todoId);
    this.setTodo(categoryId, {
      ...todo,
      subTasks: [...todo.subTasks, newSubTodo],
    });
    return this.getSubTodo(categoryId, todoId, newSubTodo.id);
  },
  patchSubTodo<T>(
    categoryId: number,
    todoId: number,
    subTodoId: number,
    key: string,
    value: T,
  ) {
    const subTodo = this.getSubTodo(categoryId, todoId, subTodoId);
    this.setSubTodo(categoryId, todoId, { ...subTodo, [key]: value });
  },
  checkedSubTodo(categoryId: number, todoId: number, subTodoId: number) {
    const subTodo = this.getSubTodo(categoryId, todoId, subTodoId);
    const timeCompleted = subTodo.isCompleted === false ? new Date() : null;
    this.setSubTodo(categoryId, todoId, {
      ...subTodo,
      isCompleted: !subTodo!.isCompleted,
      timeCompleted: timeCompleted,
    });
  },
  deleteSubTodo(categoryId: number, todoId: number, subTodoId: number) {
    const todo = this.getTodo(categoryId, todoId)!;
    this.setTodo(categoryId, {
      ...todo,
      subTasks: todo.subTasks.filter((subTodo) => subTodo.id !== subTodoId),
    });
  },
};

export default localStorageApi;
