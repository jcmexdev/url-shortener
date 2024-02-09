import { Request, Response, NextFunction } from 'express';
import { NewShortenerService } from '../../implementations/services/shortener';
import { UrlInvalidError, UrlNotFoundError } from '../../domain/errors';
import { NewUrlInMemoryRepository } from '../../implementations/repositories/memory/url';
import {
  NewDefaultHasher,
  NewUrlValidator,
} from '../../implementations/adapters';

const repository = NewUrlInMemoryRepository();
const defaultHasher = NewDefaultHasher();
const urlValidator = NewUrlValidator();
const ShortenerService = NewShortenerService(
  repository,
  defaultHasher,
  urlValidator
);

const shortUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const longUrl = ShortenerService.Sanitize(url);

    if (!ShortenerService.ValidateUrl(longUrl)) {
      throw new UrlInvalidError();
    }

    const hashedUrl = ShortenerService.Hash(longUrl);
    const existingUrl = await ShortenerService.FindUrl(hashedUrl);
    if (existingUrl !== null && existingUrl.long_url === longUrl) {
      return res.status(200).json({ ...existingUrl });
    }

    const newUrl = {
      id: '',
      key: hashedUrl,
      short_url: 'http://localhost/' + hashedUrl,
      long_url: longUrl,
    };
    const savedUrl = await ShortenerService.SaveUrl(newUrl);
    return res.status(200).json({ ...savedUrl });
  } catch (error) {
    next(error);
  }
};

const redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    const existingUrl = await ShortenerService.FindUrl(key);

    if (existingUrl === null) {
      throw new UrlNotFoundError();
    }
    return res.redirect(existingUrl.long_url);
  } catch (error) {
    next(error);
  }
};

export { shortUrl, redirectUrl };
