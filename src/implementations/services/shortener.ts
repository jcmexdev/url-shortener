import { Url } from '../../domain/entities';
import { IHasher, IUrlValidator } from '../../domain/ports/adapters';
import { IUrlRepository } from '../../domain/ports/repositories';
import { IShortenerService } from '../../domain/ports/services';

class ShortenerService implements IShortenerService {
  private repository: IUrlRepository;
  private hasher: IHasher;
  private validator: IUrlValidator;

  constructor(
    repository: IUrlRepository,
    hasher: IHasher,
    validator: IUrlValidator
  ) {
    this.repository = repository;
    this.hasher = hasher;
    this.validator = validator;
  }
  SaveUrl(url: Url): Promise<Url> {
    return this.repository.Save(url);
  }
  Sanitize(url: string): string {
    return url.trim();
  }
  ValidateUrl(url: string): boolean {
    return this.validator.IsValidUri(url);
  }
  FindUrl(url: string): Promise<Url> | null {
    return this.repository.FindUrl(url);
  }
  Hash(url: string): string {
    return this.hasher.Hash(url);
  }
}

export const NewShortenerService = (
  repository: IUrlRepository,
  hasher: IHasher,
  validator: IUrlValidator
): ShortenerService => {
  return new ShortenerService(repository, hasher, validator);
};
