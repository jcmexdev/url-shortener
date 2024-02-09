import { Url } from '../../../domain/entities';
import { IUrlRepository } from '../../../domain/ports/repositories';

class UrlInMemoryRepository implements IUrlRepository {
  private urls: Map<string, Url> = new Map<string, Url>();
  Save(url: Url): Promise<Url> {
    this.urls.set(url.key, url);
    return Promise.resolve(url);
  }
  FindUrl(url: string): Promise<Url> | null {
    const exists = this.urls.get(url);
    return exists !== undefined ? Promise.resolve(exists) : null;
  }
}

export const NewUrlInMemoryRepository = (): UrlInMemoryRepository => {
  return new UrlInMemoryRepository();
};
