import type { ReviewInterface } from '@/interfaces/ReviewInterface.js';
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO.js';
import { useReviewStore } from '@/stores/reviewstore.js';

export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsByBookId(bookId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.bookId === bookId);
  }

  static submitReview(dto: CreateReviewDTO): void {
    if (!dto.comment.trim()) return;
    ReviewService.createReview({
      bookId: dto.bookId,
      rating: dto.rating,
      comment: dto.comment.trim(),
      author: dto.author?.trim() || undefined,
    });
  }

  private static createReview(review: Omit<ReviewInterface, 'id'>): void {
    const store = useReviewStore();
    const nextId =
      store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id), 0) + 1 : 1;
    store.reviews.push({
      id: nextId,
      ...review,
      rating: Math.min(5, Math.max(1, review.rating)),
      createdAt: new Date().toISOString(),
    });
  }
}
