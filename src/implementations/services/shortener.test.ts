import { Url } from '../../domain/entities';
import { NewShortenerService } from './shortener';
import { IShortenerService } from '../../domain/ports/services';

describe('implementations/services/shortener', () => {
  let shortenerService: IShortenerService;
  const mockUrl: Url = {
    id: '1',
    long_url: 'http://example.com',
    key: 'abc',
    short_url: 'http://localhost:3000/abc',
  };
  const mockRepository = {
    expectedResponse: {
      id: '1',
      long_url: 'http://example.com',
      key: 'abc',
      short_url: 'http://localhost:3000/abc',
    },
    Save(url: Url): Promise<Url> {
      return Promise.resolve(this.expectedResponse);
    },
    FindUrl(url: string): Promise<Url> | null {
      return Promise.resolve(this.expectedResponse);
    },
    SetResponse(response: any) {
      this.expectedResponse = response;
    },
  };

  const mockHasher = {
    expectedHash: 'abc',
    Hash(url: string): string {
      return this.expectedHash;
    },
    SetHash(hash: string) {
      this.expectedHash = hash;
    },
  };

  const mockValidator = {
    IsValidUri(url: string): boolean {
      return true;
    },
  };

  beforeEach(() => {
    shortenerService = NewShortenerService(
      mockRepository,
      mockHasher,
      mockValidator
    );
  });

  test('SaveUrl should return saved shorted URL from repository', async () => {
    const spySaveMockRepository = jest.spyOn(mockRepository, 'Save');
    const savedUrl = await shortenerService.SaveUrl(mockUrl);
    expect(savedUrl).toEqual(mockUrl);
    expect(spySaveMockRepository).toHaveBeenCalledWith(mockUrl);
  });

  test('Sanitize should return trimmed URL', () => {
    const url = ' http://example.com  ';
    const sanitizedUrl = shortenerService.Sanitize(url);
    expect(sanitizedUrl).not.toEqual(url);
    expect(sanitizedUrl).toEqual(url.trim());
  });

  test('ValidateUrl should return true', () => {
    const spyIsValidMockValidator = jest
      .spyOn(mockValidator, 'IsValidUri')
      .mockReturnValue(true);
    const validUrl = 'http://valid-url.com';
    const isValid = shortenerService.ValidateUrl(validUrl);
    expect(spyIsValidMockValidator).toHaveBeenCalledWith(validUrl);
    expect(isValid).toBe(true);
  });

  test('ValidateUrl should return false', () => {
    const spyIsValidMockValidator = jest
      .spyOn(mockValidator, 'IsValidUri')
      .mockReturnValue(false);
    const invalidUrl = 'http://invalid url.com';
    const isValid = shortenerService.ValidateUrl(invalidUrl);
    expect(spyIsValidMockValidator).toHaveBeenCalledWith(invalidUrl);
    expect(isValid).toBe(false);
  });

  test('Find return null when url is not found', async () => {
    const spyMockRepository = jest
      .spyOn(mockRepository, 'FindUrl')
      .mockReturnValue(null);
    const url = 'not-found';
    const found = await shortenerService.FindUrl(url);
    expect(found).toBeNull();
  });

  test('Find return url', async () => {
    const spyMockRepository = jest
      .spyOn(mockRepository, 'FindUrl')
      .mockResolvedValue(mockUrl);
    const url = 'not-found';
    const found = await shortenerService.FindUrl(url);
    expect(found).toEqual(mockUrl);
  });

  test('Hash return expected key', async () => {
    const url = 'http://example.com';
    const expectedHash = 'a9b9f0';
    mockHasher.SetHash(expectedHash);
    shortenerService = NewShortenerService(
      mockRepository,
      mockHasher,
      mockValidator
    );
    const hash = shortenerService.Hash(url);
    expect(hash).toEqual(expectedHash);
  });
});
