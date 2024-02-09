import { NewDefaultHasher } from './hasher';

describe('implementations/adapters/hasher', () => {
  test('Hasher should hash url', () => {
    const hasher = NewDefaultHasher();
    const url = 'http://example.com';
    const hashed = hasher.Hash(url);
    expect(hashed).toBe('a9b9f0');
  });
});
