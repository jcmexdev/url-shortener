import { IHasher } from '../../domain/ports/adapters';
import crypto from 'crypto';

class DefaultHasher implements IHasher {
  Hash(url: string): string {
    return crypto.createHash('md5').update(url).digest('hex').substring(0, 6);
  }
}

export const NewDefaultHasher = (): DefaultHasher => {
  return new DefaultHasher();
};
