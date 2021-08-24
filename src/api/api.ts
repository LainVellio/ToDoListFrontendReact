import axios from 'axios';

const MAIN_URL = process.env.REACT_APP_MAIN_URL;

export interface NewCategoryTodo {
  title: string;
  text: string;
}

const serverAPI = {
  getTasks() {
    return axios.get(MAIN_URL || '');
  },
  postTodo(newCategoryTodo: NewCategoryTodo) {
    return axios.post(`${MAIN_URL}todos`, newCategoryTodo);
  },
  todoChecked(todoId: number) {
    return axios.patch(`${MAIN_URL}/todos/${todoId}`, {});
  },
  deleteCategory(categoryId: number) {
    return axios.delete(`${MAIN_URL}/projects/${categoryId}`);
  },
  deleteTodo(todoId: number) {
    return axios.delete(`${MAIN_URL}/todos/${todoId}`);
  },
};

export default serverAPI;
