export const required = (value: string) => {
  if (value) return null;
  return 'Поле обязательно для заполнения';
};

export const maxLength = (maxLength: number) => (value: string) => {
  if (value.length < maxLength) return null;
  return 'Слишком длинная строка';
};
