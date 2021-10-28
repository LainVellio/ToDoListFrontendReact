export const required = (value: string): string | null => {
  if (value) return null;
  return 'Поле обязательно для заполнения';
};

export const maxLength =
  (maxLength: number) =>
  (value: string): string | null => {
    if (value.length <= maxLength) return null;
    return 'Слишком длинная строка';
  };
