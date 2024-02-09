import { NewUrlInMemoryRepository } from './url';
import { Url } from '../../../domain/entities';

describe('implementations/repositories/url', () => {
  test('Repository should return null when key not exist', async () => {
    const rep = NewUrlInMemoryRepository();
    const nonexistent = 'not exits';
    const existing = await rep.FindUrl(nonexistent);
    expect(existing).toBeNull();
  });

  test('Repository should store new url', async () => {
    const rep = NewUrlInMemoryRepository();
    const url: Url = {
      id: '1',
      long_url: 'http://example.com',
      key: 'abc',
      short_url: 'http://localhost:3000/abc',
    };
    await rep.Save(url);
    const existing = await rep.FindUrl(url.key);
    expect(existing).toEqual(url);
  });
});
