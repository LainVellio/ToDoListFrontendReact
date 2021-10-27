import { ICategory } from '../interfaces';

const localStorageApi = {
  getCategories(): Array<ICategory> {
    return JSON.parse(localStorage.getItem('categories') || '[]');
  },
  setCategories(categories: Array<ICategory>) {
    localStorage.setItem('categories', JSON.stringify(categories));
  },
};

export default localStorageApi;
