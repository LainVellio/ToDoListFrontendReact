import axios from 'axios';

import { INewCategoryTodo, ITodo } from '../interfaces';

const MAIN_URL = process.env.REACT_APP_MAIN_URL;

const serverAPI = {
  async getTasks() {
    const Categories = await axios.get(MAIN_URL || '');
    localStorage.setItem('categories', JSON.stringify(Categories.data));
    return Categories;
  },
  postTodo(newCategoryTodo: INewCategoryTodo) {
    return axios.post(`${MAIN_URL}todos`, newCategoryTodo);
  },
  putTodo(newTodo: ITodo) {
    return axios.put(`${MAIN_URL}todos`, newTodo);
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
