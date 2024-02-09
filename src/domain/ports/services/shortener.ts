import { Url } from '../../entities';

export interface IShortenerService {
  Hash(url: string): string;
  FindUrl(url: string): Promise<Url> | null;
  Sanitize(url: string): string;
  ValidateUrl(url: string): boolean;
  SaveUrl(url: Url): Promise<Url>;
}
