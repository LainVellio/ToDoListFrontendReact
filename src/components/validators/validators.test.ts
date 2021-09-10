import { required, maxLength } from './validators';

describe('validators', () => {
  it('required', () => {
    expect(required('')).toBe('Поле обязательно для заполнения');
    expect(required('test')).toBeNull();
  });
  it('maxLength', () => {
    expect(maxLength(4)('12345')).toBe('Слишком длинная строка');
    expect(maxLength(0)('')).toBeNull();
    expect(maxLength(4)('1234')).toBeNull();
  });
});
