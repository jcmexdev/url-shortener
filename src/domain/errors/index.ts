class UrlNotFoundError extends Error {
  constructor() {
    super('Url not found');
    this.name = 'UrlNotFoundError';
  }
}

class UrlInvalidError extends Error {
  constructor() {
    super('Url is invalid');
    this.name = 'UrlInvalidError';
  }
}

export { UrlNotFoundError, UrlInvalidError };
