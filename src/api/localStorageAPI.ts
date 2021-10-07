import { ICategory, IGroupTodo, ITodo } from '../interfaces';

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
    const categories = this.getCategories().map((category) =>
      category.id === changeCategory.id ? changeCategory : category,
    );
    this.setCategories(categories);
  },

  setTodos(categoryId: number, todos: IGroupTodo[]) {
    const category = this.getCategory(categoryId);
    this.setCategory({ ...category, todos });
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

  getSubTodo(categoryId: number, todoId: number, subTodoId: number): ITodo {
    const todo = this.getTodo(categoryId, todoId);
    return todo.subTodos.find((todo) => todo.id === subTodoId)!;
  },
  setSubTodo(categoryId: number, todoId: number, changeSubTodo: ITodo) {
    const todo = this.getTodo(categoryId, todoId);
    const changeTodo = {
      ...todo,
      subTasks: todo.subTodos.map((subTodo) =>
        subTodo.id === changeSubTodo.id ? changeSubTodo : subTodo,
      ),
    };
    this.setTodo(categoryId, changeTodo);
  },
};

export default localStorageApi;
