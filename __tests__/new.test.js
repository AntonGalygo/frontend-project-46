import reverse from '../src/new.js';

test('reverse', () => {
  const result = 'olleh';
  expect(reverse('hello')).toEqual(result);
});
