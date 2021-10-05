import React from 'react';
import localStorageApi from './api/localStorageAPI';
import { EColors, ETextStyle, ICategory } from './interfaces';

const initialCategories = [
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
        subTasks: [
          {
            id: 1,
            text: '',
            textColor: EColors.black,
            textStyle: ETextStyle.normal,
            isCompleted: false,
            inArchive: false,
            timeCompleted: null,
          },
        ],
      },
    ],
  },
];

interface ProviderProps {
  children: React.ReactNode;
}
const Context = React.createContext<any>(initialCategories);

export function useCategories() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  return context;
}

export function useCategory(id: number) {
  const [categories, setCategories] = useCategories();
  const category = categories.find((category: ICategory) => category.id === id);
  const setCategory = (changeCategory: ICategory) => {
    localStorageApi.setCategory(changeCategory);
    setCategories((prev: ICategory[]) =>
      prev.map((category: ICategory) =>
        category.id === id ? changeCategory : category,
      ),
    );
  };
  return [category, setCategory];
}

function Provider({ children }: ProviderProps) {
  const [categories, setCategories] = React.useState<ICategory[]>(
    localStorageApi.getCategories(),
  );
  const value = [categories, setCategories];

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
