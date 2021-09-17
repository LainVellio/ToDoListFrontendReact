import { maxLength, required } from './validators';

describe('validators', () => {
  it('function required', () => {
    expect(required('')).toBe('Поле обязательно для заполнения');
    expect(required('test')).toBeNull();
  });

  it('function maxLength', () => {
    expect(maxLength(5)('123456')).toBe('Слишком длинная строка');
    expect(maxLength(5)('12345')).toBeNull();
  });
});
