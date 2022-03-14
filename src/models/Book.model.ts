import Volume from './Volume.model';

interface Book {
  accessInfo: unknown;
  etag: string;
  id: string;
  kind: string;
  saleInfo: unknown;
  searchInfo: unknown;
  selfLink: string;
  volumeInfo: Volume;
}

export default Book;
