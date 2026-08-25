import type { BookInterface } from '@/interfaces/BookInterface.js';
import { useBookStore } from '@/stores/bookstore.js';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';

export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  static getUniqueCategories(): string[] {
    const categories = useBookStore().books.map((book) => book.category);
    return Array.from(new Set(categories));
  }

  static createBook(book: CreateBookDTO): void {
    const store = useBookStore();
    const id = store.books.length > 0
      ? Math.max(...store.books.map((b) => b.id)) + 1
      : 1;
    store.books.push({ id, ...book });
  }

  static deleteLastBook(): void {
    useBookStore().books.pop();
  }
}
