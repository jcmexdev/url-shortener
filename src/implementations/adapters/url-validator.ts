import { IUrlValidator } from '../../domain/ports/adapters';
import validator from 'valid-url';

class UrlValidator implements IUrlValidator {
  IsValidUri(url: string): boolean {
    const response = validator.isUri(url);
    return response !== undefined;
  }
}

export const NewUrlValidator = (): UrlValidator => {
  return new UrlValidator();
};
