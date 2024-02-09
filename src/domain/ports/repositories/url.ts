import { Url } from '../../entities';

export interface IUrlRepository {
  Save(url: Url): Promise<Url>;
  FindUrl(url: string): Promise<Url> | null;
}
