import { NewUrlValidator } from './url-validator';

describe('implementations/adapters/url-validator', () => {
  test('UrlValidator should return true', () => {
    const testUrl = 'http://example.com';
    const validator = NewUrlValidator();
    const response = validator.IsValidUri(testUrl);
    expect(response).toBe(true);
  });

  test('UrlValidator should return false', () => {
    const testUrl = 'invalid-url';
    const validator = NewUrlValidator();
    const response = validator.IsValidUri(testUrl);
    expect(response).toBe(false);
  });
});
